import React, { createContext, useContext, useState, useEffect } from 'react';

export type CatppuccinFlavor = 'mocha' | 'macchiato' | 'frappe';
export type DiagramMode = 'desktop' | 'mobile';

interface ThemeContextType {
  flavor: CatppuccinFlavor;
  setFlavor: (f: CatppuccinFlavor) => void;
  diagramMode: DiagramMode;
  setDiagramMode: (m: DiagramMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  flavor: 'mocha',
  setFlavor: () => {},
  diagramMode: 'desktop',
  setDiagramMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const flavorInfo: Record<CatppuccinFlavor, { label: string; base: string; accent: string }> = {
  mocha:     { label: 'Mocha',     base: '#1e1e2e', accent: '#cba6f7' },
  macchiato: { label: 'Macchiato', base: '#24273a', accent: '#c6a0f6' },
  frappe:    { label: 'Frappé',    base: '#303446', accent: '#ca9ee6' },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flavor, setFlavorState] = useState<CatppuccinFlavor>(() => {
    const stored = localStorage.getItem('ctp-flavor') as CatppuccinFlavor;
    return (stored && flavorInfo[stored]) ? stored : 'mocha';
  });

  const [diagramMode, setDiagramModeState] = useState<DiagramMode>(() => {
    const stored = localStorage.getItem('diagram-mode') as DiagramMode;
    if (stored === 'desktop' || stored === 'mobile') return stored;
    // Auto-detect: mobile if screen width < 768px
    return window.innerWidth < 768 ? 'mobile' : 'desktop';
  });

  const setFlavor = (f: CatppuccinFlavor) => {
    setFlavorState(f);
    localStorage.setItem('ctp-flavor', f);
  };

  const setDiagramMode = (m: DiagramMode) => {
    setDiagramModeState(m);
    localStorage.setItem('diagram-mode', m);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', flavor);
  }, [flavor]);

  return (
    <ThemeContext.Provider value={{ flavor, setFlavor, diagramMode, setDiagramMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
