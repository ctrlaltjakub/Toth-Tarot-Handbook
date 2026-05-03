import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { sephiroth, paths, daath, worlds, abyss, pillars, type Sephirah, type TreePath } from '../data/treeOfLifeData';
import { AstroText } from '../utils/formatSymbols';
import { autoLinkGlossary } from '../utils/autoGlossary';
import PlanetGlyph from './PlanetGlyph';

/** Render description paragraphs, turning **Bold:** lines into styled section headers */
const renderDescription = (text: string) =>
  text.split('\n\n').map((p, i) => {
    const boldMatch = p.match(/^\*\*(.+?)\*\*\s*(.*)/s);
    if (boldMatch) {
      const heading = boldMatch[1].replace(/:$/, '');
      const body = boldMatch[2];
      const headingColor = heading.includes('Jungian') ? 'var(--color-teal)' : 'var(--accent-lavender)';
      return (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <h4 style={{ color: headingColor, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.3rem', fontFamily: 'var(--font-serif)' }}>
            {heading}
          </h4>
          <p style={{ margin: 0 }}>{autoLinkGlossary(body)}</p>
        </div>
      );
    }
    return <p key={i}>{autoLinkGlossary(p)}</p>;
  });

interface TreeDetailPanelProps {
  type: 'sephirah' | 'path' | 'daath' | 'abyss' | 'world' | 'pillar' | null;
  id: number | null;
  name: string | null;
  onClose: () => void;
}

const suitNames = ['Wands', 'Cups', 'Swords', 'Disks'];
const suitColors = ['var(--color-fire)', 'var(--color-water)', 'var(--color-air)', 'var(--color-earth)'];

// ============================================


// ============================================
// Panel: Sephirah
// ============================================
const SephirahDetail: React.FC<{ seph: Sephirah; onClose: () => void }> = ({ seph, onClose }) => {
  const world = worlds.find(w => w.sephiroth.includes(seph.number));
  const connectedPaths = paths.filter(p => p.from === seph.number || p.to === seph.number);

  return (
    <div className="tree-panel-content">
      <div className="tree-panel-header">
        <div>
          <span className="tree-panel-badge" style={{ color: `var(${seph.colorVar})` }}>
            {seph.pillar} Pillar — {world?.name}
          </span>
          <h2 style={{ color: `var(${seph.colorVar})`, margin: '0.25rem 0' }}>
            {seph.number}. {seph.name}
          </h2>
          <span style={{ fontSize: '1.1rem', opacity: 0.7 }}>{seph.hebrew}</span>
          <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem', fontSize: '0.9rem' }}>— {seph.meaning}</span>
        </div>
        <button onClick={onClose} className="tree-panel-close"><X size={20} /></button>
      </div>


      <div className="tree-panel-meta">
        <div className="tree-panel-meta-item">
          <span className="tree-panel-meta-label">Planet</span>
          <span className="astro-symbols">
            {seph.planet.includes('Neptune') ? (
              <>
                <AstroText text={seph.planet.split('/')[0].trim()} />
                {' / '}
                <Link to="/astrology?view=planet&name=Neptune" style={{ color: 'var(--accent-lavender)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <PlanetGlyph name="Neptune" size={16} color="var(--accent-lavender)" strokeWidth={0.7} /> Neptune
                </Link>
              </>
            ) : (
              <AstroText text={seph.planet} />
            )}
          </span>
        </div>
      </div>

      <div className="tree-panel-body">
        {renderDescription(seph.description)}
      </div>

      <div className="tree-panel-section">
        <h3>Paths</h3>
        <div className="tree-panel-links">
          {connectedPaths.map(p => {
            const other = sephiroth.find(s => s.number === (p.from === seph.number ? p.to : p.from))!;
            return (
              <Link key={p.number} to={`/tarot/${p.cardId}`} className="tree-panel-link">
                <span style={{ color: 'var(--accent-warm)', fontFamily: 'var(--font-serif)', marginRight: '0.5rem' }}>{p.romanNumeral}</span>
                <span>{p.cardName}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 'auto' }}>→ {other.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="tree-panel-section">
        <h3>Cards on this Sephirah</h3>
        <div className="tree-panel-links">
          {seph.pipCards.map((cardId, i) => (
            <Link key={cardId} to={`/tarot/${cardId}`} className="tree-panel-link">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: suitColors[i], flexShrink: 0 }} />
              <span>{suitNames[i]}: </span>
              <span style={{ color: 'var(--text-main)' }}>{cardId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// Panel: Path
// ============================================
const PathDetail: React.FC<{ path: TreePath; onClose: () => void }> = ({ path, onClose }) => {
  const fromSeph = sephiroth.find(s => s.number === path.from)!;
  const toSeph = sephiroth.find(s => s.number === path.to)!;

  return (
    <div className="tree-panel-content">
      <div className="tree-panel-header">
        <div>
          <span className="tree-panel-badge" style={{ color: 'var(--accent-warm)' }}>
            Path {path.number} — {path.letterMeaning}
          </span>
          <h2 style={{ color: 'var(--accent-warm)', margin: '0.25rem 0' }}>
            {path.romanNumeral}. {path.cardName}
          </h2>
          <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>{path.hebrewLetter}</span>
          <span className="astro-symbols" style={{ color: 'var(--text-muted)' }}>
            <AstroText text={path.astrology} />
          </span>
        </div>
        <button onClick={onClose} className="tree-panel-close"><X size={20} /></button>
      </div>


      <div className="tree-panel-meta">
        <div className="tree-panel-meta-item">
          <span className="tree-panel-meta-label">Connects</span>
          <span style={{ color: `var(${fromSeph.colorVar})` }}>{fromSeph.name}</span>
          <span style={{ color: 'var(--text-muted)', margin: '0 0.3rem' }}>↔</span>
          <span style={{ color: `var(${toSeph.colorVar})` }}>{toSeph.name}</span>
        </div>
      </div>

      <div className="tree-panel-section" style={{ marginTop: '1rem' }}>
        <Link to={`/tarot/${path.cardId}`} className="tree-panel-card-link">
          View full card description →
        </Link>
      </div>
    </div>
  );
};

// ============================================
// Panel: Daath
// ============================================
const DaathDetail: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="tree-panel-content">
    <div className="tree-panel-header">
      <div>
        <span className="tree-panel-badge" style={{ color: 'var(--color-maroon)' }}>Hidden Sephirah</span>
        <h2 style={{ color: 'var(--color-maroon)', margin: '0.25rem 0' }}>Daath</h2>
        <span style={{ fontSize: '1.1rem', opacity: 0.7 }}>{daath.hebrew}</span>
        <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem', fontSize: '0.9rem' }}>— {daath.meaning}</span>
      </div>
      <button onClick={onClose} className="tree-panel-close"><X size={20} /></button>
    </div>

    <div className="tree-panel-meta">
      <div className="tree-panel-meta-item">
        <span className="tree-panel-meta-label">Planet</span>
        <Link to="/astrology?view=planet&name=Pluto" style={{ color: 'var(--accent-lavender)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <PlanetGlyph name="Pluto" size={16} color="var(--accent-lavender)" strokeWidth={0.7} /> Pluto (modern)
        </Link>
      </div>
    </div>

    <div className="tree-panel-body">
      {renderDescription(daath.description)}
    </div>
  </div>
);

// ============================================
// Panel: Abyss
// ============================================
const AbyssDetail: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="tree-panel-content">
    <div className="tree-panel-header">
      <div>
        <span className="tree-panel-badge" style={{ color: 'var(--color-maroon)' }}>Between the Supernal Triad and the Lower Tree</span>
        <h2 style={{ color: 'var(--color-maroon)', margin: '0.25rem 0' }}>The Abyss</h2>
      </div>
      <button onClick={onClose} className="tree-panel-close"><X size={20} /></button>
    </div>
    <div className="tree-panel-body">
      {renderDescription(abyss.description)}
    </div>
  </div>
);

// ============================================
// Panel: World
// ============================================
const WorldDetail: React.FC<{ worldName: string; onClose: () => void }> = ({ worldName, onClose }) => {
  const world = worlds.find(w => w.name === worldName);
  if (!world) return null;

  const worldSephiroth = sephiroth.filter(s => world.sephiroth.includes(s.number));

  return (
    <div className="tree-panel-content">
      <div className="tree-panel-header">
        <div>
          <span className="tree-panel-badge" style={{ color: `var(${world.colorVar})` }}>
            {world.element} {world.elementSymbol} — Suit of {world.element === 'Fire' ? 'Wands' : world.element === 'Water' ? 'Cups' : world.element === 'Air' ? 'Swords' : 'Disks'}
          </span>
          <h2 style={{ color: `var(${world.colorVar})`, margin: '0.25rem 0' }}>
            {world.name}
          </h2>
          <span style={{ fontSize: '1.1rem', opacity: 0.7 }}>{world.hebrew}</span>
          <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem', fontSize: '0.9rem' }}>— {world.meaning}</span>
        </div>
        <button onClick={onClose} className="tree-panel-close"><X size={20} /></button>
      </div>


      <div className="tree-panel-body">
        {renderDescription(world.description)}
      </div>

      <div className="tree-panel-section">
        <h3>Sephiroth in {world.name}</h3>
        <div className="tree-panel-links">
          {worldSephiroth.map(s => (
            <div key={s.number} className="tree-panel-link" style={{ cursor: 'default' }}>
              <span style={{ color: `var(${s.colorVar})`, fontFamily: 'var(--font-serif)', fontWeight: 600, marginRight: '0.5rem' }}>{s.number}</span>
              <span style={{ color: `var(${s.colorVar})` }}>{s.name}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 'auto' }}>{s.meaning}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// Panel: Pillar
// ============================================
const PillarDetail: React.FC<{ pillarName: string; onClose: () => void }> = ({ pillarName, onClose }) => {
  const pillar = pillars.find(p => p.name.includes(pillarName));
  if (!pillar) return null;

  const pillarSephiroth = sephiroth.filter(s => pillar.sephiroth.includes(s.number));

  return (
    <div className="tree-panel-content">
      <div className="tree-panel-header">
        <div>
          <span className="tree-panel-badge" style={{ color: 'var(--accent-lavender)' }}>
            {pillarName === 'Severity' ? 'Left Column' : pillarName === 'Mercy' ? 'Right Column' : 'Central Column'}
          </span>
          <h2 style={{ color: 'var(--accent-lavender)', margin: '0.25rem 0' }}>
            {pillar.name}
          </h2>
          <span style={{ fontSize: '1rem', opacity: 0.7 }}>{pillar.hebrew}</span>
        </div>
        <button onClick={onClose} className="tree-panel-close"><X size={20} /></button>
      </div>


      <div className="tree-panel-body">
        {renderDescription(pillar.description)}
      </div>

      <div className="tree-panel-section">
        <h3>Sephiroth</h3>
        <div className="tree-panel-links">
          {pillarSephiroth.map(s => (
            <div key={s.number} className="tree-panel-link" style={{ cursor: 'default' }}>
              <span style={{ color: `var(${s.colorVar})`, fontFamily: 'var(--font-serif)', fontWeight: 600, marginRight: '0.5rem' }}>{s.number}</span>
              <span style={{ color: `var(${s.colorVar})` }}>{s.name}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 'auto' }}>{s.meaning}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// Main Panel Router
// ============================================
const TreeDetailPanel: React.FC<TreeDetailPanelProps> = ({ type, id, name, onClose }) => {
  if (!type) return null;

  let content: React.ReactNode = null;

  if (type === 'sephirah' && id !== null) {
    const seph = sephiroth.find(s => s.number === id);
    if (seph) content = <SephirahDetail seph={seph} onClose={onClose} />;
  } else if (type === 'path' && id !== null) {
    const path = paths.find(p => p.number === id);
    if (path) content = <PathDetail path={path} onClose={onClose} />;
  } else if (type === 'daath') {
    content = <DaathDetail onClose={onClose} />;
  } else if (type === 'abyss') {
    content = <AbyssDetail onClose={onClose} />;
  } else if (type === 'world' && name) {
    content = <WorldDetail worldName={name} onClose={onClose} />;
  } else if (type === 'pillar' && name) {
    content = <PillarDetail pillarName={name} onClose={onClose} />;
  }

  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="tree-detail-panel"
    >
      {content}
    </motion.div>
  );
};

export default TreeDetailPanel;
