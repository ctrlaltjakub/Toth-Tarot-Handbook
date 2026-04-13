import React, { useState, useEffect, useRef } from 'react';
import { zodiacSigns, planets } from '../data/astrologyData';
import PlanetGlyph from './PlanetGlyph';

interface ZodiacWheelSVGProps {
  onSignClick: (signName: string) => void;
  onPlanetClick: (planetName: string) => void;
  onElementClick: (elementName: string) => void;
  selectedSign: string | null;
  showPlanetLines: boolean;
  showElements: boolean;
  showQualities: boolean;
  onQualityClick: (qualityName: string) => void;
  mobileMode?: boolean;
}

const CX = 350; const CY = 350;
const OUTER_R = 250; const DECAN_OUTER = 250; const DECAN_INNER = 222;
const SIGN_OUTER = 222; const SIGN_INNER = 180;
const PLANET_ORBIT = 310;

const ORBIT_DURATION = 600;
const planetStartOffset: Record<string, number> = {
  Sun: 0, Moon: 45, Mercury: 90, Venus: 135, Mars: 180, Jupiter: 225, Saturn: 270, Uranus: 315,
};

const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
const polarToXY = (cx: number, cy: number, r: number, deg: number) => ({
  x: cx + r * Math.cos(toRad(deg)), y: cy + r * Math.sin(toRad(deg)),
});
const segmentPath = (cx: number, cy: number, outerR: number, innerR: number, startDeg: number, endDeg: number) => {
  const os = polarToXY(cx, cy, outerR, startDeg); const oe = polarToXY(cx, cy, outerR, endDeg);
  const is_ = polarToXY(cx, cy, innerR, startDeg); const ie = polarToXY(cx, cy, innerR, endDeg);
  const la = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${os.x} ${os.y} A ${outerR} ${outerR} 0 ${la} 1 ${oe.x} ${oe.y} L ${ie.x} ${ie.y} A ${innerR} ${innerR} 0 ${la} 0 ${is_.x} ${is_.y} Z`;
};
const textArcCW = (cx: number, cy: number, r: number, s: number, e: number) => { const sp = polarToXY(cx, cy, r, s); const ep = polarToXY(cx, cy, r, e); return `M ${sp.x} ${sp.y} A ${r} ${r} 0 0 1 ${ep.x} ${ep.y}`; };
const textArcCCW = (cx: number, cy: number, r: number, s: number, e: number) => { const sp = polarToXY(cx, cy, r, e); const ep = polarToXY(cx, cy, r, s); return `M ${sp.x} ${sp.y} A ${r} ${r} 0 0 0 ${ep.x} ${ep.y}`; };

const elementColor: Record<string, string> = { Fire: 'var(--color-fire)', Water: 'var(--color-water)', Air: 'var(--color-air)', Earth: 'var(--color-earth)' };
const isBottomHalf = (d: number) => d > 90 && d < 270;
const signIndex: Record<string, number> = {}; zodiacSigns.forEach((s, i) => { signIndex[s.name] = i; });

// Sign edge points for planet connection lines
const signOuterEdge: Record<string, { x: number; y: number; color: string }> = {};
zodiacSigns.forEach((sign, i) => {
  const m = i * 30 + 15;
  const pt = polarToXY(CX, CY, OUTER_R + 4, m);
  signOuterEdge[sign.name] = { ...pt, color: elementColor[sign.element] };
});

// Element triangle data: which sign indices form each triangle
const elementTriangles: { name: string; symbol: string; signs: number[] }[] = [
  { name: 'Fire', symbol: '🜂', signs: [0, 4, 8] },    // Aries, Leo, Sagittarius
  { name: 'Water', symbol: '🜄', signs: [3, 7, 11] },   // Cancer, Scorpio, Pisces
  { name: 'Air', symbol: '🜁', signs: [2, 6, 10] },     // Gemini, Libra, Aquarius
  { name: 'Earth', symbol: '🜃', signs: [1, 5, 9] },    // Taurus, Virgo, Capricorn
];

// Quality squares: which sign indices form each quality cross
const qualitySquares: { name: string; symbol: string; signs: number[]; colorVar: string }[] = [
  { name: 'Cardinal', symbol: '⟁', signs: [0, 3, 6, 9], colorVar: 'var(--ctp-peach)' },       // Aries, Cancer, Libra, Capricorn
  { name: 'Fixed', symbol: '⊞', signs: [1, 4, 7, 10], colorVar: 'var(--ctp-pink)' },           // Taurus, Leo, Scorpio, Aquarius
  { name: 'Mutable', symbol: '⟠', signs: [2, 5, 8, 11], colorVar: 'var(--ctp-lavender)' },     // Gemini, Virgo, Sagittarius, Pisces
];

const QUALITY_R = 365;

// Quality symbols from SVG files — rendered inline for consistent cross-browser appearance
const QualitySymbol: React.FC<{ name: string; x: number; y: number; size: number; color: string; opacity: number; fw?: number }> = ({ name, x, y, size, color, opacity, fw }) => {
  const s = size;
  const sw = fw ? 1.0 : 0.6;
  // All symbols are based on a 12x12 viewBox, scaled to `size`
  const scale = s / 12;
  const tx = x - s / 2;
  const ty = y - s / 2;
  if (name === 'Cardinal') {
    // Triangle with dot
    return (
      <g opacity={opacity} transform={`translate(${tx},${ty}) scale(${scale})`}>
        <path d="M11 10.33 6 1.67l-5 8.66" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="9.736" r="0.899" fill={color} />
      </g>
    );
  } else if (name === 'Fixed') {
    // Square with horizontal line
    return (
      <g opacity={opacity} transform={`translate(${tx},${ty}) scale(${scale})`}>
        <path d="M11 11V1H1v10h10M8.5 6h-5" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  } else {
    // Arc with dot
    return (
      <g opacity={opacity} transform={`translate(${tx},${ty}) scale(${scale})`}>
        <circle cx="6" cy="8.5" r="0.899" fill={color} />
        <path d="M11 8.5a5 5 0 1 0-10 0" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  }
};

const ZodiacWheelSVG: React.FC<ZodiacWheelSVGProps> = ({
  onSignClick, onPlanetClick, onElementClick, selectedSign, showPlanetLines, showElements, showQualities, onQualityClick, mobileMode = false,
}) => {
  // Mobile mode sizing multipliers
  const M = mobileMode ? {
    decanFont: 21,
    signNameFont: 14,
    signGlyphFont: 22,
    elementSymbolFont: 30,
    elementNameFont: 12,
    planetR: 36,
    planetOuterR: 40,
    planetGlyphFont: 35,
    planetNameFont: 10,
    terraR: 32,
    terraOuterR: 36,
    terraGlyphFont: 35,
    terraNameFont: 10,
    fw: 600 as number | undefined,
  } : {
    decanFont: 17,
    signNameFont: 9.5,
    signGlyphFont: 17,
    elementSymbolFont: 24,
    elementNameFont: 9,
    planetR: 28,
    planetOuterR: 32,
    planetGlyphFont: 30,
    planetNameFont: 7,
    terraR: 32,
    terraOuterR: 36,
    terraGlyphFont: 35,
    terraNameFont: 8,
    fw: undefined as number | undefined,
  };
  const [time, setTime] = useState(0);
  const rafRef = useRef<number>(0); const startRef = useRef<number>(0);

  useEffect(() => {
    // Always animate — planets are always visible
    const animate = (ts: number) => { if (!startRef.current) startRef.current = ts; setTime((ts - startRef.current) / 1000); rafRef.current = requestAnimationFrame(animate); };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const getPlanetPos = (name: string) => { const o = planetStartOffset[name] || 0; return polarToXY(CX, CY, PLANET_ORBIT, (o + (time / ORBIT_DURATION) * 360) % 360); };

  return (
    <svg viewBox="-20 -20 740 820" style={{ display: 'block' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="signGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Sign name arcs — different radii for top/bottom to equalise visual distance from decan border */}
        {zodiacSigns.map((_, i) => {
          const s = i * 30; const e = (i + 1) * 30; const m = s + 15;
          // CW (top): text baseline faces outward → use a radius further from the decan border
          // CCW (bottom): text baseline faces inward → use a radius closer to the decan border
          const r = isBottomHalf(m) ? SIGN_OUTER - 5 : SIGN_OUTER - 13;
          return <path key={`signArc-${i}`} id={`signArc-${i}`} d={isBottomHalf(m) ? textArcCCW(CX, CY, r, s + 1, e - 1) : textArcCW(CX, CY, r, s + 1, e - 1)} />;
        })}
      </defs>

      {/* Rings */}
      <circle cx={CX} cy={CY} r={OUTER_R + 4} fill="none" stroke="var(--ctp-surface1)" strokeWidth="0.5" opacity="0.2" />
      <circle cx={CX} cy={CY} r={OUTER_R} fill="none" stroke="var(--ctp-surface2)" strokeWidth="0.8" opacity="0.4" />
      <circle cx={CX} cy={CY} r={DECAN_INNER} fill="none" stroke="var(--ctp-surface2)" strokeWidth="0.5" opacity="0.3" />
      <circle cx={CX} cy={CY} r={SIGN_INNER} fill="none" stroke="var(--ctp-surface2)" strokeWidth="0.8" opacity="0.4" />
      <circle cx={CX} cy={CY} r={PLANET_ORBIT} fill="none" stroke="var(--ctp-surface1)" strokeWidth="0.3" opacity="0.15" strokeDasharray="3,6" />

      {/* === Element Triangles inside the wheel === */}
      {showElements && elementTriangles.map(et => {
        const color = elementColor[et.name];
        // Vertices touch the inner border of the zodiac ring
        const vertices = et.signs.map(si => {
          const midDeg = si * 30 + 15;
          return { ...polarToXY(CX, CY, SIGN_INNER - 2, midDeg), deg: midDeg };
        });
        const pathD = `M ${vertices[0].x} ${vertices[0].y} L ${vertices[1].x} ${vertices[1].y} L ${vertices[2].x} ${vertices[2].y} Z`;

        // Place label near the top of the triangle (the vertex closest to the top of the wheel)
        // Use the vertex with the smallest degree distance from 0° (top)
        const topVertex = vertices.reduce((best, v) => {
          const distFromTop = Math.min(v.deg, 360 - v.deg);
          const bestDist = Math.min(best.deg, 360 - best.deg);
          return distFromTop < bestDist ? v : best;
        });
        // Label position: slightly inward from the top vertex, toward centre
        const labelAngle = Math.atan2(topVertex.y - CY, topVertex.x - CX);
        const labelR = SIGN_INNER - 45;
        const labelX = CX + labelR * Math.cos(labelAngle);
        const labelY = CY + labelR * Math.sin(labelAngle);
        // Rotate text so bottom faces the centre
        const rotationDeg = (Math.atan2(labelY - CY, labelX - CX) * 180 / Math.PI) + 90;

        return (
          <g key={`tri-${et.name}`} onClick={(e) => { e.stopPropagation(); onElementClick(et.name); }} style={{ cursor: 'pointer' }}>
            {/* Triangle fill */}
            <path d={pathD} fill={color} fillOpacity="0.04" stroke={color} strokeWidth="0.8" opacity="0.3" />
            {/* Vertex dots */}
            {vertices.map((v, vi) => (
              <circle key={vi} cx={v.x} cy={v.y} r="3" fill={color} opacity="0.4" />
            ))}
            {/* Element symbol and name — rotated so bottom faces centre */}
            <g transform={`rotate(${rotationDeg}, ${labelX}, ${labelY})`}>
              <text x={labelX} y={labelY - (mobileMode ? 12 : 10)} textAnchor="middle" dominantBaseline="central" fill={color} fontSize={M.elementSymbolFont} fontWeight={M.fw} opacity="0.55">
                {et.symbol}
              </text>
              <text x={labelX} y={labelY + (mobileMode ? 12 : 10)} textAnchor="middle" dominantBaseline="central" fill={color} fontSize={M.elementNameFont} fontFamily="var(--font-serif)" fontWeight={M.fw} letterSpacing="0.08em" opacity="0.45">
                {et.name.toUpperCase()}
              </text>
            </g>
          </g>
        );
      })}

      {/* === Quality Squares outside the wheel (rendered before planets) === */}
      {showQualities && qualitySquares.map((qs, _qIdx) => {
        const color = qs.colorVar;
        // Corners at QUALITY_R, pointing at the sign midpoints
        const corners = qs.signs.map(si => {
          const midDeg = si * 30 + 15;
          return polarToXY(CX, CY, QUALITY_R, midDeg);
        });
        const innerCorners = qs.signs.map(si => {
          const midDeg = si * 30 + 15;
          return polarToXY(CX, CY, QUALITY_R - 6, midDeg);
        });
        const pathD = `M ${corners[0].x} ${corners[0].y} L ${corners[1].x} ${corners[1].y} L ${corners[2].x} ${corners[2].y} L ${corners[3].x} ${corners[3].y} Z`;
        const innerD = `M ${innerCorners[0].x} ${innerCorners[0].y} L ${innerCorners[1].x} ${innerCorners[1].y} L ${innerCorners[2].x} ${innerCorners[2].y} L ${innerCorners[3].x} ${innerCorners[3].y} Z`;
        // Connection lines from corners to the zodiac outer edge
        const edgePoints = qs.signs.map(si => {
          const midDeg = si * 30 + 15;
          return polarToXY(CX, CY, OUTER_R + 4, midDeg);
        });

        return (
          <g key={`qual-${qs.name}`} onClick={(e) => { e.stopPropagation(); onQualityClick(qs.name); }} style={{ cursor: 'pointer' }}>
            {/* Double border square */}
            <path d={pathD} fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
            <path d={innerD} fill="none" stroke={color} strokeWidth="0.4" opacity="0.2" />
            {/* Connection lines from corners to zodiac edge */}
            {corners.map((c, ci) => {
              const ep = edgePoints[ci];
              return (
                <React.Fragment key={ci}>
                  <line x1={c.x} y1={c.y} x2={ep.x} y2={ep.y} stroke={color} strokeWidth="0.8" opacity="0.3" />
                  <rect x={c.x - 3} y={c.y - 3} width="6" height="6" fill={color} opacity="0.35" />
                </React.Fragment>
              );
            })}
            {/* Label at bottom, connected to square */}
            {(() => {
              // Connection points first, then place labels directly below them
              // Connection points: Cardinal → midpoint of left side, Fixed → midpoint of bottom side, Mutable → midpoint of right side
              let connectPt: { x: number; y: number };
              const sorted = [...corners];
              if (qs.name === 'Cardinal') {
                // Left side: two corners with smallest x
                const byX = [...sorted].sort((a, b) => a.x - b.x);
                connectPt = { x: (byX[0].x + byX[1].x) / 2, y: (byX[0].y + byX[1].y) / 2 };
              } else if (qs.name === 'Fixed') {
                // Bottom side: two corners with largest y
                const byY = [...sorted].sort((a, b) => b.y - a.y);
                connectPt = { x: (byY[0].x + byY[1].x) / 2, y: (byY[0].y + byY[1].y) / 2 };
              } else {
                // Right side: two corners with largest x
                const byX = [...sorted].sort((a, b) => b.x - a.x);
                connectPt = { x: (byX[0].x + byX[1].x) / 2, y: (byX[0].y + byX[1].y) / 2 };
              }

              const lx = connectPt.x;
              const ly = 750;

              // Find the two closest corners to the label x position
              const cornersByDist = [...corners].sort((a, b) => Math.hypot(a.x - lx, a.y - ly) - Math.hypot(b.x - lx, b.y - ly));
              const closest1 = cornersByDist[0];
              const closest2 = cornersByDist[1];

              return (
                <>
                  {/* Diamond at midpoint */}
                  <rect x={connectPt.x - 4} y={connectPt.y - 4} width="8" height="8"
                    transform={`rotate(45, ${connectPt.x}, ${connectPt.y})`}
                    fill={color} opacity="0.4" />
                  {/* Vertical line from midpoint down to label */}
                  <line x1={connectPt.x} y1={connectPt.y + 4} x2={lx} y2={ly - 14}
                    stroke={color} strokeWidth="0.4" opacity="0.2" />
                  {/* Lines from label to two closest corners */}
                  <line x1={lx} y1={ly - 14} x2={closest1.x} y2={closest1.y}
                    stroke={color} strokeWidth="0.4" opacity="0.2" />
                  <line x1={lx} y1={ly - 14} x2={closest2.x} y2={closest2.y}
                    stroke={color} strokeWidth="0.4" opacity="0.2" />
                  {/* Invisible circular hit area for easier clicking */}
                  <circle cx={lx} cy={ly} r={mobileMode ? 30 : 22} fill="transparent" />
                  <QualitySymbol
                    name={qs.name}
                    x={lx}
                    y={ly - (mobileMode ? 16 : 12)}
                    size={mobileMode ? 32 : 24}
                    color={color}
                    opacity={0.55}
                    fw={M.fw}
                  />
                  <text x={lx} y={ly + (mobileMode ? 16 : 12)} textAnchor="middle" dominantBaseline="central" fill={color} fontSize={mobileMode ? 15 : 11} fontFamily="var(--font-serif)" fontWeight={M.fw} letterSpacing="0.1em" opacity="0.5">
                    {qs.name.toUpperCase()}
                  </text>
                </>
              );
            })()}
          </g>
        );
      })}

      {/* === Sign segments === */}
      {zodiacSigns.map((sign, i) => {
        const s = i * 30; const e = (i + 1) * 30; const m = s + 15;
        const isSel = selectedSign === sign.name; const color = elementColor[sign.element];
        const gp = polarToXY(CX, CY, SIGN_INNER + 13, m);
        return (
          <g key={sign.name} onClick={(e) => { e.stopPropagation(); onSignClick(sign.name); }} style={{ cursor: 'pointer' }}>
            <path d={segmentPath(CX, CY, OUTER_R, SIGN_INNER, s, e)} fill={isSel ? color : 'transparent'} fillOpacity={isSel ? 0.12 : 0} stroke="none" filter={isSel ? 'url(#signGlow)' : undefined} />
            <path d={segmentPath(CX, CY, OUTER_R, SIGN_INNER, s, e)} fill="none" stroke={color} strokeWidth={isSel ? 1.8 : 0.8} opacity={isSel ? 0.8 : 0.25} />
            {(() => { const inner = polarToXY(CX, CY, SIGN_INNER, s); const outer = polarToXY(CX, CY, OUTER_R, s); return <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="var(--ctp-surface2)" strokeWidth="0.5" opacity="0.3" />; })()}
            {/* Glyph rotated tangent to the circle, flipped on bottom half */}
            <text x={gp.x} y={gp.y} textAnchor="middle" dominantBaseline="central"
              fill={isSel ? color : 'var(--text-main)'} fontSize={M.signGlyphFont} fontWeight={M.fw} opacity={isSel ? 1 : 0.8}
              transform={`rotate(${isBottomHalf(m) ? m + 180 : m}, ${gp.x}, ${gp.y})`}
            >{sign.glyph}</text>
            <text fill={isSel ? color : 'var(--text-muted)'} fontSize={M.signNameFont} fontFamily="var(--font-serif)" fontWeight={M.fw} letterSpacing="0.1em">
              <textPath href={`#signArc-${i}`} startOffset="50%" textAnchor="middle">{sign.name.toUpperCase()}</textPath></text>
          </g>
        );
      })}

      {/* === Decans (always visible) === */}
      {zodiacSigns.map((sign, i) => {
        const s = i * 30;
        return (<React.Fragment key={`dec-${sign.name}`}>
          {[1, 2].map(d => { const deg = s + d * 10; const inn = polarToXY(CX, CY, DECAN_INNER, deg); const out = polarToXY(CX, CY, DECAN_OUTER, deg);
            return <line key={`dl-${sign.name}-${d}`} x1={inn.x} y1={inn.y} x2={out.x} y2={out.y} stroke="var(--ctp-overlay0)" strokeWidth="0.3" opacity="0.3" strokeDasharray="2,2" />; })}
          {sign.decans.map((dc, d) => { const m = s + d * 10 + 5; const p = polarToXY(CX, CY, (DECAN_OUTER + DECAN_INNER) / 2, m);
            return <text key={`dg-${sign.name}-${d}`} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fill="var(--ctp-subtext0)" fontSize={M.decanFont} fontWeight={M.fw} className="astro-symbols" opacity="0.65">{dc.subRulerGlyph}</text>; })}
        </React.Fragment>);
      })}

      {/* === Orbiting Planets (outside the wheel) === */}
      {planets.filter(p => p.name !== 'Neptune' && p.name !== 'Pluto').map(planet => {
        const pos = getPlanetPos(planet.name);

        return (
          <React.Fragment key={planet.name}>
            {/* Rulership lines */}
            {showPlanetLines && planet.rules.map(signName => {
              const edge = signOuterEdge[signName]; if (!edge) return null;
              const isAlsoExalted = planet.exaltedIn === signName;
              const offset = isAlsoExalted ? 3 : 0;
              return (
                <React.Fragment key={`rule-${planet.name}-${signName}`}>
                  <line x1={pos.x + offset} y1={pos.y + offset} x2={edge.x + offset} y2={edge.y + offset}
                    stroke={edge.color} strokeWidth="0.8" strokeDasharray="4,3" opacity="0.3" />
                  <rect x={edge.x + offset - 3} y={edge.y + offset - 3} width="6" height="6"
                    transform={`rotate(45, ${edge.x + offset}, ${edge.y + offset})`} fill={edge.color} opacity="0.45" />
                </React.Fragment>
              );
            })}
            {/* Exaltation line */}
            {showPlanetLines && planet.exaltedIn && (() => {
              const edge = signOuterEdge[planet.exaltedIn]; if (!edge) return null;
              const isAlsoRuled = planet.rules.includes(planet.exaltedIn);
              const offset = isAlsoRuled ? -3 : 0;
              return (
                <React.Fragment>
                  <line x1={pos.x + offset} y1={pos.y + offset} x2={edge.x + offset} y2={edge.y + offset}
                    stroke={edge.color} strokeWidth="0.5" strokeDasharray="8,4" opacity="0.2" />
                  <circle cx={edge.x + offset} cy={edge.y + offset} r="3" fill="none" stroke={edge.color} strokeWidth="0.8" opacity="0.4" />
                </React.Fragment>
              );
            })()}
            {/* Planet circle */}
            <g onClick={(e) => { e.stopPropagation(); onPlanetClick(planet.name); }} style={{ cursor: 'pointer' }}>
              <circle cx={pos.x} cy={pos.y} r={M.planetR} fill="var(--bg-card)" stroke="var(--ctp-surface2)" strokeWidth="0.8" opacity="0.85" />
              <circle cx={pos.x} cy={pos.y} r={M.planetOuterR} fill="none" stroke="var(--ctp-surface1)" strokeWidth="0.4" opacity="0.25" />
              {(() => {
                const glyphSize = M.planetGlyphFont * 0.85;
                const glyphY = pos.y - (mobileMode ? 6 : 4);
                return (
                  <svg x={pos.x - glyphSize / 2} y={glyphY - glyphSize / 2} width={glyphSize} height={glyphSize} overflow="visible">
                    <PlanetGlyph name={planet.name} size={glyphSize} color="var(--text-main)" strokeWidth={mobileMode ? 0.8 : 0.6} />
                  </svg>
                );
              })()}
              <text x={pos.x} y={pos.y + (mobileMode ? 16 : 16)} textAnchor="middle" dominantBaseline="central" fill="var(--text-muted)" fontSize={M.planetNameFont} fontFamily="var(--font-serif)" fontWeight={M.fw} letterSpacing="0.04em">{planet.name.toUpperCase()}</text>
            </g>
          </React.Fragment>
        );
      })}

      {/* === Earth symbol at centre === */}
      <g onClick={(e) => { e.stopPropagation(); onElementClick('Earth-Planet'); }} style={{ cursor: 'pointer' }}>
        <circle cx={CX} cy={CY} r={M.terraR} fill="var(--bg-card)" stroke="var(--ctp-surface2)" strokeWidth="0.8" opacity="0.85" />
        <circle cx={CX} cy={CY} r={M.terraOuterR} fill="none" stroke="var(--ctp-surface1)" strokeWidth="0.4" opacity="0.25" />
        <text x={CX} y={CY - 4} textAnchor="middle" dominantBaseline="central" fill="var(--text-main)" fontSize={M.terraGlyphFont} fontWeight={M.fw}>🜨</text>
        <text x={CX} y={CY + (mobileMode ? 22 : 20)} textAnchor="middle" dominantBaseline="central" fill="var(--text-muted)" fontSize={M.terraNameFont} fontFamily="var(--font-serif)" fontWeight={M.fw} letterSpacing="0.06em">TERRA</text>
      </g>

      {/* Decorative corners */}
      <g opacity="0.15" stroke="var(--ctp-overlay0)" strokeWidth="0.5" fill="none">
        <path d="M -30,-30 L -10,-30 M -30,-30 L -30,-10" /><path d="M 730,-30 L 710,-30 M 730,-30 L 730,-10" />
        <path d="M -30,730 L -10,730 M -30,730 L -30,710" /><path d="M 730,730 L 710,730 M 730,730 L 730,710" />
      </g>

      {/* Modern planets — static, aligned with Fixed square upper corners */}
      {(() => {
        const modernPlanets = [
          { name: 'Neptune', x: 38, y: 38 },
          { name: 'Pluto', x: 662, y: 38 },
        ];
        const glyphSize = mobileMode ? 32 : 26;
        const circleR = M.planetR;
        const outerR = M.planetOuterR;
        const nameFont = mobileMode ? 9 : 7;
        const sw = mobileMode ? 0.8 : 0.6;
        return modernPlanets.map(mp => (
          <g key={mp.name} onClick={(e) => { e.stopPropagation(); onPlanetClick(mp.name); }} style={{ cursor: 'pointer' }}>
            <circle cx={mp.x} cy={mp.y} r={outerR + 8} fill="none" stroke="var(--ctp-surface1)" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
            <circle cx={mp.x} cy={mp.y} r={circleR} fill="var(--bg-card)" stroke="var(--ctp-surface2)" strokeWidth="0.8" opacity="0.85" />
            <circle cx={mp.x} cy={mp.y} r={outerR} fill="none" stroke="var(--ctp-surface1)" strokeWidth="0.4" opacity="0.25" />
            <svg x={mp.x - glyphSize / 2} y={mp.y - glyphSize / 2 - 4} width={glyphSize} height={glyphSize} overflow="visible">
              <PlanetGlyph name={mp.name} size={glyphSize} color="var(--text-main)" strokeWidth={sw} />
            </svg>
            <text x={mp.x} y={mp.y + (mobileMode ? 18 : 16)} textAnchor="middle" dominantBaseline="central" fill="var(--text-muted)" fontSize={nameFont} fontFamily="var(--font-serif)" fontWeight={M.fw} letterSpacing="0.04em">{mp.name.toUpperCase()}</text>
          </g>
        ));
      })()}
    </svg>
  );
};

export default ZodiacWheelSVG;
