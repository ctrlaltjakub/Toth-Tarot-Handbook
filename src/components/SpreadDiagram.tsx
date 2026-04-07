import React from 'react';
import { type TarotSpread } from '../data/spreadsData';

interface SpreadDiagramProps {
  spread: TarotSpread;
}

const CARD_W = 70;
const CARD_H = 105;

const SpreadDiagram: React.FC<SpreadDiagramProps> = ({ spread }) => {
  // Celtic Cross card 2 is laid horizontally
  const isCelticCross = spread.id === 'celtic-cross';

  return (
    <div>
      {/* SVG Diagram — cards only */}
      <svg
        viewBox={`0 0 ${spread.svgWidth} ${spread.svgHeight}`}
        style={{ display: 'block', width: '100%', maxWidth: `${spread.svgWidth}px`, margin: '0 auto', height: 'auto' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {spread.positions.map(pos => {
          const isHorizontal = isCelticCross && pos.number === 2;
          const isHiddenBehindCross = isCelticCross && pos.number === 1;
          const w = isHorizontal ? CARD_H : CARD_W;
          const h = isHorizontal ? CARD_W : CARD_H;

          return (
            <g key={pos.number}>
              {/* Card shape */}
              <rect
                x={pos.x - w / 2} y={pos.y - h / 2}
                width={w} height={h} rx="5"
                fill="var(--spread-card)" stroke="var(--accent-warm)" strokeWidth="1.5" opacity="0.7"
              />
              {/* Inner border */}
              <rect
                x={pos.x - w / 2 + 4} y={pos.y - h / 2 + 4}
                width={w - 8} height={h - 8} rx="3"
                fill="none" stroke="var(--accent-warm)" strokeWidth="0.5" opacity="0.3"
              />
              {isHiddenBehindCross ? (
                <>
                  {/* Card 1 label on the side with dotted line */}
                  <line x1={pos.x - CARD_W / 2} y1={pos.y + CARD_H / 2 - 10}
                    x2={pos.x - CARD_W / 2 - 35} y2={pos.y + CARD_H / 2 + 15}
                    stroke="var(--accent-warm)" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.4" />
                  <rect x={pos.x - CARD_W / 2 - 38} y={pos.y + CARD_H / 2 + 12}
                    width="6" height="6" transform={`rotate(45, ${pos.x - CARD_W / 2 - 35}, ${pos.y + CARD_H / 2 + 15})`}
                    fill="var(--accent-warm)" opacity="0.4" />
                  <text x={pos.x - CARD_W / 2 - 40} y={pos.y + CARD_H / 2 + 15}
                    textAnchor="end" dominantBaseline="central"
                    fill="var(--accent-warm)" fontSize="16" fontFamily="var(--font-serif)" fontWeight="700">
                    1
                  </text>
                  <text x={pos.x - CARD_W / 2 - 40} y={pos.y + CARD_H / 2 + 28}
                    textAnchor="end" dominantBaseline="central"
                    fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-serif)" letterSpacing="0.04em">
                    {pos.name.toUpperCase()}
                  </text>
                </>
              ) : (
                <>
                  {/* Number */}
                  <text x={pos.x} y={pos.y - 10}
                    textAnchor="middle" dominantBaseline="central"
                    fill="var(--accent-warm)" fontSize="22" fontFamily="var(--font-serif)" fontWeight="700">
                    {pos.number}
                  </text>
                  {/* Name */}
                  <text x={pos.x} y={pos.y + 14}
                    textAnchor="middle" dominantBaseline="central"
                    fill="var(--text-muted)" fontSize={pos.name.length > 10 ? "6.5" : "8"} fontFamily="var(--font-serif)" letterSpacing="0.04em">
                    {pos.name.toUpperCase()}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Decorative corner marks */}
        <g opacity="0.15" stroke="var(--ctp-overlay0)" strokeWidth="0.5" fill="none">
          <path d={`M 5,5 L 20,5 M 5,5 L 5,20`} />
          <path d={`M ${spread.svgWidth - 5},5 L ${spread.svgWidth - 20},5 M ${spread.svgWidth - 5},5 L ${spread.svgWidth - 5},20`} />
          <path d={`M 5,${spread.svgHeight - 5} L 20,${spread.svgHeight - 5} M 5,${spread.svgHeight - 5} L 5,${spread.svgHeight - 20}`} />
          <path d={`M ${spread.svgWidth - 5},${spread.svgHeight - 5} L ${spread.svgWidth - 20},${spread.svgHeight - 5} M ${spread.svgWidth - 5},${spread.svgHeight - 5} L ${spread.svgWidth - 5},${spread.svgHeight - 20}`} />
        </g>
      </svg>

      {/* Position descriptions as HTML below the diagram */}
      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {spread.positions.map(pos => (
          <div key={pos.number} style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline' }}>
            <span style={{
              color: 'var(--accent-warm)', fontFamily: 'var(--font-serif)', fontWeight: 700,
              fontSize: '1rem', minWidth: '1.5rem', textAlign: 'right', flexShrink: 0,
            }}>
              {pos.number}
            </span>
            <div>
              <span style={{ color: 'var(--accent-warm)', fontFamily: 'var(--font-serif)', fontSize: '0.85rem', fontWeight: 600 }}>
                {pos.name}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '0.5rem', lineHeight: 1.6 }}>
                — {pos.meaning}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpreadDiagram;
