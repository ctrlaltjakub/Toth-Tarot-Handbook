import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { zodiacSigns, planets, elements } from '../data/astrologyData';
import QualityIcon from './QualityIcon';
import { AstroText } from '../utils/formatSymbols';
import { autoLinkGlossary } from '../utils/autoGlossary';

// Map of card name fragments → card IDs, built from sign decans
type CardLinkMap = Map<string, string>;

// Render inline bold (**text**) within a string, with optional card linking
const renderInlineBold = (text: string, cardLinks?: CardLinkMap): React.ReactNode[] => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, j) => {
    const boldMatch = part.match(/^\*\*(.+)\*\*$/);
    if (boldMatch) {
      const inner = boldMatch[1];
      // Check if this bold segment contains a card name we can link
      if (cardLinks) {
        for (const [cardName, cardId] of cardLinks) {
          if (inner.includes(cardName)) {
            // Split around the card name to preserve the rest of the bold text
            const idx = inner.indexOf(cardName);
            const before = inner.slice(0, idx);
            const after = inner.slice(idx + cardName.length);
            return (
              <strong key={j} style={{ color: 'var(--accent-gold)' }}>
                {before}
                <Link to={`/tarot/${cardId}`} style={{ color: 'var(--accent-gold)', textDecoration: 'underline', textDecorationStyle: 'dotted' as const, textUnderlineOffset: '2px' }}>
                  {cardName}
                </Link>
                {after}
              </strong>
            );
          }
        }
      }
      return <strong key={j} style={{ color: 'var(--accent-gold)' }}>{autoLinkGlossary(inner)}</strong>;
    }
    return <React.Fragment key={j}>{autoLinkGlossary(part)}</React.Fragment>;
  });
};

