import React from 'react';

// SVG planet glyphs from Wikimedia Commons (fixed-width variants)
// All paths are in a 12x12 viewBox, strokes converted to currentColor

const glyphs: Record<string, React.FC<{ size: number; color: string; strokeW: number }>> = {
  Sun: ({ size, color, strokeW }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="0.9" fill={color}/>
      <circle cx="6" cy="6" r="5" fill="none" stroke={color} strokeWidth={strokeW}/>
    </svg>
  ),
  Moon: ({ size, color, strokeW }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 1a5 5 0 1 1 0 10c1.785-1.031 2.887-2.938 2.887-5S5.285 2.031 3.5 1z" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Mercury: ({ size, color, strokeW }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5a1.999 1.999 0 1 0-4 0 1.999 1.999 0 1 0 4 0ZM4 1a1.999 1.999 0 1 0 4 0M6 11V7M4 9h4" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Venus: ({ size, color, strokeW }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 11V7M4 9h4m1-5a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3Z" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Mars: ({ size, color, strokeW }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 7c0-2.207-1.793-4-4-4S1 4.793 1 7s1.793 4 4 4 4-1.793 4-4ZM7.828 4.172 11 1M9.23 1H11v1.77" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Jupiter: ({ size, color, strokeW }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.25 1a4.33 4.33 0 0 1 0 7.5h7.5M7.25 6v5" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Saturn: ({ size, color, strokeW }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3h4M5 1v5a1.999 1.999 0 1 1 3.414 1.414C7.508 8.32 7 9.72 7 11" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Uranus: ({ size, color, strokeW }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.25 9.75A1.249 1.249 0 1 0 6 11a1.25 1.25 0 0 0 1.25-1.25ZM6 8.5V2.25M3.5 1v5m5-5v5m-5-2.5h5" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Neptune: ({ size, color, strokeW }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 11V1M3.5 7.25h5M2.25 1a3.751 3.751 0 0 0 7.5 0" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Pluto: ({ size, color, strokeW }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.25 2.25a1.25 1.25 0 1 0-2.498-.002 1.25 1.25 0 0 0 2.498.002ZM6 11V4.75m-2.5 2.5h5M2.25 1a3.751 3.751 0 0 0 7.5 0" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Earth: ({ size, color, strokeW }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="4.5" fill="none" stroke={color} strokeWidth={strokeW}/>
      <path d="M6 1.5v9M1.5 6h9" stroke={color} strokeWidth={strokeW} strokeLinecap="round"/>
    </svg>
  ),
};

interface PlanetGlyphProps {
  name: string;
  size: number;
  color?: string;
  strokeWidth?: number;
}

const PlanetGlyph: React.FC<PlanetGlyphProps> = ({ name, size, color = 'currentColor', strokeWidth = 0.6 }) => {
  const Glyph = glyphs[name];
  if (!Glyph) return null;
  return <Glyph size={size} color={color} strokeW={strokeWidth} />;
};

export default PlanetGlyph;
