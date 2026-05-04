import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Book, Search, Settings, X } from 'lucide-react';
import SettingsPanelContent from './SettingsPanelContent';
import { TarotIcon, TreeIcon, AstroIcon } from './navIcons';
import { useNavigationStack } from '../contexts/NavigationStackContext';
import { runSearch, iconForType, colorForType } from './SearchOverlay';

interface SidebarProps {
  onOpenSearch: () => void;
}

const SunGlyph: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
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

// onOpenSearch is kept in the props in case the parent wants to trigger
// the modal (e.g. from a global Ctrl+K), but the sidebar itself uses an
// inline input + results dropdown.
const Sidebar: React.FC<SidebarProps> = () => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try { return localStorage.getItem('thoth-sidebar-collapsed') === '1'; }
    catch { return false; }
  });
  useEffect(() => {
    try { localStorage.setItem('thoth-sidebar-collapsed', collapsed ? '1' : '0'); }
    catch { /* ignore */ }
  }, [collapsed]);

  const { recent, goBackTo } = useNavigationStack();

  // Inline search
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const trimmed = searchQuery.trim();
  const searchResults = trimmed.length > 0 ? runSearch(trimmed).slice(0, 30) : [];
  const navigate = useNavigate();

  const selectResult = (path: string) => {
    setSearchQuery('');
    navigate(path);
  };

  // Close results when clicking outside the search wrap
  useEffect(() => {
    if (trimmed.length === 0) return;
    const handler = (e: Event) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        // Don't clear the query, just stop showing — but easiest is to clear
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [trimmed]);

  // When sidebar is collapsed and the user clicks the search row, expand
  // it. Cannot focus immediately because the input is display:none until
  // the transition advances, so we focus after the width transition.
  const handleSearchRowClick = () => {
    if (collapsed) {
      setCollapsed(false);
      setTimeout(() => inputRef.current?.focus(), 320);
    }
  };

  // Inline settings
  const [settingsOpen, setSettingsOpen] = useState(false);
  const handleSettingsClick = () => {
    if (collapsed) {
      setCollapsed(false);
      setSettingsOpen(true);
    } else {
      setSettingsOpen(o => !o);
    }
  };

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

      <div ref={searchWrapRef} className="sidebar-search-wrap">
        <div
          className="sidebar-search-input-row"
          onClick={collapsed ? handleSearchRowClick : undefined}
          data-tooltip="Search"
        >
          <span className="sidebar-search-icon"><Search size={18} /></span>
          <input
            ref={inputRef}
            type="text"
            className="sidebar-search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Search"
          />
          {searchQuery && (
            <button
              className="sidebar-search-clear"
              onClick={(e) => { e.stopPropagation(); setSearchQuery(''); inputRef.current?.focus(); }}
              aria-label="Clear search"
              type="button"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {!collapsed && trimmed.length > 0 && (
          <div className="sidebar-search-results">
            {searchResults.length === 0 ? (
              <div className="sidebar-search-empty">
                No results for &ldquo;{trimmed}&rdquo;
              </div>
            ) : (
              searchResults.map((r, i) => (
                <button
                  key={`${r.type}-${r.path}-${i}`}
                  className="sidebar-search-result"
                  onClick={() => selectResult(r.path)}
                >
                  <span className="sidebar-search-result-icon" style={{ color: colorForType(r.type) }}>
                    {iconForType(r.type)}
                  </span>
                  <span className="sidebar-search-result-text">
                    <span className="sidebar-search-result-title">{r.title}</span>
                    <span className="sidebar-search-result-subtitle">{r.subtitle}</span>
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

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
        {settingsOpen && !collapsed && (
          <div className="sidebar-settings-panel">
            <SettingsPanelContent />
          </div>
        )}
        <button
          className={`sidebar-link sidebar-settings-button ${settingsOpen ? 'active' : ''}`}
          onClick={handleSettingsClick}
          data-tooltip="Settings"
          aria-expanded={settingsOpen}
          aria-label="Settings"
          type="button"
        >
          <span className="sidebar-link-icon"><Settings size={20} /></span>
          {!collapsed && <span className="sidebar-link-label">Settings</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
