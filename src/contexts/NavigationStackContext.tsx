import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { tarotData } from '../data/tarotData';
import { sephiroth, paths } from '../data/treeOfLifeData';
import { articles } from '../data/libraryData';

export type NavKind = 'section' | 'card' | 'article' | 'node';

export interface NavEntry {
  pathname: string;
  search: string;
  label: string;
  kind: NavKind;
}

interface NavigationStackValue {
  stack: NavEntry[];
  recent: NavEntry[];
  goBackTo: (recentIndex: number) => void;
}

const Ctx = createContext<NavigationStackValue>({
  stack: [],
  recent: [],
  goBackTo: () => {},
});

export const useNavigationStack = () => useContext(Ctx);

const MAX_STACK = 30;

function resolveLabel(pathname: string, search: string): { label: string; kind: NavKind } {
  if (pathname === '/') return { label: 'Home', kind: 'section' };
  if (pathname === '/tarot') return { label: 'Tarot', kind: 'section' };
  if (pathname === '/astrology') return { label: 'Astrology', kind: 'section' };
  if (pathname === '/library') return { label: 'Library', kind: 'section' };
  if (pathname === '/impressum') return { label: 'Impressum', kind: 'section' };

  if (pathname === '/tree-of-life') {
    const params = new URLSearchParams(search);
    const view = params.get('view');
    const id = params.get('id');
    if (view === 'sephirah' && id) {
      const seph = sephiroth.find(s => s.number === Number(id));
      if (seph) return { label: seph.name, kind: 'node' };
    }
    if (view === 'path' && id) {
      const path = paths.find(p => p.number === Number(id));
      if (path) return { label: path.cardName, kind: 'node' };
    }
    return { label: 'Tree of Life', kind: 'section' };
  }

  const tarotMatch = pathname.match(/^\/tarot\/([^/]+)$/);
  if (tarotMatch) {
    const card = tarotData.find(c => c.id === tarotMatch[1]);
    return { label: card?.name ?? 'Card', kind: 'card' };
  }

  const libMatch = pathname.match(/^\/library\/([^/]+)$/);
  if (libMatch) {
    const article = articles.find(a => a.id === libMatch[1]);
    return { label: article?.title ?? 'Article', kind: 'article' };
  }

  return { label: pathname, kind: 'section' };
}

function entryFor(loc: { pathname: string; search: string }): NavEntry {
  const { label, kind } = resolveLabel(loc.pathname, loc.search);
  return { pathname: loc.pathname, search: loc.search, label, kind };
}

export const NavigationStackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navType = useNavigationType();
  const navigate = useNavigate();

  const [stack, setStack] = useState<NavEntry[]>(() => [entryFor(location)]);
  const prevLocRef = useRef(location);

  useEffect(() => {
    const prev = prevLocRef.current;
    if (prev.pathname === location.pathname && prev.search === location.search) {
      return;
    }
    prevLocRef.current = location;

    const newEntry = entryFor(location);

    setStack(prevStack => {
      if (navType === 'POP') {
        const second = prevStack[prevStack.length - 2];
        if (second && second.pathname === location.pathname && second.search === location.search) {
          return prevStack.slice(0, -1);
        }
        const next = [...prevStack, newEntry];
        return next.length > MAX_STACK ? next.slice(next.length - MAX_STACK) : next;
      }
      if (navType === 'REPLACE') {
        const copy = [...prevStack];
        copy[copy.length - 1] = newEntry;
        return copy;
      }
      const next = [...prevStack, newEntry];
      return next.length > MAX_STACK ? next.slice(next.length - MAX_STACK) : next;
    });
  }, [location, navType]);

  const recent = stack.length > 1 ? stack.slice(0, -1).reverse() : [];

  const goBackTo = (recentIndex: number) => {
    const steps = recentIndex + 1;
    if (steps > 0) navigate(-steps);
  };

  return (
    <Ctx.Provider value={{ stack, recent, goBackTo }}>
      {children}
    </Ctx.Provider>
  );
};
