import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import SearchOverlay from './components/SearchOverlay';
import KofiOverlay from './components/KofiOverlay';
import Home from './pages/Home';
import { Tarot } from './pages/Tarot';
import TarotDetail from './pages/TarotDetail';
import { TreeOfLife } from './pages/TreeOfLife';
import { Astrology } from './pages/Astrology';
import { Library } from './pages/Library';
import LibraryDetail from './pages/LibraryDetail';
import Impressum from './pages/Impressum';
import { GlossaryManagerProvider } from './components/GlossaryTerm';
import { useGlobalShortcuts } from './hooks/useGlobalShortcuts';
import './styles/theme.css';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppShell: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [kofiOpen, setKofiOpen] = useState(false);

  useGlobalShortcuts({ onOpenSearch: () => setSearchOpen(true), searchOpen });

  // Browser back closes search overlay instead of navigating the underlying page.
  useEffect(() => {
    if (!searchOpen) return;
    window.history.pushState({ searchOpen: true }, '');
    const handlePopState = () => setSearchOpen(false);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [searchOpen]);

  return (
    <div className="app-container">
      <Navbar onOpenSearch={() => setSearchOpen(true)} onOpenKofi={() => setKofiOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home onOpenKofi={() => setKofiOpen(true)} />} />
          <Route path="/tarot" element={<Tarot />} />
          <Route path="/tarot/:id" element={<TarotDetail />} />
          <Route path="/tree-of-life" element={<TreeOfLife />} />
          <Route path="/astrology" element={<Astrology />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/:id" element={<LibraryDetail />} />
          <Route path="/impressum" element={<Impressum />} />
        </Routes>
      </main>

      <AnimatePresence>
        {searchOpen && (
          <SearchOverlay
            onClose={() => setSearchOpen(false)}
            initialQuery={searchQuery}
            onQueryChange={setSearchQuery}
          />
        )}
      </AnimatePresence>

      <KofiOverlay open={kofiOpen} onClose={() => setKofiOpen(false)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <GlossaryManagerProvider>
        <AppShell />
      </GlossaryManagerProvider>
    </Router>
  );
};

export default App;
