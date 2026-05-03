import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home as HomeIcon, Book, Search, Github } from 'lucide-react';
import ThemePicker from './ThemePicker';
import { TarotIcon, TreeIcon, AstroIcon } from './navIcons';
import { useNavigationStack } from '../contexts/NavigationStackContext';

interface SidebarProps {
  onOpenSearch: () => void;
  onOpenKofi: () => void;
}

const SunGlyph: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

const KofiGlyph: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 5h13a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3h-1.2A5 5 0 0 1 11 16H8a4 4 0 0 1-4-4V5z"
      stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none"/>
    <path d="M16 8h1a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1h-1"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 8.5c.6-.8 1.7-.8 2.3 0 .3.4.3 1 0 1.4L9 11.3 7.7 9.9c-.3-.4-.3-1 0-1.4.6-.8 1.7-.8 2.3 0"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M5 19h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
  </svg>
);

const ChevronGlyph: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
       style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s ease' }}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

interface NavItemDef {
  to: string;
  label: string;
  Icon: React.FC<{ size?: number }>;
  end: boolean;
}

const NAV_ITEMS: NavItemDef[] = [
  { to: '/', label: 'Home', Icon: HomeIcon, end: true },
  { to: '/tarot', label: 'Tarot', Icon: TarotIcon, end: false },
  { to: '/tree-of-life', label: 'Tree of Life', Icon: TreeIcon, end: false },
  { to: '/astrology', label: 'Astrology', Icon: AstroIcon, end: false },
  { to: '/library', label: 'Library', Icon: Book, end: false },
];

const KIND_LABEL: Record<string, string> = {
  card: 'Card',
  section: 'Section',
  article: 'Article',
  node: 'Detail',
};

const Sidebar: React.FC<SidebarProps> = ({ onOpenSearch, onOpenKofi }) => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try { return localStorage.getItem('thoth-sidebar-collapsed') === '1'; }
    catch { return false; }
  });
  useEffect(() => {
    try { localStorage.setItem('thoth-sidebar-collapsed', collapsed ? '1' : '0'); }
    catch { /* ignore */ }
  }, [collapsed]);

  const { recent, goBackTo } = useNavigationStack();

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} aria-label="Primary">
      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed(c => !c)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!collapsed}
        data-tooltip={collapsed ? 'Expand' : 'Collapse'}
      >
        <ChevronGlyph collapsed={collapsed} />
      </button>

      <div className="sidebar-brand">
        <div className="sidebar-brand-mark" aria-hidden="true">
          <SunGlyph />
        </div>
        {!collapsed && (
          <div className="sidebar-brand-text">
            <div className="sidebar-brand-title">Thoth Tarot Handbook</div>
          </div>
        )}
      </div>

      <button
        className="sidebar-search"
        onClick={onOpenSearch}
        data-tooltip="Search"
        aria-label="Search"
      >
        <span className="sidebar-search-icon"><Search size={18} /></span>
        {!collapsed && (
          <>
            <span className="sidebar-search-label">Search</span>
            <span className="sidebar-search-kbd">Ctrl+K</span>
          </>
        )}
      </button>

      <div className="sidebar-section-label">{!collapsed && 'Sections'}</div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => {
          const IconComp = item.Icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              data-tooltip={item.label}
            >
              <span className="sidebar-link-icon">
                <IconComp size={20} />
              </span>
              {!collapsed && <span className="sidebar-link-label">{item.label}</span>}
              <span className="sidebar-link-marker" aria-hidden="true" />
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-spacer">
        {!collapsed && (
          <div className="sidebar-recent">
            <div className="sidebar-section-label" style={{ padding: 0, marginBottom: '0.25rem', height: 'auto' }}>
              Recently viewed
            </div>
            {recent.length === 0 ? (
              <div className="sidebar-recent-empty">
                Cards and pages you visit will appear here.
              </div>
            ) : (
              <ul className="sidebar-recent-list">
                {recent.slice(0, 10).map((entry, i) => (
                  <li key={`${entry.pathname}${entry.search}-${i}`}>
                    <button
                      className={`sidebar-recent-item sidebar-recent-item--${entry.kind}`}
                      onClick={() => goBackTo(i)}
                      title={entry.label}
                    >
                      <span className="sidebar-recent-kind">{KIND_LABEL[entry.kind] ?? entry.kind}</span>
                      <span className="sidebar-recent-label">{entry.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <ThemePicker direction="up" />
        <a
          className="sidebar-link sidebar-link-quiet"
          href="https://github.com/ctrlaltjakub/Toth-Tarot-Handbook"
          target="_blank" rel="noopener noreferrer"
          data-tooltip="Source"
        >
          <span className="sidebar-link-icon"><Github size={18} /></span>
          {!collapsed && <span className="sidebar-link-label">Source</span>}
        </a>
        <button
          className="sidebar-kofi"
          onClick={onOpenKofi}
          data-tooltip="Support on Ko-fi"
          aria-label="Support on Ko-fi"
        >
          <span className="sidebar-kofi-icon" aria-hidden="true"><KofiGlyph /></span>
          {!collapsed && <span className="sidebar-kofi-label">Support on Ko-fi</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
