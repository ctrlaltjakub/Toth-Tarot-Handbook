import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import PlanetGlyph from './PlanetGlyph';

// Terms that are both a planet and a tarot card
export const AMBIGUOUS_TERMS: Record<string, { cardId: string; cardName: string; planetName: string }> = {
  Sun: { cardId: '19-the-sun', cardName: 'The Sun (XIX)', planetName: 'Sun' },
  Moon: { cardId: '18-the-moon', cardName: 'The Moon (XVIII)', planetName: 'Moon' },
};

/** Popup that lets the user choose between planet and tarot card */
const DisambigPopup: React.FC<{
  name: string;
  anchorRect: DOMRect;
  onClose: () => void;
}> = ({ name, anchorRect, onClose }) => {
  const info = AMBIGUOUS_TERMS[name];
  if (!info) return null;

  const optionStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.45rem 0.6rem', borderRadius: '6px',
    background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
    textDecoration: 'none', fontSize: '0.85rem', fontFamily: 'var(--font-sans)',
  };

  // Position above the clicked term, flip below if not enough space
  const spaceAbove = anchorRect.top;
  const placeAbove = spaceAbove > 120;

  const style: React.CSSProperties = {
    position: 'fixed',
    left: Math.max(8, Math.min(anchorRect.left, window.innerWidth - 220)),
    ...(placeAbove
      ? { top: Math.max(8, anchorRect.top - 8), transform: 'translateY(-100%)' }
      : { top: anchorRect.bottom + 8 }
    ),
    zIndex: 10000,
  };

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }} onClick={onClose}>
      <div
        className="glossary-modal"
        style={style}
        onClick={e => e.stopPropagation()}
      >
        <div className="glossary-popover-header">
          <span className="glossary-popover-term">{name}</span>
          <button onClick={onClose} className="glossary-popover-close"><X size={14} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', padding: '0.5rem 0.75rem' }}>
          <Link
            to={`/astrology?view=planet&name=${name}`}
            onClick={onClose}
            style={{ ...optionStyle, color: 'var(--color-sapphire)' }}
          >
            <PlanetGlyph name={info.planetName} size={16} color="var(--color-sapphire)" />
            {name} — Planet
          </Link>
          <Link
            to={`/tarot/${info.cardId}`}
            onClick={onClose}
            style={{ ...optionStyle, color: 'var(--accent-warm)' }}
          >
            {info.cardName} — Tarot Card
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
};

/** Inline clickable term that opens disambiguation popup */
const DisambigTerm: React.FC<{
  term: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ term, children, style: extraStyle }) => {
  const [showPopup, setShowPopup] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!showPopup) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowPopup(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [showPopup]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPopup(true);
  };

  return (
    <>
      <span
        ref={ref}
        onClick={handleClick}
        style={{
          color: 'var(--accent-warm)',
          textDecoration: 'underline',
          textDecorationStyle: 'dotted',
          textUnderlineOffset: '2px',
          cursor: 'pointer',
          ...extraStyle,
        }}
      >
        {children || term}
      </span>
      {showPopup && ref.current && (
        <DisambigPopup
          name={term}
          anchorRect={ref.current.getBoundingClientRect()}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default DisambigTerm;
export { DisambigPopup };
