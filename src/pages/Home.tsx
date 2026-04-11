import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, Github } from 'lucide-react';
import SearchOverlay from '../components/SearchOverlay';

const Home: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [maxLines, setMaxLines] = useState<number | undefined>(undefined);
  const [isTruncated, setIsTruncated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const kofiRef = useRef<HTMLDivElement>(null);
  const impressumRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!searchOpen) setSearchOpen(true);
  };

  const handleSearchFocus = () => {
    if (!searchOpen) setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  const [kofiOpen, setKofiOpen] = useState(false);

  const calcLines = useCallback(() => {
    const text = textRef.current;
    const grid = gridRef.current;
    const header = headerRef.current;
    const search = searchRef.current;
    const kofi = kofiRef.current;
    if (!text || !grid || !header || !search) return;

    // Temporarily unconstrain text to measure its full height
    const prevClamp = text.style.webkitLineClamp;
    const prevDisplay = text.style.display;
    const prevOverflow = text.style.overflow;
    text.style.webkitLineClamp = 'unset';
    text.style.display = 'block';
    text.style.overflow = 'visible';

    const style = getComputedStyle(text);
    const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.8;
    const fullHeight = text.scrollHeight;
    const fullLines = Math.ceil(fullHeight / lineHeight);

    // Restore
    text.style.webkitLineClamp = prevClamp;
    text.style.display = prevDisplay;
    text.style.overflow = prevOverflow;

    const vh = window.innerHeight;
    const isMobile = window.innerWidth < 768;
    // CSS padding-bottom already reserves space for the fixed navbar,
    // so we only account for that padding here — not navbarH separately
    // Mobile: calc(1.5rem + 70px + safe-area) ≈ 94+ depending on device
    const safeArea = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--safe-bottom') || '0') || 0;
    const bottomPad = isMobile ? (94 + safeArea) : 0;
    const topPad = isMobile ? 0 : 56;

    const headerH = header.getBoundingClientRect().height;
    const searchH = search.getBoundingClientRect().height;
    const gridH = grid.getBoundingClientRect().height;
    const kofiH = kofi ? kofi.getBoundingClientRect().height : 0;

    const impressum = impressumRef.current;
    const impressumH = impressum ? impressum.getBoundingClientRect().height : 0;

    const textMarginBottom = 20;
    const gridGap = 16;
    const moreButtonH = 24;
    const kofiMarginTop = kofi ? 32 : 0;

    const usedSpace = topPad + bottomPad + headerH + searchH + gridH + kofiH + kofiMarginTop + impressumH + textMarginBottom + gridGap + moreButtonH;
    const availableForText = vh - usedSpace;
    const lines = Math.max(1, Math.floor(availableForText / lineHeight));

    if (fullLines <= lines) {
      setMaxLines(undefined);
      setIsTruncated(false);
    } else {
      setMaxLines(lines);
      setIsTruncated(true);
    }
  }, []);

  // Recalculate on mount, resize, and when expanded changes (clicking "less")
  useEffect(() => {
    if (!expanded) {
      const timer = setTimeout(calcLines, 50);
      return () => clearTimeout(timer);
    }
  }, [expanded, calcLines]);

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
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          className="search-input"
          style={{ paddingLeft: '3rem', paddingRight: '4rem', width: '100%' }}
        />
        <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', color: 'var(--text-subtle)', opacity: 0.6, border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '0.1rem 0.4rem', pointerEvents: 'none' }}>
          Ctrl+K
        </span>
      </div>

      {/* Intro text — dynamically clamps to fill viewport */}
      <div style={{ maxWidth: '750px', margin: '0 auto 1.25rem', textAlign: 'center' }}>
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
        margin: '2rem auto 0',
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
            onClick={() => setKofiOpen(true)}
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

      {/* Impressum link */}
      <div ref={impressumRef} style={{
        maxWidth: '750px',
        margin: '0.15rem auto -0.5rem',
        textAlign: 'center',
        padding: 0,
      }}>
        <Link
          to="/impressum"
          style={{ color: 'var(--text-subtle)', fontSize: '0.7rem', textDecoration: 'none' }}
        >
          Impressum
        </Link>
      </div>

      {/* Search overlay (Home-controlled, seeded with current input value) */}
      <AnimatePresence>
        {searchOpen && <SearchOverlay onClose={closeSearch} initialQuery={searchQuery} />}
      </AnimatePresence>

      {/* Ko-fi donation overlay */}
      {kofiOpen && (
        <div
          onClick={() => setKofiOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'calc(100% - 2rem)',
              maxWidth: '420px',
              height: '80vh',
              maxHeight: '700px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <iframe
              src="https://ko-fi.com/jakubfleitesjonczyk?hidefeed=true&widget=true&embed=true"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Support on Ko-fi"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Home;
