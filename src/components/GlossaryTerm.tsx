import React, { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';
import { glossary } from '../data/glossaryData';

// ============================================
// Session persistence for glossary stack
// ============================================
const STORAGE_KEY = 'glossary-stack';

const saveStack = (stack: string[]) => {
  if (stack.length > 0) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stack));
  }
};

const loadAndClearStack = (): string[] | null => {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch { return null; }
  }
  return null;
};

// ============================================
// Global glossary modal manager
// ============================================
// Only one GlossaryTerm at a time manages the modal stack.
// This context allows any term on the page to claim or release the modal.
interface GlossaryManagerContextType {
  activeStack: string[];
  openStack: (stack: string[]) => void;
  push: (term: string) => void;
  pop: () => void;
  goTo: (index: number) => void;
  closeAll: () => void;
}

const GlossaryManagerContext = createContext<GlossaryManagerContextType | null>(null);

// Flags to control navigation behavior
let navigatingForward = false;
let preserveStorage = false;

export const GlossaryManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stack, setStack] = useState<string[]>(() => {
    // Restore glossary stack on initial load (e.g. page refresh)
    const saved = loadAndClearStack();
    return saved && saved.length > 0 ? saved : [];
  });
  const location = useLocation();

  // Persist stack to sessionStorage on every change so refresh can restore it
  useEffect(() => {
    if (preserveStorage) {
      preserveStorage = false;
      return;
    }
    if (stack.length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stack));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [stack]);

  // On route change, restore stack only on Back navigation (not forward "See more")
  useEffect(() => {
    if (navigatingForward) {
      navigatingForward = false;
      return;
    }
    const saved = loadAndClearStack();
    if (saved && saved.length > 0) {
      // Small delay to let the new page render first
      setTimeout(() => setStack(saved), 100);
    }
  }, [location.pathname, location.search]);

  // Browser back: step back through glossary stack, then close
  // We push a history entry each time a term is added, so back pops one at a time
  useEffect(() => {
    if (stack.length > 0) {
      window.history.pushState({ glossaryDepth: stack.length }, '');
    }
  }, [stack.length]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (stack.length > 1) {
        e.preventDefault();
        setStack(prev => prev.slice(0, -1));
      } else if (stack.length === 1) {
        e.preventDefault();
        setStack([]);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [stack.length]);

  const openStack = useCallback((s: string[]) => setStack(s), []);
  const push = useCallback((term: string) => setStack(prev => [...prev, term]), []);
  const pop = useCallback(() => setStack(prev => prev.length > 1 ? prev.slice(0, -1) : []), []);
  const goTo = useCallback((index: number) => setStack(prev => prev.slice(0, index + 1)), []);
  const closeAll = useCallback(() => setStack([]), []);

  return (
    <GlossaryManagerContext.Provider value={{ activeStack: stack, openStack, push, pop, goTo, closeAll }}>
      {children}
      {stack.length > 0 && (
        <GlossaryModalStack stack={stack} />
      )}
    </GlossaryManagerContext.Provider>
  );
};

// ============================================
// Parse {Term} references in glossary shortDefs
// ============================================
const parseGlossaryText = (text: string): React.ReactNode[] => {
  const parts = text.split(/\{([^}]+)\}/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <GlossaryTermInModal key={i} term={part} />;
    }
    return part;
  });
};

// A glossary term rendered INSIDE a modal — pushes to the stack
const GlossaryTermInModal: React.FC<{ term: string }> = ({ term }) => {
  const manager = useContext(GlossaryManagerContext);
  const entry = glossary[term];
  if (!entry) return <>{term}</>;

  return (
    <span
      className="glossary-term"
      onClick={(e) => { e.stopPropagation(); manager?.push(term); }}
    >
      {term}
    </span>
  );
};

// ============================================
// The modal — renders the top of the stack
// ============================================
const GlossaryModalStack: React.FC<{ stack: string[] }> = ({ stack }) => {
  const manager = useContext(GlossaryManagerContext)!;
  const navigate = useNavigate();
  const currentTerm = stack[stack.length - 1];
  const entry = currentTerm ? glossary[currentTerm] : null;
  const canGoBack = stack.length > 1;

  if (!entry || stack.length === 0) return null;

  const handleSeeMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const link = entry.link;
    // Save stack so it can be restored on browser Back
    saveStack(stack);
    navigatingForward = true;
    preserveStorage = true;
    manager.closeAll();
    if (link) setTimeout(() => navigate(link), 50);
  };

  return createPortal(
    <div className="glossary-modal-backdrop" onClick={manager.closeAll}>
      <div className="glossary-modal" onClick={(e) => e.stopPropagation()}>
        <div className="glossary-popover-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {canGoBack && (
              <button onClick={manager.pop} className="glossary-popover-close" title="Back">
                <ArrowLeft size={14} />
              </button>
            )}
            <span className="glossary-popover-term">{entry.term}</span>
          </div>
          <button onClick={manager.closeAll} className="glossary-popover-close"><X size={14} /></button>
        </div>
        <div className="glossary-popover-body">
          {parseGlossaryText(entry.shortDef)}
        </div>
        {entry.link && (
          <a href={entry.link} className="glossary-popover-link" onClick={handleSeeMore}>
            See more →
          </a>
        )}
        {canGoBack && (
          <div style={{ marginTop: '0.4rem', paddingTop: '0.3rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.7rem', color: 'var(--text-subtle)' }}>
            {stack.slice(0, -1).map((t, i) => (
              <span key={i}>
                {i > 0 && ' → '}
                <span
                  style={{ color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '2px' }}
                  onClick={() => manager.goTo(i)}
                >{t}</span>
              </span>
            ))}
            {' → '}<span style={{ color: 'var(--accent-warm)' }}>{currentTerm}</span>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

// ============================================
// GlossaryTerm — the inline clickable term
// ============================================
interface GlossaryTermProps {
  term: string;
  children?: React.ReactNode;
}

const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term, children }) => {
  const manager = useContext(GlossaryManagerContext);

  const entry = glossary[term];
  if (!entry) {
    return <>{children || term}</>;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    manager?.openStack([term]);
  };

  return (
    <span className="glossary-term" onClick={handleClick}>
      {children || term}
    </span>
  );
};

export default GlossaryTerm;
export { parseGlossaryText };
