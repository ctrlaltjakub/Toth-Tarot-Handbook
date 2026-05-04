import React, { useState, useRef, useEffect } from 'react';
import { Settings } from 'lucide-react';
import SettingsPanelContent from './SettingsPanelContent';

interface ThemePickerProps {
  direction?: 'down' | 'up';
}

const ThemePicker: React.FC<ThemePickerProps> = ({ direction }) => {
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

  const effectiveDir = direction ?? (isMobile ? 'up' : 'down');
  const dropdownPosition: React.CSSProperties = effectiveDir === 'up'
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
        }}>
          <SettingsPanelContent onAfterAction={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default ThemePicker;
