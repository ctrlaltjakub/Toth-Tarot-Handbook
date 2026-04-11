import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Home as HomeIcon, Layout, Book, Layers, Star, Search } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import ThemePicker from './ThemePicker';
import SearchOverlay from './SearchOverlay';

const Navbar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  // Persist query across opens — back-button closes overlay but keeps text
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setSearchOpen(true);
    }
    if (e.key === '/' && !searchOpen && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault();
      setSearchOpen(true);
    }
  }, [searchOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // When search opens, push a history entry so browser back closes the overlay
  // instead of navigating the underlying page
  useEffect(() => {
    if (!searchOpen) return;
    window.history.pushState({ searchOpen: true }, '');
    const handlePopState = () => setSearchOpen(false);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [searchOpen]);

  return (
    <>
      <nav className="navbar">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <HomeIcon size={22} />
          <span className="nav-label">Home</span>
        </NavLink>
        <NavLink to="/tarot" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Layers size={22} />
          <span className="nav-label">Tarot</span>
        </NavLink>
        <NavLink to="/tree-of-life" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Layout size={22} />
          <span className="nav-label">Tree</span>
        </NavLink>
        {/* Search in the center — stands out */}
        <button
          onClick={() => setSearchOpen(true)}
          className="nav-link nav-search-btn"
          aria-label="Search"
        >
          <Search size={22} />
        </button>
        <NavLink to="/astrology" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Star size={22} />
          <span className="nav-label">Astrology</span>
        </NavLink>
        <NavLink to="/library" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Book size={22} />
          <span className="nav-label">Library</span>
        </NavLink>
        <ThemePicker />
      </nav>

      <AnimatePresence>
        {searchOpen && (
          <SearchOverlay
            onClose={() => setSearchOpen(false)}
            initialQuery={searchQuery}
            onQueryChange={setSearchQuery}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
