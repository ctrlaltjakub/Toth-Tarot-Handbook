import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme, flavorInfo, type CatppuccinFlavor } from '../contexts/ThemeContext';

const flavors: CatppuccinFlavor[] = ['mocha', 'macchiato', 'frappe'];

interface SettingsPanelContentProps {
  onAfterAction?: () => void;
}

const SettingsPanelContent: React.FC<SettingsPanelContentProps> = ({ onAfterAction }) => {
  const { flavor, setFlavor, diagramMode, setDiagramMode } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {flavors.map(f => {
        const info = flavorInfo[f];
        const isActive = flavor === f;
        return (
          <button
            key={f}
            onClick={() => { setFlavor(f); onAfterAction?.(); }}
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
              textAlign: 'left',
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
        Palette by{' '}
        <a
          href="https://catppuccin.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent)', textDecoration: 'none' }}
        >
          Catppuccin
        </a>
      </div>

      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        marginTop: '0.25rem',
        paddingTop: '0.5rem',
        textAlign: 'center',
      }}>
        <Link
          to="/impressum"
          onClick={() => onAfterAction?.()}
          style={{
            color: 'var(--text-subtle)',
            textDecoration: 'none',
            fontSize: '0.65rem',
            letterSpacing: '0.05em',
          }}
        >
          Impressum
        </Link>
      </div>
    </div>
  );
};

export default SettingsPanelContent;
