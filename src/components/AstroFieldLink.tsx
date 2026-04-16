import React from 'react';
import { Link } from 'react-router-dom';
import DisambigTerm, { AMBIGUOUS_TERMS } from './DisambigTerm';

// ============================================
// Maps from display text → route params
// ============================================

const PLANET_NAMES = new Set([
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
  'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto',
]);

const SIGN_NAMES = new Set([
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
]);

const ELEMENT_NAMES: Record<string, string> = {
  Fire: 'Fire', Water: 'Water', Air: 'Air', Earth: 'Earth',
};

const GLYPH_TO_PLANET: Record<string, string> = {
  '☉': 'Sun', '☽': 'Moon', '☿': 'Mercury', '♀': 'Venus',
  '♂': 'Mars', '♃': 'Jupiter', '♄': 'Saturn', '♅': 'Uranus',
  '♆': 'Neptune', '♇': 'Pluto',
};

const GLYPH_TO_SIGN: Record<string, string> = {
  '♈': 'Aries', '♉': 'Taurus', '♊': 'Gemini', '♋': 'Cancer',
  '♌': 'Leo', '♍': 'Virgo', '♎': 'Libra', '♏': 'Scorpio',
  '♐': 'Sagittarius', '♑': 'Capricorn', '♒': 'Aquarius', '♓': 'Pisces',
};

const GLYPH_TO_ELEMENT: Record<string, string> = {
  '🜁': 'Air', '🜂': 'Fire', '🜃': 'Earth', '🜄': 'Water',
};

// ============================================
// Build regex to match all linkable tokens
// ============================================
const allNames = [...PLANET_NAMES, ...SIGN_NAMES, ...Object.keys(ELEMENT_NAMES)];
const allGlyphs = [
  ...Object.keys(GLYPH_TO_PLANET),
  ...Object.keys(GLYPH_TO_SIGN),
  ...Object.keys(GLYPH_TO_ELEMENT),
];
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const TOKEN_RE = new RegExp(
  `(${allGlyphs.map(esc).join('|')}|\\b(?:${allNames.sort((a, b) => b.length - a.length).join('|')})\\b)`,
  'g'
);

// ============================================
// Shared link styles
// ============================================
const baseLinkStyle: React.CSSProperties = {
  textDecoration: 'underline',
  textDecorationStyle: 'dotted',
  textUnderlineOffset: '2px',
  cursor: 'pointer',
};

const glyphExtra: React.CSSProperties = {
  fontSize: '1.35em', verticalAlign: 'middle', lineHeight: 1, textDecoration: 'none',
};

// ============================================
// Render a single token as a link
// ============================================
const TokenLink: React.FC<{
  text: string;
  path: string;
  color: string;
  isGlyph: boolean;
  ambiguousName?: string;
}> = ({ text, path, color, isGlyph, ambiguousName }) => {
  const style: React.CSSProperties = {
    ...baseLinkStyle,
    color,
    ...(isGlyph ? glyphExtra : {}),
  };

  if (ambiguousName) {
    return (
      <DisambigTerm term={ambiguousName} style={isGlyph ? glyphExtra : undefined}>
        {text}
      </DisambigTerm>
    );
  }

  return <Link to={path} style={style}>{text}</Link>;
};

// ============================================
// Main component: parses astrology field string
// ============================================
const AstroFieldLink: React.FC<{ text: string }> = ({ text }) => {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  TOKEN_RE.lastIndex = 0;

  while ((match = TOKEN_RE.exec(text)) !== null) {
    const token = match[1];
    const idx = match.index;

    if (idx > lastIndex) {
      nodes.push(text.slice(lastIndex, idx));
    }

    // Identify token type
    const planetFromGlyph = GLYPH_TO_PLANET[token];
    const signFromGlyph = GLYPH_TO_SIGN[token];
    const elementFromGlyph = GLYPH_TO_ELEMENT[token];

    if (planetFromGlyph) {
      const ambig = planetFromGlyph in AMBIGUOUS_TERMS ? planetFromGlyph : undefined;
      nodes.push(
        <TokenLink key={key++} text={token} path={`/astrology?view=planet&name=${planetFromGlyph}`}
          color="var(--color-sapphire)" isGlyph ambiguousName={ambig} />
      );
    } else if (signFromGlyph) {
      nodes.push(
        <TokenLink key={key++} text={token} path={`/astrology?view=sign&name=${signFromGlyph}`}
          color="var(--accent-warm)" isGlyph />
      );
    } else if (elementFromGlyph) {
      nodes.push(
        <TokenLink key={key++} text={token} path={`/astrology?view=element&name=${elementFromGlyph}`}
          color="var(--color-earth)" isGlyph />
      );
    } else if (PLANET_NAMES.has(token)) {
      const ambig = token in AMBIGUOUS_TERMS ? token : undefined;
      nodes.push(
        <TokenLink key={key++} text={token} path={`/astrology?view=planet&name=${token}`}
          color="var(--color-sapphire)" isGlyph={false} ambiguousName={ambig} />
      );
    } else if (SIGN_NAMES.has(token)) {
      nodes.push(
        <TokenLink key={key++} text={token} path={`/astrology?view=sign&name=${token}`}
          color="var(--accent-warm)" isGlyph={false} />
      );
    } else if (ELEMENT_NAMES[token]) {
      nodes.push(
        <TokenLink key={key++} text={token} path={`/astrology?view=element&name=${token}`}
          color="var(--color-earth)" isGlyph={false} />
      );
    }

    lastIndex = idx + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes}</>;
};

export default AstroFieldLink;
