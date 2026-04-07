import React from 'react';

// Inline SVG quality symbols — consistent across all browsers/devices
// Based on the downloaded SVG files (12x12 viewBox)
const QualityIcon: React.FC<{ name: string; size?: number; color?: string; style?: React.CSSProperties }> = ({ name, size = 16, color = 'currentColor', style }) => {
  const common = { width: size, height: size, viewBox: '0 0 12 12', xmlns: 'http://www.w3.org/2000/svg', style: { display: 'inline-block', verticalAlign: 'middle', ...style } };
  const sw = 0.6;

  if (name === 'Cardinal') {
    return (
      <svg {...common}>
        <path d="M11 10.33 6 1.67l-5 8.66" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="9.736" r="0.899" fill={color} />
      </svg>
    );
  }
  if (name === 'Fixed') {
    return (
      <svg {...common}>
        <path d="M11 11V1H1v10h10M8.5 6h-5" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  // Mutable
  return (
    <svg {...common}>
      <circle cx="6" cy="8.5" r="0.899" fill={color} />
      <path d="M11 8.5a5 5 0 1 0-10 0" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default QualityIcon;
