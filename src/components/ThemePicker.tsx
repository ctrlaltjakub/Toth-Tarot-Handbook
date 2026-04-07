import React, { useState, useRef, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { useTheme, flavorInfo, type CatppuccinFlavor } from '../contexts/ThemeContext';

const flavors: CatppuccinFlavor[] = ['mocha', 'macchiato', 'frappe'];

const ThemePicker: React.FC = () => {
  const { flavor, setFlavor, diagramMode, setDiagramMode } = useTheme();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const dropdownPosition: React.CSSProperties = isMobile
    ? { bottom: '100%', marginBottom: '0.75rem' }
    : { top: '100%', marginTop: '0.75rem' };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change theme"
        className="nav-link"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
      >
        <Settings size={22} />
        <span className="nav-label">Settings</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          right: 0,
          ...dropdownPosition,
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '0.5rem',
          minWidth: '170px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}>
          {flavors.map(f => {
            const info = flavorInfo[f];
            const isActive = flavor === f;
            return (
              <button
                key={f}
                onClick={() => { setFlavor(f); setOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 0.75rem',
                  background: isActive ? 'var(--surface0)' : 'transparent',
                  border: isActive ? '1px solid var(--accent)' : '1px solid transparent',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                }}
              >
                <span style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${info.base} 50%, ${info.accent} 50%)`,
                  border: '2px solid var(--ctp-overlay0)',
                  flexShrink: 0,
                }} />
                {info.label}
              </button>
            );
          })}
          {/* Diagram mode toggle */}
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            marginTop: '0.25rem',
            paddingTop: '0.5rem',
          }}>
            <div style={{
              fontSize: '0.65rem',
              color: 'var(--text-subtle)',
              letterSpacing: '0.05em',
              marginBottom: '0.35rem',
              textAlign: 'center',
            }}>DIAGRAM MODE</div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {(['desktop', 'mobile'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setDiagramMode(mode)}
                  style={{
                    flex: 1,
                    padding: '0.4rem 0.5rem',
                    background: diagramMode === mode ? 'var(--surface0)' : 'transparent',
                    border: diagramMode === mode ? '1px solid var(--accent)' : '1px solid transparent',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: diagramMode === mode ? 'var(--text-main)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.78rem',
                    textTransform: 'capitalize',
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            marginTop: '0.25rem',
            paddingTop: '0.5rem',
            textAlign: 'center',
            fontSize: '0.65rem',
            color: 'var(--text-subtle)',
            letterSpacing: '0.05em',
          }}>
            Palette by <a href="https://catppuccin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Catppuccin</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemePicker;
