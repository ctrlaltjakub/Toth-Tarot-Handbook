import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { tarotData } from '../data/tarotData';
import { spreads } from '../data/spreadsData';
import { Sparkles, ChevronRight, Info } from 'lucide-react';
import { AstroText } from '../utils/formatSymbols';
import SpreadDiagram from '../components/SpreadDiagram';

const suitColor = (suit?: string, arcana?: string): string => {
  if (arcana === 'Major') return 'var(--accent-warm)';
  switch (suit) {
    case 'Wands': return 'var(--color-fire)';
    case 'Cups': return 'var(--color-water)';
    case 'Swords': return 'var(--color-air)';
    case 'Disks': return 'var(--color-earth)';
    default: return 'var(--accent-warm)';
  }
};

const suitLabel = (card: { arcana: string; suit?: string }): string => {
  if (card.arcana === 'Major') return 'Major Arcana';
  return `${card.suit} — ${card.arcana}`;
};

export const Tarot: React.FC = () => {
  const [view, setView] = useState<'cards' | 'spreads'>('cards');
  const [filter, setFilter] = useState<string>('All');
  const [showGuide, setShowGuide] = useState(false);
  const [expandedSpread, setExpandedSpread] = useState<string | null>(null);
  const filters = ['All', 'Major', 'Wands', 'Cups', 'Swords', 'Disks'];

  const filteredCards = tarotData.filter(card => {
    if (filter === 'All') return true;
    if (filter === 'Major') return card.arcana === 'Major';
    return card.suit === filter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="main-content detail-container"
    >
      <header className="section-header">
        <h1>Thoth Tarot</h1>
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="readme-btn"
        >
          <Info size={14} /> {showGuide ? 'Hide' : 'Read Me'}
        </button>
        <AnimatePresence>
          {showGuide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                textAlign: 'left',
                maxWidth: '700px',
                margin: '1rem auto 0',
                padding: '1.25rem',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.9rem',
                lineHeight: '1.7',
                color: 'var(--text-muted)',
              }}>
                <p style={{ margin: '0 0 1rem' }}>Each card entry has three sections:</p>
                <p style={{ margin: '0 0 0.5rem' }}>
                  <strong style={{ color: 'var(--accent-warm)' }}>Visual Description</strong> — What appears on the card and the symbolic meaning of each element, grounded in Crowley's <em>Book of Thoth</em>.
                </p>
                <p style={{ margin: '0 0 0.5rem' }}>
                  <strong style={{ color: 'var(--accent-warm)' }}>Esoteric Meaning</strong> — The card's place in the system: its elemental, astrological, and Kabbalistic attributions, moral qualities, and Yi King correspondence.
                </p>
                <p style={{ margin: '0 0 1.25rem' }}>
                  <strong style={{ color: 'var(--accent-warm)' }}>Jungian Psychological Meaning</strong> — An interpretation through the lens of Jungian depth psychology: archetypes, shadow, individuation, and the dynamics of the unconscious.
                </p>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginBottom: '0.75rem' }}>
                  <p style={{ margin: '0 0 0.75rem', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Card metadata</p>
                </div>

                <p style={{ margin: '0 0 0.5rem' }}>
                  <strong style={{ color: 'var(--accent-warm)' }}>Hebrew Letter</strong> — Each of the 22 Major Arcana corresponds to one of the 22 letters of the Hebrew alphabet. The letter's name and meaning (e.g. Aleph = "Ox") encode symbolic qualities that shape the card's interpretation.
                </p>
                <p style={{ margin: '0 0 0.5rem' }}>
                  <strong style={{ color: 'var(--accent-warm)' }}>Astrology</strong> — Major Arcana cards are attributed to planets, zodiac signs, or classical elements. Court Cards each rule a 30° span of the zodiac, deliberately straddling two signs — Crowley's system cross-balances elemental and zodiacal forces so that, for example, the "fiery part of Fire" does not simply map to the most fiery sign. Minor Arcana pip cards (Ace through Ten) are assigned to specific decans and planetary rulers.
                </p>
                <p style={{ margin: '0 0 0.5rem' }}>
                  <strong style={{ color: 'var(--accent-warm)' }}>Tree of Life</strong> — The Kabbalistic Tree of Life has 10 spheres (Sephiroth) connected by 22 paths. Each Major Arcana card is assigned to one of these paths, linking two Sephiroth. The path number and the two spheres it connects reveal the card's role in the flow of divine energy from the infinite (Kether) down to the material world (Malkuth). The pip cards (Ace–Ten) correspond directly to the ten Sephiroth within their suit's element.
                </p>
                <p style={{ margin: '0 0 0.5rem' }}>
                  <strong style={{ color: 'var(--accent-warm)' }}>The Four Suits</strong> — Wands = Fire (will, creativity), Cups = Water (emotion, intuition), Swords = Air (intellect, conflict), Disks = Earth (matter, practical life). Each suit also maps to a letter of the Tetragrammaton (YHVH): Yod = Wands, Heh = Cups, Vau = Swords, Heh final = Disks.
                </p>
                <p style={{ margin: '0', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                  The Court Cards follow the same Tetragrammaton pattern within each suit: Knight = Yod (initial impulse), Queen = Heh (reception and development), Prince = Vau (intellectual projection), Princess = Heh final (materialization and reabsorption). The Princesses have no zodiacal attribution — they rule quadrants of the sky around the North Pole.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Cards / Spreads — underlined tab style */}
        <div className="view-tabs" style={{ marginTop: '1rem' }}>
          <button
            className={`view-tab ${view === 'cards' ? 'active' : ''}`}
            onClick={() => setView('cards')}
          >Cards</button>
          <button
            className={`view-tab ${view === 'spreads' ? 'active' : ''}`}
            onClick={() => setView('spreads')}
          >Spreads</button>
        </div>
      </header>

      {view === 'cards' && <>
        <div className="filter-bar">
          {filters.map(f => {
            const pillColor = suitColor(f === 'Major' ? undefined : f, f === 'Major' ? 'Major' : undefined);
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="filter-pill"
                style={{
                  borderColor: f === 'All' ? 'var(--accent)' : pillColor,
                  background: isActive ? (f === 'All' ? 'var(--accent)' : pillColor) : 'transparent',
                  color: isActive ? 'var(--ctp-base)' : 'var(--text-muted)',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="card-list">
          {filteredCards.map((card) => (
            <Link
              key={card.id}
              to={`/tarot/${card.id}`}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div className="card" style={{ borderLeft: `4px solid ${suitColor(card.suit, card.arcana)}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: suitColor(card.suit, card.arcana), fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {suitLabel(card)}
                  </span>
                  <Sparkles size={18} color={suitColor(card.suit, card.arcana)} />
                </div>

                <h3 style={{ margin: '0.5rem 0', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {card.number && <span style={{ color: 'var(--text-muted)' }}>{card.number}</span>}
                  {card.name}
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '0.5rem', gap: '1rem' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'baseline', flex: 1, minWidth: 0 }}>
                    {card.hebrewLetter && <span><strong>Hebrew:</strong> {card.hebrewLetter.split(' - ')[0]}</span>}
                    {card.astrology && <span className="astro-symbols"><strong>Astrology:</strong> <AstroText text={card.astrology.split('(')[0].trim()} /></span>}
                  </div>
                  <div style={{ color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', flexShrink: 0, marginTop: '0.1rem' }}>
                    View <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </>}

      {view === 'spreads' && (
        <div className="card-list">
          {spreads.map(spread => {
            const isExpanded = expandedSpread === spread.id;
            return (
              <div key={spread.id}
                className="card"
                style={{ borderLeft: '4px solid var(--accent)', cursor: 'pointer' }}
                onClick={() => setExpandedSpread(isExpanded ? null : spread.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {spread.cardCount} cards · {spread.difficulty}
                  </span>
                  <Sparkles size={18} color="var(--accent)" />
                </div>

                <h3 style={{ margin: '0.5rem 0', fontSize: '1.3rem' }}>
                  {spread.name}
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0, flex: 1, paddingRight: '1rem' }}>
                    {spread.description.split('\n\n')[0].slice(0, 120)}...
                  </p>
                  <div style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', flexShrink: 0 }}>
                    {isExpanded ? 'Close' : 'View'} <ChevronRight size={16} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                  </div>
                </div>

                {isExpanded && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ margin: '1rem 0', color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      {spread.description.split('\n\n').map((p, i) => <p key={i} style={{ margin: '0 0 0.75rem' }}>{p}</p>)}
                    </div>
                    <div style={{ margin: '1.5rem 0', background: 'var(--bg-deep)', borderRadius: '8px', padding: '1rem', border: '1px solid var(--border-subtle)' }}>
                      <SpreadDiagram spread={spread} />
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
