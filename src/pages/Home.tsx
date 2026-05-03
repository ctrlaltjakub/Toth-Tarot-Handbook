import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, Github } from 'lucide-react';
import { runSearch, iconForType, colorForType } from '../components/SearchOverlay';

interface HomeProps {
  onOpenKofi?: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenKofi }) => {
  const [expanded, setExpanded] = useState(false);
  const [maxLines, setMaxLines] = useState<number | undefined>(undefined);
  const [isTruncated, setIsTruncated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const kofiRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = searchQuery.trim().length > 0 ? runSearch(searchQuery) : [];

  const handleSelectResult = (path: string) => {
    setSearchQuery('');
    navigate(path);
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    if (searchQuery.trim().length === 0) return;
    const handleClickOutside = (e: Event) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [searchQuery]);

  const calcLines = useCallback(() => {
    const text = textRef.current;
    const container = containerRef.current;
    if (!text || !container) return;

    // 1. Measure line height and full unconstrained text
    const style = getComputedStyle(text);
    const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.8;

    const prevClamp = text.style.webkitLineClamp;
    const prevDisplay = text.style.display;
    const prevOverflow = text.style.overflow;
    text.style.webkitLineClamp = 'unset';
    text.style.display = 'block';
    text.style.overflow = 'visible';
    const fullHeight = text.scrollHeight;
    const fullLines = Math.ceil(fullHeight / lineHeight);
    text.style.webkitLineClamp = prevClamp;
    text.style.display = prevDisplay;
    text.style.overflow = prevOverflow;

    // 2. Hide text + button, measure everything else via actual layout
    const textWrapper = text.parentElement!;
    const prevWrapperDisplay = textWrapper.style.display;
    textWrapper.style.display = 'none';
    const othersHeight = container.scrollHeight;
    textWrapper.style.display = prevWrapperDisplay;

    // 3. Measure the heading inside the text wrapper (it stays even when text is clamped)
    const headingEl = textWrapper.querySelector('h2');
    const headingH = headingEl ? headingEl.getBoundingClientRect().height + 8 : 0; // 8px margin

    // 4. Calculate — first check if ALL text fits without a more button
    const vh = window.innerHeight;
    const isMobile = window.innerWidth < 768;
    const navbarH = isMobile ? 70 : 40;
    const baseUsed = othersHeight + headingH + navbarH;
    const availableNoButton = vh - baseUsed;
    const fullTextHeight = fullLines * lineHeight;

    if (fullTextHeight <= availableNoButton) {
      // Everything fits — no clamping, no button
      setMaxLines(undefined);
      setIsTruncated(false);
    } else {
      // Need clamping — reserve space for the more button
      const moreButtonH = 28;
      const availableForText = availableNoButton - moreButtonH;
      const lines = Math.max(1, Math.floor(availableForText / lineHeight));
      setMaxLines(lines);
      setIsTruncated(true);
    }
  }, []);

  // Recalculate on mount, resize, and when expanded changes
  useEffect(() => {
    // Always recalculate — even when expanded, to detect if text now fits
    const timer = setTimeout(() => {
      calcLines();
      // If everything fits after recalc, auto-collapse
      if (expanded && !isTruncated) setExpanded(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [expanded, calcLines, isTruncated]);

  useEffect(() => {
    window.addEventListener('resize', calcLines);
    return () => window.removeEventListener('resize', calcLines);
  }, [calcLines]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="main-content"
    >
      <header ref={headerRef} className="section-header">
        <h1>Thoth Tarot Handbook</h1>
      </header>

      {/* Search input */}
      <div ref={searchRef} className="search-container" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search cards, signs, planets, sephiroth..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          style={{ paddingLeft: '3rem', paddingRight: '4rem', width: '100%' }}
        />
        <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', color: 'var(--text-subtle)', opacity: 0.6, border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '0.1rem 0.4rem', pointerEvents: 'none' }}>
          Ctrl+K
        </span>

        {searchQuery.trim().length > 0 && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            left: 0,
            right: 0,
            maxHeight: '60vh',
            overflowY: 'auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            zIndex: 50,
          }}>
            {searchResults.length === 0 ? (
              <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No results for "{searchQuery}"
              </div>
            ) : (
              searchResults.slice(0, 20).map((r, i) => (
                <button
                  key={`${r.type}-${r.path}-${i}`}
                  className="search-overlay-result"
                  onClick={() => handleSelectResult(r.path)}
                >
                  <span style={{ color: colorForType(r.type), flexShrink: 0 }}>
                    {iconForType(r.type)}
                  </span>
                  <span className="search-overlay-result-text">
                    <span className="search-overlay-result-title">{r.title}</span>
                    <span className="search-overlay-result-subtitle">{r.subtitle}</span>
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Intro text — dynamically clamps to fill viewport */}
      <div style={{ maxWidth: '750px', margin: '0 auto 1.25rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text-main)', fontSize: '1.05rem', fontFamily: 'var(--font-serif)', fontWeight: 400, margin: '0 0 0.5rem', letterSpacing: '0.02em' }}>
          Why an interactive handbook?
        </h2>
        <p
          ref={textRef}
          style={{
            color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem', margin: 0,
            ...(!expanded && maxLines !== undefined ? {
              display: '-webkit-box',
              WebkitLineClamp: maxLines,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            } : {}),
          }}
        >
          The Thoth Tarot is not a standalone system — it is the meeting point of three ancient traditions. The <strong style={{ color: 'var(--accent-warm)' }}>78 cards</strong> are mapped onto the <strong style={{ color: 'var(--color-earth)' }}>Kabbalistic Tree of Life</strong>, where the 22 Major Arcana correspond to the 22 paths and the 40 pip cards sit on the 10 Sephiroth. Each card also carries an <strong style={{ color: 'var(--color-sapphire)' }}>astrological</strong> attribution — zodiac signs, planets, and elements — creating a web of correspondences where every symbol illuminates every other. This guide maps all three systems together, with Jungian psychological interpretation as a fourth lens.
        </p>
        {(isTruncated || expanded) && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--accent)', fontSize: '0.8rem', fontFamily: 'var(--font-sans)',
              display: 'inline-flex', alignItems: 'center', gap: '0.2rem',
              marginTop: '0.25rem', padding: '0.2rem 0',
            }}
          >
            {expanded ? <>less <ChevronUp size={14} /></> : <>more <ChevronDown size={14} /></>}
          </button>
        )}
      </div>

      <div ref={gridRef} className="home-grid">
        <Link to="/tarot" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card" style={{ height: '100%', borderTop: '3px solid var(--color-fire)' }}>
            <h2 style={{ color: 'var(--color-fire)' }}>Tarot</h2>
            <p>All 78 cards — Major Arcana, Court Cards, and pip cards — with visual, esoteric, and Jungian descriptions.</p>
          </div>
        </Link>
        <Link to="/tree-of-life" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card" style={{ height: '100%', borderTop: '3px solid var(--color-earth)' }}>
            <h2 style={{ color: 'var(--color-earth)' }}>Tree of Life</h2>
            <p>The Kabbalistic map — 10 Sephiroth and 22 paths. Click any sphere or path to see its cards and meaning.</p>
          </div>
        </Link>
        <Link to="/astrology" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card" style={{ height: '100%', borderTop: '3px solid var(--color-sapphire)' }}>
            <h2 style={{ color: 'var(--color-sapphire)' }}>Astrology</h2>
            <p>Zodiac signs, planets, elements, qualities, and decans — all linked to their Tarot correspondences.</p>
          </div>
        </Link>
        <Link to="/library" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card" style={{ height: '100%', borderTop: '3px solid var(--color-peach)' }}>
            <h2 style={{ color: 'var(--color-peach)' }}>Library</h2>
            <p>Reference articles on the history, methods, and foundational knowledge of the Thoth system.</p>
          </div>
        </Link>
      </div>

      {/* Support & links banner */}
      <div ref={kofiRef} style={{
        maxWidth: '750px',
        margin: '2rem auto 2rem',
        textAlign: 'center',
        padding: '1rem 1.25rem',
        borderRadius: '12px',
        border: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-card)',
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
          Hi, I'm Jakub. I spent a long time building this opensource app and I'm providing it for free.
          If you find it useful, please consider supporting my work.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onOpenKofi?.()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1.5rem',
              borderRadius: '8px',
              backgroundColor: 'var(--accent)',
              color: 'var(--ctp-base)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.03em',
            }}
          >
            Support on Ko-fi
          </button>
          <a
            href="https://github.com/ctrlaltjakub/Toth-Tarot-Handbook"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'transparent',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.03em',
            }}
          >
            <Github size={16} /> View on GitHub
          </a>
        </div>
      </div>

    </motion.div>
  );
};

export default Home;
