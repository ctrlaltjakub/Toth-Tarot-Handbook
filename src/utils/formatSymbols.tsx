import React from 'react';

// Planet symbols that render too small in most fonts
const SMALL_PLANETS = /([♅♆♇♃♄♂♀☿])/g;

export const AstroText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(SMALL_PLANETS);
  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) =>
        SMALL_PLANETS.test(part) ? (
          <span key={i} style={{ fontSize: '1.35em', verticalAlign: 'middle', lineHeight: 1 }}>
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};
