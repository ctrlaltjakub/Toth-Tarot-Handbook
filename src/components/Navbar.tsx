import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home as HomeIcon, Book, Search } from 'lucide-react';
import ThemePicker from './ThemePicker';
import { TarotIcon, TreeIcon, AstroIcon } from './navIcons';

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

export default Navbar;
