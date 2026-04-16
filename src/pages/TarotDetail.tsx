import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { tarotData, type TarotCard } from '../data/tarotData';
import { paths, sephiroth } from '../data/treeOfLifeData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { autoLinkChildren } from '../utils/autoGlossary';
import AstroFieldLink from '../components/AstroFieldLink';

// Map sephirah names → id for clickable tree links
const sephNameToNum = new Map(sephiroth.map(s => [s.name, s.number]));
const sephNames = [...sephNameToNum.keys()].sort((a, b) => b.length - a.length);
const sephRe = new RegExp(`\\b(${sephNames.join('|')})\\b`, 'g');

const TreePathLink: React.FC<{ text: string }> = ({ text }) => {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  sephRe.lastIndex = 0;
  while ((m = sephRe.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const name = m[1];
    const num = sephNameToNum.get(name)!;
    nodes.push(
      <Link key={k++} to={`/tree-of-life?view=sephirah&id=${num}`}
        style={{ color: 'var(--accent-lavender)', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '2px' }}>
        {name}
      </Link>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
};

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

const TarotDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const card = tarotData.find(c => c.id === id);

  if (!card) {
    return (
      <div className="main-content">
        <h2>Card not found</h2>
        <button onClick={() => navigate(-1)} className="back-button">Back</button>
      </div>
    );
  }

  const markdownComponents = {
    h1: ({node, ...props}: any) => <h1 className="detail-title" {...props} />,
    h4: ({node, ...props}: any) => <h2 style={{marginTop: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', color: 'var(--accent-purple)'}} {...props} />,
    p: ({node, children, ...props}: any) => <p style={{lineHeight: '1.8', marginBottom: '1.25rem', fontSize: '1rem'}} {...props}>{autoLinkChildren(children)}</p>,
    strong: ({node, ...props}: any) => {
      const symbolRegex = /(☿|♀|♂|♃|♄|♅|♆|♇)/g;

      const processText = (text: string) => {
        const parts = text.split(symbolRegex);
        if (parts.length === 1) return text;
        return parts.map((part, i) => {
          if (part.match(symbolRegex)) {
            return (
              <span key={i} style={{ fontSize: '2.0rem', verticalAlign: 'middle', marginRight: '0.2rem', fontWeight: 'normal', display: 'inline-block', lineHeight: '1' }}>
                {part}
              </span>
            );
          }
          return part;
        });
      };

      let newChildren;
      if (Array.isArray(props.children)) {
        newChildren = props.children.map((child: any, index: number) => {
          if (typeof child === 'string') return <React.Fragment key={index}>{processText(child)}</React.Fragment>;
          return child;
        });
      } else if (typeof props.children === 'string') {
        newChildren = processText(props.children);
      } else {
        newChildren = props.children;
      }

      return <strong style={{color: 'var(--accent-gold)'}}>{newChildren}</strong>;
    },
    li: ({node, children, ...props}: any) => <li style={{marginBottom: '0.75rem', lineHeight: '1.6', fontSize: '1rem'}} {...props}>{autoLinkChildren(children)}</li>,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="main-content detail-container"
    >
      <button onClick={() => navigate(-1)} className="back-button">
        <ArrowLeft size={20} /> Back
      </button>

      <div className="card detail-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ color: suitColor(card.suit, card.arcana), fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            {card.arcana === 'Major' ? 'Major Arcana' : `${card.suit} — ${card.arcana}`}
          </span>
          <h1 className="detail-title">
            {card.number ? `${card.number} - ` : ''}{card.name}
          </h1>

          <div className="meta-grid">
            {card.hebrewLetter && (
              <div className="meta-box">
                <div className="meta-label">Hebrew Letter</div>
                <div className="meta-value">{card.hebrewLetter}</div>
              </div>
            )}
            {card.astrology && (
              <div className="meta-box">
                <div className="meta-label">Astrology</div>
                <div className="meta-value astro-symbols"><AstroFieldLink text={card.astrology} /></div>
              </div>
            )}
            {card.path && (
              <div className="meta-box">
                <div className="meta-label">Tree of Life</div>
                <div className="meta-value"><TreePathLink text={card.path} /></div>
              </div>
            )}
          </div>
        </div>

        <div className="article-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {card.visualDescription}
          </ReactMarkdown>

          <h2 style={{ color: 'var(--color-peach)', fontFamily: 'var(--font-serif)' }}>Esoteric Meaning</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {card.esotericMeaning}
          </ReactMarkdown>

          <h2 style={{ color: 'var(--color-teal)', fontFamily: 'var(--font-serif)' }}>Jungian Psychological Meaning</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {card.jungianMeaning}
          </ReactMarkdown>
        </div>

        {/* === Related Cards === */}
        {(() => {
          const related: { label: string; cards: TarotCard[] }[] = [];

          // Same number across suits (for pip cards)
          if (card.arcana === 'Minor' && card.number) {
            const sameNumber = tarotData.filter(c =>
              c.id !== card.id && c.number === card.number && c.arcana === 'Minor'
            );
            if (sameNumber.length > 0) {
              related.push({ label: `Other ${card.number}s`, cards: sameNumber });
            }
          }

          // Same suit neighbors (for pip cards and court cards)
          if (card.suit) {
            const sameSuit = tarotData.filter(c => c.suit === card.suit && c.id !== card.id);
            if (sameSuit.length > 0) {
              related.push({ label: `${card.suit} Suit`, cards: sameSuit });
            }
          }

          // Same rank across suits (for court cards)
          if (card.arcana === 'Court') {
            const rank = card.name.split(' of ')[0]; // "Knight", "Queen", etc.
            const sameRank = tarotData.filter(c =>
              c.id !== card.id && c.arcana === 'Court' && c.name.startsWith(rank)
            );
            if (sameRank.length > 0) {
              related.push({ label: `Other ${rank}s`, cards: sameRank });
            }
          }

          // Major Arcana on adjacent paths (for Major cards)
          if (card.arcana === 'Major' && card.path) {
            const pathMatch = card.path.match(/Path (\d+)/);
            if (pathMatch) {
              const pathNum = parseInt(pathMatch[1]);
              const thisPath = paths.find(p => p.number === pathNum);
              if (thisPath) {
                // Cards that share a Sephirah with this path
                const connectedPaths = paths.filter(p =>
                  p.number !== pathNum &&
                  (p.from === thisPath.from || p.to === thisPath.from || p.from === thisPath.to || p.to === thisPath.to)
                );
                const connectedCards = connectedPaths
                  .map(p => tarotData.find(c => c.id === p.cardId))
                  .filter((c): c is TarotCard => c !== undefined && c.id !== card.id);
                if (connectedCards.length > 0) {
                  related.push({ label: 'Connected Paths', cards: connectedCards });
                }
              }
            }
          }

          // Sephirah card (for pip cards — the Major on the path TO this Sephirah)
          if (card.arcana === 'Minor' && card.path) {
            const sephMatch = card.path.match(/(\w+) —/);
            if (sephMatch) {
              const sephName = sephMatch[1];
              const sephPaths = paths.filter(p => {
                const fromSeph = p.from;
                const toSeph = p.to;
                // Find paths that connect to this Sephirah number
                const sephNumbers: Record<string, number> = {
                  Kether: 1, Chokmah: 2, Binah: 3, Chesed: 4, Geburah: 5,
                  Tiphareth: 6, Netzach: 7, Hod: 8, Yesod: 9, Malkuth: 10
                };
                const num = sephNumbers[sephName];
                return num !== undefined && (fromSeph === num || toSeph === num);
              });
              const pathCards = sephPaths
                .map(p => tarotData.find(c => c.id === p.cardId))
                .filter((c): c is TarotCard => c !== undefined);
              if (pathCards.length > 0) {
                related.push({ label: `Paths through ${sephMatch[1]}`, cards: pathCards });
              }
            }
          }

          if (related.length === 0) return null;

          return (
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
              <h2 style={{ color: 'var(--accent-lavender)', fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>Related Cards</h2>
              {related.map((group, gi) => (
                <div key={gi} style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 0.5rem' }}>
                    {group.label}
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {group.cards.map(c => (
                      <Link key={c.id} to={`/tarot/${c.id}`}
                        style={{
                          textDecoration: 'none',
                          padding: '0.35rem 0.7rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          background: 'var(--bg-surface)',
                          border: `1px solid ${suitColor(c.suit, c.arcana)}`,
                          color: suitColor(c.suit, c.arcana),
                          borderColor: suitColor(c.suit, c.arcana),
                          opacity: 0.7,
                          transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
                      >
                        {c.number ? `${c.number} ` : ''}{c.name.split(' — ')[0]}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </motion.div>
  );
};

export default TarotDetail;
