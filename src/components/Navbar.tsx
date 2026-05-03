import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home as HomeIcon, Book, Search } from 'lucide-react';
import ThemePicker from './ThemePicker';

const TarotIcon: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="currentColor"/>
    <path d="M11 13C11 14.1046 10.1046 15 9 15C7.89543 15 7 14.1046 7 13C7 11.8954 7.89543 11 9 11C10.1046 11 11 11.8954 11 13Z" fill="currentColor"/>
    <path d="M15 15C16.1046 15 17 14.1046 17 13C17 11.8954 16.1046 11 15 11C13.8954 11 13 11.8954 13 13C13 14.1046 13.8954 15 15 15Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M3 4C3 2.34315 4.34315 1 6 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V4ZM6 3H18C18.5523 3 19 3.44772 19 4V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V4C5 3.44772 5.44772 3 6 3Z" fill="currentColor"/>
  </svg>
);

const TreeIcon: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="-1 -1 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11.5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <text x="12" y="16" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="700" fontFamily="serif">כתר</text>
  </svg>
);

const AstroIcon: React.FC<{ size?: number }> = () => (
  <span className="astro-nav-icon">♎︎</span>
);

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenKofi?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <HomeIcon size={22} />
        <span className="nav-label">Home</span>
      </NavLink>
      <NavLink to="/tarot" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <TarotIcon />
        <span className="nav-label">Tarot</span>
      </NavLink>
      <NavLink to="/tree-of-life" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <TreeIcon />
        <span className="nav-label">Tree</span>
      </NavLink>
      <button onClick={onOpenSearch} className="nav-link nav-search-btn" aria-label="Search">
        <Search size={22} />
      </button>
      <NavLink to="/astrology" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <AstroIcon />
        <span className="nav-label">Astrology</span>
      </NavLink>
      <NavLink to="/library" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <Book size={22} />
        <span className="nav-label">Library</span>
      </NavLink>
      <ThemePicker />
    </nav>
  );
};

export { TarotIcon, TreeIcon, AstroIcon };
export default Navbar;