// Render a block of lines, detecting bullet lists vs prose
const renderBody = (body: string, key: string, cardLinks?: CardLinkMap): React.ReactNode => {
  const lines = body.split('\n').filter(l => l.trim());
  if (lines.length === 0) return null;

  const allBullets = lines.every(l => l.trim().startsWith('- '));
  if (allBullets) {
    return (
      <ul key={key} style={{ margin: '0.3rem 0 0', paddingLeft: '1.1rem', listStyle: 'none' }}>
        {lines.map((line, j) => (
          <li key={j} style={{ marginBottom: '0.35rem', lineHeight: 1.6, position: 'relative', paddingLeft: '0.2rem' }}>
            <span style={{ position: 'absolute', left: '-1rem', color: 'var(--text-subtle)' }}>·</span>
            {renderInlineBold(line.replace(/^-\s*/, ''), cardLinks)}
          </li>
        ))}
      </ul>
    );
  }

  // Mixed: prose then bullets
  const proseChunks: string[] = [];
  const bulletChunks: string[] = [];
  let hitBullets = false;
  for (const line of lines) {
    if (line.trim().startsWith('- ')) {
      hitBullets = true;
      bulletChunks.push(line.trim().replace(/^-\s*/, ''));
    } else {
      if (!hitBullets) proseChunks.push(line.trim());
      else bulletChunks.push(line.trim());
    }
  }

  if (bulletChunks.length > 0) {
    return (
      <div key={key}>
        {proseChunks.length > 0 && <p style={{ margin: '0 0 0.4rem' }}>{autoLinkGlossary(proseChunks.join(' '))}</p>}
        <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1.1rem', listStyle: 'none' }}>
          {bulletChunks.map((line, j) => (
            <li key={j} style={{ marginBottom: '0.35rem', lineHeight: 1.6, position: 'relative', paddingLeft: '0.2rem' }}>
              <span style={{ position: 'absolute', left: '-1rem', color: 'var(--text-subtle)' }}>·</span>
              {renderInlineBold(line, cardLinks)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <p key={key} style={{ margin: 0 }}>{autoLinkGlossary(body)}</p>;
};

// Render description text, splitting **Bold:** sections into styled headers
// Handles bullet lists (lines starting with "- ") and inline **bold**
const DescriptionBody: React.FC<{ text: string; cardLinks?: CardLinkMap }> = ({ text, cardLinks }) => {
  const paragraphs = text.split('\n\n');
  return (
    <div className="tree-panel-body">
      {paragraphs.map((p, i) => {
        const boldMatch = p.match(/^\*\*(.+?)\*\*\s*(.*)/s);
        if (boldMatch) {
          const heading = boldMatch[1].replace(/:$/, '');
          const body = boldMatch[2];
          const headingColor = heading.includes('Rulership') ? 'var(--accent-warm)'
            : heading.includes('Exaltation') ? 'var(--color-peach)'
            : heading.includes('Thoth') ? 'var(--color-flamingo)'
            : heading.includes('Jungian') ? 'var(--color-teal)'
            : heading.includes('Decan') ? 'var(--color-sapphire)'
            : 'var(--accent-lavender)';
          const isDecanSection = heading.includes('Decan');
          return (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <h4 style={{ color: headingColor, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.3rem', fontFamily: 'var(--font-serif)' }}>
                {heading}
              </h4>
              {renderBody(body, `body-${i}`, isDecanSection ? cardLinks : undefined)}
            </div>
          );
        }

        // Plain bullet list paragraph
        const lines = p.split('\n').filter(l => l.trim());
        if (lines.length > 1 && lines.every(l => l.trim().startsWith('- '))) {
          return (
            <ul key={i} style={{ margin: '0 0 1rem', paddingLeft: '1.1rem', listStyle: 'none' }}>
              {lines.map((line, j) => (
                <li key={j} style={{ marginBottom: '0.35rem', lineHeight: 1.6, position: 'relative', paddingLeft: '0.2rem' }}>
                  <span style={{ position: 'absolute', left: '-1rem', color: 'var(--text-subtle)' }}>·</span>
                  {renderInlineBold(line.replace(/^-\s*/, ''))}
                </li>
              ))}
            </ul>
          );
        }

        return <p key={i}>{autoLinkGlossary(p)}</p>;
      })}
    </div>
  );
};

interface AstrologyDetailPanelProps {
  type: 'sign' | 'planet' | 'element' | null;
  name: string | null;
  onClose: () => void;
}

// ============================================
// Panel: Zodiac Sign
// ============================================
const SignDetail: React.FC<{ signName: string; onClose: () => void }> = ({ signName, onClose }) => {
  const sign = zodiacSigns.find(s => s.name === signName);
  if (!sign) return null;

  return (
    <div className="tree-panel-content">
      <div className="tree-panel-header">
        <div>
          <span className="tree-panel-badge" style={{ color: `var(${sign.colorVar})` }}>
            {sign.quality} {sign.element}
          </span>
          <h2 style={{ color: `var(${sign.colorVar})`, margin: '0.25rem 0' }}>
            <span style={{ fontSize: '1.4rem', marginRight: '0.5rem' }}>{sign.glyph}</span>
            {sign.name}
          </h2>
        </div>
        <button onClick={onClose} className="tree-panel-close"><X size={20} /></button>
      </div>

      <div className="tree-panel-meta" style={{ flexWrap: 'wrap' }}>
        <div className="tree-panel-meta-item">
          <span className="tree-panel-meta-label">Ruler</span>
          <span className="astro-symbols"><AstroText text={`${sign.rulerGlyph} ${sign.ruler}`} /></span>
        </div>
        {sign.exaltation && (
          <div className="tree-panel-meta-item">
            <span className="tree-panel-meta-label">Exalted</span>
            <span className="astro-symbols"><AstroText text={`${sign.exaltationGlyph} ${sign.exaltation}`} /></span>
          </div>
        )}
      </div>

      <DescriptionBody text={sign.description} cardLinks={new Map(sign.decans.flatMap(d => {
        // Match both "Two of Wands — Dominion" and "Two of Wands (Dominion)" formats
        const base = d.cardName.split(' — ')[0]; // e.g. "Two of Wands"
        return [[d.cardName, d.cardId], [base, d.cardId]] as [string, string][];
      }))} />

      {/* Major Arcana */}
      <div className="tree-panel-section">
        <h3>Major Arcana</h3>
        <div className="tree-panel-links">
          <Link to={`/tarot/${sign.majorArcana.cardId}`} className="tree-panel-link">
            <span style={{ color: 'var(--accent-warm)', fontFamily: 'var(--font-serif)', marginRight: '0.5rem' }}>{sign.majorArcana.romanNumeral}</span>
            <span>{sign.majorArcana.cardName}</span>
          </Link>
        </div>
      </div>

      {/* Decans */}
      <div className="tree-panel-section">
        <h3>Decans & Pip Cards</h3>
        <div className="tree-panel-links">
          {sign.decans.map((decan, i) => (
            <Link key={i} to={`/tarot/${decan.cardId}`} className="tree-panel-link">
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', width: '55px', flexShrink: 0 }}>{decan.degrees}</span>
              <span className="astro-symbols" style={{ width: '80px', flexShrink: 0, whiteSpace: 'nowrap' }}><AstroText text={decan.subRulerGlyph} /> <span style={{ fontSize: '0.75rem' }}>{decan.subRuler}</span></span>
              <span>{decan.cardName}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Court Cards */}
      {sign.courtCards.length > 0 && (
        <div className="tree-panel-section">
          <h3>Court Cards</h3>
          <div className="tree-panel-links">
            {sign.courtCards.map((cc, i) => (
              <Link key={i} to={`/tarot/${cc.cardId}`} className="tree-panel-link">
                <span>{cc.cardName}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: 'auto' }}>{cc.range}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// Panel: Planet
// ============================================
const PlanetDetail: React.FC<{ planetName: string; onClose: () => void }> = ({ planetName, onClose }) => {
  const planet = planets.find(p => p.name === planetName);
  if (!planet) return null;

  return (
    <div className="tree-panel-content">
      <div className="tree-panel-header">
        <div>
          <span className="tree-panel-badge" style={{ color: 'var(--accent)' }}>
            Planet — {planet.sephirah}
          </span>
          <h2 style={{ color: 'var(--accent)', margin: '0.25rem 0' }}>
            <span className="astro-symbols" style={{ fontSize: '1.4rem', marginRight: '0.5rem' }}><AstroText text={planet.glyph} /></span>
            {planet.name}
          </h2>
        </div>
        <button onClick={onClose} className="tree-panel-close"><X size={20} /></button>
      </div>

      <div className="tree-panel-meta" style={{ flexWrap: 'wrap' }}>
        <div className="tree-panel-meta-item">
          <span className="tree-panel-meta-label">Rules</span>
          <span>{planet.rules.join(', ')}</span>
        </div>
        {planet.exaltedIn && (
          <div className="tree-panel-meta-item">
            <span className="tree-panel-meta-label">Exalted in</span>
            <span>{planet.exaltedIn}</span>
          </div>
        )}
        <div className="tree-panel-meta-item">
          <span className="tree-panel-meta-label">Tree of Life</span>
          <Link to={`/tree-of-life?view=sephirah&id=${planet.sephirahNumber}`} style={{ color: 'var(--accent-lavender)', textDecoration: 'none' }}>
            {planet.sephirah}
          </Link>
        </div>
      </div>

      <DescriptionBody text={planet.description} />

      <div className="tree-panel-section">
        <h3>Major Arcana</h3>
        <div className="tree-panel-links">
          <Link to={`/tarot/${planet.majorArcana.cardId}`} className="tree-panel-link">
            <span style={{ color: 'var(--accent-warm)', fontFamily: 'var(--font-serif)', marginRight: '0.5rem' }}>{planet.majorArcana.romanNumeral}</span>
            <span>{planet.majorArcana.cardName}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Panel: Element
// ============================================
const ElementDetail: React.FC<{ elementName: string; onClose: () => void }> = ({ elementName, onClose }) => {
  const element = elements.find(e => e.name === elementName);
  if (!element) return null;

  return (
    <div className="tree-panel-content">
      <div className="tree-panel-header">
        <div>
          <span className="tree-panel-badge" style={{ color: `var(${element.colorVar})` }}>
            Element — Suit of {element.suits}
          </span>
          <h2 style={{ color: `var(${element.colorVar})`, margin: '0.25rem 0' }}>
            <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>{element.symbol}</span>
            {element.name}
          </h2>
        </div>
        <button onClick={onClose} className="tree-panel-close"><X size={20} /></button>
      </div>

      <div className="tree-panel-meta">
        <div className="tree-panel-meta-item">
          <span className="tree-panel-meta-label">Signs</span>
          <span>{element.signs.join(', ')}</span>
        </div>
      </div>

      <div className="tree-panel-body">
      <DescriptionBody text={element.description} />
      </div>

      {element.majorArcana && (
        <div className="tree-panel-section">
          <h3>Elemental Major Arcana</h3>
          <div className="tree-panel-links">
            <Link to={`/tarot/${element.majorArcana.cardId}`} className="tree-panel-link">
              <span style={{ color: 'var(--accent-warm)', fontFamily: 'var(--font-serif)', marginRight: '0.5rem' }}>{element.majorArcana.romanNumeral}</span>
              <span>{element.majorArcana.cardName}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// Panel: Terra (Earth as planet at centre)
// ============================================
const TerraDetail: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="tree-panel-content">
    <div className="tree-panel-header">
      <div>
        <span className="tree-panel-badge" style={{ color: 'var(--color-earth)' }}>Centre of the Wheel — Malkuth</span>
        <h2 style={{ color: 'var(--color-earth)', margin: '0.25rem 0' }}>
          <span style={{ fontSize: '1.4rem', marginRight: '0.5rem' }}>🜨</span> Terra
        </h2>
      </div>
      <button onClick={onClose} className="tree-panel-close"><X size={20} /></button>
    </div>
    <DescriptionBody text={`The Earth sits at the centre of the astrological wheel — the fixed point around which all celestial bodies revolve. In the geocentric model that underlies traditional astrology, the observer stands on Earth and watches the heavens turn.

**Thoth Tarot:** Terra corresponds to Malkuth — the Kingdom, the 10th and final Sephirah on the Tree of Life. It is the material world where all cosmic forces ultimately manifest. The suit of Disks represents Earth, and the Ace of Disks affirms the identity of Sol and Terra — the Sun and the Earth are one.

**Jungian Meaning:** In Jungian terms, Terra is the Ego's immediate reality — the body, the senses, the physical world that is simultaneously the starting point and the ultimate destination of the individuation process. The Earth at the centre of the astrological wheel reminds us that all cosmic symbolism is ultimately about this life, this body, this moment of incarnated existence.`} />
    <div className="tree-panel-section">
      <h3>Correspondences</h3>
      <div className="tree-panel-links">
        <Link to="/tree-of-life?view=sephirah&id=10" className="tree-panel-link">
          <span style={{ color: 'var(--color-earth)', marginRight: '0.5rem' }}>10</span> Malkuth — The Kingdom
        </Link>
        <Link to="/tarot/ace-of-disks" className="tree-panel-link">
          <span style={{ color: 'var(--accent-warm)', fontFamily: 'var(--font-serif)', marginRight: '0.5rem' }}>Ace</span> Ace of Disks — Root of Earth
        </Link>
      </div>
    </div>
  </div>
);

// ============================================
// Panel: Quality (Cardinal, Fixed, Mutable)
// ============================================
const qualityData: Record<string, { symbol: string; color: string; signs: string[]; description: string }> = {
  Cardinal: {
    symbol: '⟁', color: 'var(--ctp-peach)',
    signs: ['Aries', 'Cancer', 'Libra', 'Capricorn'],
    description: `Cardinal signs mark the beginning of each season and initiate action. They are the movers, the starters, the forces that set things in motion. Each Cardinal sign begins at a solstice or equinox point.

**Thoth Tarot:** The four Cardinal signs carry some of the most powerful Major Arcana: The Emperor (Aries), The Chariot (Cancer), Adjustment (Libra), and The Devil (Capricorn). These cards all deal with the initiation of force — the establishment of authority, the beginning of a journey, the setting of balance, the assertion of material power.

**Jungian Meaning:** Cardinal energy represents the psyche's capacity for decisive action — the moment when potential becomes actual, when intention crystallizes into the first concrete step. It is the archetype of the Beginning, the threshold-crossing that commits the individual to a new path.`
  },
  Fixed: {
    symbol: '⊞', color: 'var(--ctp-pink)',
    signs: ['Taurus', 'Leo', 'Scorpio', 'Aquarius'],
    description: `Fixed signs occupy the middle of each season and sustain, concentrate, and deepen energy. They are the stabilizers, the endurers, the forces that maintain what has been initiated. The four Fixed signs are also the four Kerubim — the Bull, the Lion, the Eagle, and the Man — the guardians of every sacred shrine.

**Thoth Tarot:** The four Fixed signs carry: The Hierophant (Taurus), Lust (Leo), Death (Scorpio), and The Star (Aquarius). These cards deal with the sustaining and transforming of force — the establishment of tradition, the ecstatic embrace of power, the death-and-rebirth cycle, and the vision that endures beyond destruction.

**Jungian Meaning:** Fixed energy represents the psyche's capacity for persistence, concentration, and depth. It is the archetype of Endurance — the force that holds a position, deepens a commitment, and refuses to let go until the work is complete. The four Kerubim represent the four functions of consciousness (Sensation, Feeling, Intuition, Thinking) in their most stable and integrated form.`
  },
  Mutable: {
    symbol: '⟠', color: 'var(--ctp-lavender)',
    signs: ['Gemini', 'Virgo', 'Sagittarius', 'Pisces'],
    description: `Mutable signs occupy the end of each season and adapt, refine, and dissolve energy to prepare for the transition to the next. They are the changers, the refiners, the forces that break down old forms so that new ones can emerge.

**Thoth Tarot:** The four Mutable signs carry: The Lovers (Gemini), The Hermit (Virgo), Art (Sagittarius), and The Moon (Pisces). These cards deal with the transformation and dissolution of force — the analysis of opposites, the solitary refinement, the alchemical synthesis, and the midnight passage through darkness toward renewal.

**Jungian Meaning:** Mutable energy represents the psyche's capacity for adaptation, flexibility, and the acceptance of change. It is the archetype of Transition — the force that dissolves rigid structures, bridges one state to the next, and ensures that the cycle of creation-preservation-destruction continues without stagnation.`
  },
};

const QualityDetail: React.FC<{ qualityName: string; onClose: () => void }> = ({ qualityName, onClose }) => {
  const data = qualityData[qualityName];
  if (!data) return null;

  return (
    <div className="tree-panel-content">
      <div className="tree-panel-header">
        <div>
          <span className="tree-panel-badge" style={{ color: data.color }}>Quality — Modality</span>
          <h2 style={{ color: data.color, margin: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <QualityIcon name={qualityName} size={22} color={data.color} /> {qualityName}
          </h2>
        </div>
        <button onClick={onClose} className="tree-panel-close"><X size={20} /></button>
      </div>

      <div className="tree-panel-meta">
        <div className="tree-panel-meta-item">
          <span className="tree-panel-meta-label">Signs</span>
          <span>{data.signs.join(', ')}</span>
        </div>
      </div>

      <DescriptionBody text={data.description} />
    </div>
  );
};

// ============================================
// Main Panel Router
// ============================================
const AstrologyDetailPanel: React.FC<AstrologyDetailPanelProps> = ({ type, name, onClose }) => {
  if (!type || !name) return null;

  let content: React.ReactNode = null;

  if (type === 'sign') content = <SignDetail signName={name} onClose={onClose} />;
  else if (type === 'planet') content = <PlanetDetail planetName={name} onClose={onClose} />;
  else if (type === 'element' && name === 'Earth-Planet') content = <TerraDetail onClose={onClose} />;
  else if (type === 'element' && qualityData[name]) content = <QualityDetail qualityName={name} onClose={onClose} />;
  else if (type === 'element') content = <ElementDetail elementName={name} onClose={onClose} />;

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

export default AstrologyDetailPanel;
