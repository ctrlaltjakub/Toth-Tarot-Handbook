import React from 'react';
import { sephiroth, paths, daath, abyss, worlds } from '../data/treeOfLifeData';

interface TreeOfLifeSVGProps {
  onSephirahClick: (sephirahNumber: number) => void;
  onPathClick: (pathNumber: number) => void;
  onDaathClick: () => void;
  onAbyssClick: () => void;
  onWorldClick: (worldName: string) => void;
  onPillarClick: (pillarName: string) => void;
  selectedSephirah: number | null;
  selectedPath: number | null;
  showWorlds: boolean;
  showAbyssDaath: boolean;
  showPillars: boolean;
  mobileMode?: boolean;
}

// Tighter viewBox to reduce margins and make the tree bigger
const VIEWBOX = '30 -8 440 738';
const WORLDS_VIEWBOX = '30 -8 440 910';
const SEPHIRAH_R = 30;

// Paths whose Roman numeral label should be placed below the midpoint instead of above
// Paths whose label+diamond should be shifted along the line (0 = midpoint, 0.25 = 1/4 toward 'to')
const LABEL_SHIFT: Record<number, number> = { 25: 0.25 };

const TreeOfLifeSVG: React.FC<TreeOfLifeSVGProps> = ({
  onSephirahClick,
  onPathClick,
  onDaathClick,
  onAbyssClick,
  onWorldClick,
  onPillarClick,
  showWorlds,
  showAbyssDaath,
  showPillars,
  selectedSephirah,
  selectedPath,
  mobileMode = false,
}) => {
  const getSephirah = (n: number) => sephiroth.find(s => s.number === n)!;

  const M = mobileMode ? {
    sephNumFont: 9.5,
    sephHebrewFont: 9.5,
    sephNameFont: 8,
    pathLabelFont: 10.5,
    abyssFont: 10,
    daathFont: 9,
    worldFont: 10.5,
    fw: 600 as number | undefined,
  } : {
    sephNumFont: 8,
    sephHebrewFont: 8,
    sephNameFont: 7,
    pathLabelFont: 9,
    abyssFont: 8.5,
    daathFont: 8,
    worldFont: 9,
    fw: undefined as number | undefined,
  };

  return (
    <svg
      viewBox={showWorlds ? WORLDS_VIEWBOX : VIEWBOX}
      role="group" aria-label="Thoth Tree of Life with ten Sephiroth and twenty-two paths"
      style={{ display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow filter for selected elements */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Subtle outer glow for Sephiroth */}
        <filter id="sephGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Abyss placeholder — actual rendering moved after paths */}

      {/* === Three Pillars — stadium shapes from top to bottom sephirah === */}
      {showPillars && (() => {
        const PILLAR_MARGIN = 8.5; // margin beyond sephirah radius
        const pillarW = SEPHIRAH_R + PILLAR_MARGIN; // half-width of the stadium
        const LABEL_Y = 1; // same 17px gap from Atziluth top (y=18) as world titles from their borders
        const DAATH_HOLE_R = 26; // radius of the hole for Daath (20 circle + 6 margin)

        const pillarDefs: { name: string; cx: number; topY: number; botY: number; color: string; opacity: number }[] = [
          { name: 'SEVERITY', cx: 120, topY: 140, botY: 465, color: 'var(--ctp-red)', opacity: 0.04 },
          { name: 'MILDNESS', cx: 250, topY: 55, botY: 660, color: 'var(--ctp-yellow)', opacity: 0.03 },
          { name: 'MERCY', cx: 380, topY: 140, botY: 465, color: 'var(--ctp-blue)', opacity: 0.04 },
        ];

        return pillarDefs.map(p => {
          // Stadium path: semicircle top, straight sides, semicircle bottom
          const left = p.cx - pillarW;
          const right = p.cx + pillarW;
          const stadiumD = `M ${left} ${p.topY} A ${pillarW} ${pillarW} 0 0 1 ${right} ${p.topY} L ${right} ${p.botY} A ${pillarW} ${pillarW} 0 0 1 ${left} ${p.botY} Z`;
          const maskId = `pillarMask-${p.name}`;
          // Only punch the Daath hole when Daath/Abyss are visible
          const useDaathHole = p.name === 'MILDNESS' && showAbyssDaath;

          return (
            <g key={`pillar-${p.name}`} onClick={(e) => { e.stopPropagation(); onPillarClick(p.name === 'SEVERITY' ? 'Severity' : p.name === 'MILDNESS' ? 'Mildness' : 'Mercy'); }} style={{ cursor: 'pointer' }}>
              {/* Mask with Daath hole for Mildness pillar (only when Daath is shown) */}
              {useDaathHole && (
                <defs>
                  <mask id={maskId}>
                    <rect x="0" y="-20" width="500" height="750" fill="white" />
                    <circle cx={daath.x} cy={daath.y} r={DAATH_HOLE_R} fill="black" />
                  </mask>
                </defs>
              )}
              {/* Stadium fill */}
              <path d={stadiumD} fill={p.color} opacity={p.opacity}
                mask={useDaathHole ? `url(#${maskId})` : undefined} />
              {/* Flat label at top */}
              <text x={p.cx} y={LABEL_Y} textAnchor="middle" dominantBaseline="central"
                fill={p.color} fontFamily="var(--font-serif)" letterSpacing="0.15em"
                opacity="0.5" fontSize={M.worldFont} fontWeight={M.fw}>
                {p.name}
              </text>
            </g>
          );
        });
      })()}

      {/* === Paths (drawn before Sephiroth so circles sit on top) === */}
      {paths.map(path => {
        const from = getSephirah(path.from);
        const to = getSephirah(path.to);
        const isSelected = selectedPath === path.number;
        const shift = LABEL_SHIFT[path.number] || 0;
        const midX = from.x + (to.x - from.x) * (0.5 + shift);
        const midY = from.y + (to.y - from.y) * (0.5 + shift);

        return (
          <g key={`path-${path.number}`} onClick={(e) => { e.stopPropagation(); onPathClick(path.number); }} style={{ cursor: 'pointer' }}>
            {/* Clickable wider invisible line for easier targeting */}
            <line
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke="transparent"
              strokeWidth="14"
            />
            {/* Visible path line */}
            <line
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke={isSelected ? 'var(--accent-warm)' : 'var(--ctp-surface2)'}
              strokeWidth={isSelected ? 2 : 1.2}
              opacity={isSelected ? 1 : 0.6}
              filter={isSelected ? 'url(#glow)' : undefined}
            />
            {/* Small diamond at midpoint */}
            <rect
              x={midX - 2.5} y={midY - 2.5}
              width="5" height="5"
              transform={`rotate(45, ${midX}, ${midY})`}
              fill={isSelected ? 'var(--accent-warm)' : 'var(--ctp-overlay0)'}
              opacity={isSelected ? 1 : 0.5}
            />
            {/* Roman numeral label */}
            <text
              x={midX}
              y={midY - 8}
              textAnchor="middle"
              fill={isSelected ? 'var(--accent-warm)' : 'var(--color-rosewater)'}
              fontSize={M.pathLabelFont}
              fontFamily="var(--font-serif)"
              letterSpacing="0.05em"
              fontWeight={mobileMode ? 700 : 600}
              opacity={isSelected ? 1 : 0.75}
            >
              {path.romanNumeral}
            </text>
          </g>
        );
      })}

      {showAbyssDaath && <>
        {/* === The Abyss (rendered after paths so it's on top) === */}
        <g onClick={(e) => { e.stopPropagation(); onAbyssClick(); }} style={{ cursor: 'pointer' }}>
          <rect x="60" y={abyss.y - 10} width="380" height="30" fill="transparent" />
          <line
            x1="60" y1={abyss.y} x2="440" y2={abyss.y}
            stroke="var(--color-maroon)"
            strokeWidth="1.2"
            strokeDasharray="10,5"
            opacity="0.6"
          />
          <text
            x="250" y={abyss.y + (mobileMode ? 16 : 13)}
            textAnchor="middle"
            fill="var(--color-maroon)"
            fontSize={M.abyssFont}
            fontFamily="var(--font-serif)"
            letterSpacing="0.3em"
            fontWeight={M.fw}
            opacity="0.7"
          >
            THE ABYSS
          </text>
        </g>
      </>}

      {showAbyssDaath &&
        <g onClick={(e) => { e.stopPropagation(); onDaathClick(); }} style={{ cursor: 'pointer' }}>
          {/* Invisible hit area so clicks don't fall through to paths */}
          <circle cx={daath.x} cy={daath.y} r={22} fill="var(--bg-deep)" opacity="0.85" />
          <circle
            cx={daath.x} cy={daath.y} r={20}
            fill="none"
            stroke="var(--color-maroon)"
            strokeWidth="1.2"
            strokeDasharray="4,4"
            opacity="0.55"
          />
          <text
            x={daath.x} y={daath.y - 5}
            textAnchor="middle"
            fill="var(--color-maroon)"
            fontSize={M.daathFont}
            fontFamily="var(--font-serif)"
            letterSpacing="0.1em"
            fontWeight={M.fw}
            opacity="0.65"
          >
            {daath.hebrew}
          </text>
          <text
            x={daath.x} y={daath.y + 6}
            textAnchor="middle"
            fill="var(--color-maroon)"
            fontSize={M.daathFont}
            fontFamily="var(--font-serif)"
            letterSpacing="0.08em"
            fontWeight={M.fw}
            opacity="0.65"
          >
            DAATH
          </text>
        </g>
      }

      {/* === Sephiroth === */}
      {sephiroth.map(seph => {
        const isSelected = selectedSephirah === seph.number;

        return (
          <g key={`seph-${seph.number}`} onClick={(e) => { e.stopPropagation(); onSephirahClick(seph.number); }} style={{ cursor: 'pointer' }}>
            {/* Outer decorative ring */}
            <circle
              cx={seph.x} cy={seph.y} r={SEPHIRAH_R + 4}
              fill="none"
              stroke={`var(${seph.colorVar})`}
              strokeWidth="0.5"
              opacity={isSelected ? 0.8 : 0.3}
            />
            {/* Main circle */}
            <circle
              cx={seph.x} cy={seph.y} r={SEPHIRAH_R}
              fill={seph.number === 3 ? 'var(--ctp-crust)' : 'var(--bg-card)'}
              stroke={`var(${seph.colorVar})`}
              strokeWidth={isSelected ? 2.5 : 1.5}
              filter={isSelected ? 'url(#sephGlow)' : undefined}
            />
            {/* Inner decorative ring */}
            <circle
              cx={seph.x} cy={seph.y} r={SEPHIRAH_R - 4}
              fill="none"
              stroke={`var(${seph.colorVar})`}
              strokeWidth="0.3"
              opacity={isSelected ? 0.6 : 0.2}
            />
            {/* Number */}
            <text
              x={seph.x} y={seph.y - 10}
              textAnchor="middle"
              fill={`var(${seph.colorVar})`}
              fontSize={M.sephNumFont}
              fontFamily="var(--font-serif)"
              fontWeight="700"
            >
              {seph.number}
            </text>
            {/* Hebrew name */}
            <text
              x={seph.x} y={seph.y + 1}
              textAnchor="middle"
              fill="var(--text-main)"
              fontSize={M.sephHebrewFont}
              fontWeight={M.fw}
              opacity="0.7"
            >
              {seph.hebrew}
            </text>
            {/* Latin name */}
            <text
              x={seph.x} y={seph.y + 12}
              textAnchor="middle"
              fill={`var(${seph.colorVar})`}
              fontSize={M.sephNameFont}
              fontFamily="var(--font-serif)"
              letterSpacing="0.08em"
              fontWeight={mobileMode ? 700 : 600}
            >
              {seph.name.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* === Decorative corner marks (esoteric touch) === */}
      <g opacity="0.15" stroke="var(--ctp-overlay0)" strokeWidth="0.5" fill="none">
        <path d="M 35,10 L 55,10 M 35,10 L 35,30" />
        <path d="M 465,10 L 445,10 M 465,10 L 465,30" />
        <path d="M 35,710 L 55,710 M 35,710 L 35,690" />
        <path d="M 465,710 L 445,710 M 465,710 L 465,690" />
      </g>
      {showWorlds && (
        <g aria-label="Each of the Four Worlds contains a complete Tree of Life">
          <text x="250" y="722" textAnchor="middle" fill="var(--text-muted)"
            fontSize={mobileMode ? 11 : 9.5} fontFamily="var(--font-serif)">
            Four Worlds · ten Sephiroth in each
          </text>
          {worlds.map((world, i) => {
            const x = 52 + i * 104;
            const color = `var(${world.colorVar})`;
            return (
              <g key={world.name} role="button" tabIndex={0}
                aria-label={`Explore ${world.name}, ${world.element}, suit of ${world.suit}`}
                onClick={(e) => { e.stopPropagation(); onWorldClick(world.name); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    onWorldClick(world.name);
                  }
                }}
                style={{ cursor: 'pointer' }}>
                <rect x={x} y="736" width="84" height="156" rx="8"
                  fill="var(--bg-card)" stroke={color} strokeWidth="0.8" />
                <text x={x + 42} y="754" textAnchor="middle" fill={color}
                  fontSize={mobileMode ? 10 : 9} fontFamily="var(--font-serif)">
                  {world.name}
                </text>
                <text x={x + 42} y="770" textAnchor="middle" fill="var(--text-muted)"
                  fontSize={mobileMode ? 9 : 8}>
                  {world.elementSymbol} {world.suit}
                </text>
                <g transform={`translate(${x + 2}, 777) scale(0.16)`} aria-hidden="true">
                  {paths.map(path => {
                    const from = getSephirah(path.from);
                    const to = getSephirah(path.to);
                    return <line key={path.number} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                      stroke={color} strokeWidth="4" opacity="0.5" />;
                  })}
                  {sephiroth.map(seph => (
                    <circle key={seph.number} cx={seph.x} cy={seph.y} r="23"
                      fill="var(--bg-card)" stroke={color} strokeWidth="5" />
                  ))}
                </g>
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
};

export default TreeOfLifeSVG;
