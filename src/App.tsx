import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Tarot } from './pages/Tarot';
import TarotDetail from './pages/TarotDetail';
import { TreeOfLife } from './pages/TreeOfLife';
import { Astrology } from './pages/Astrology';
import { Library } from './pages/Library';
import LibraryDetail from './pages/LibraryDetail';
import Impressum from './pages/Impressum';
import { GlossaryManagerProvider } from './components/GlossaryTerm';
import './styles/theme.css';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <GlossaryManagerProvider>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tarot" element={<Tarot />} />
              <Route path="/tarot/:id" element={<TarotDetail />} />
              <Route path="/tree-of-life" element={<TreeOfLife />} />
              <Route path="/astrology" element={<Astrology />} />
              <Route path="/library" element={<Library />} />
              <Route path="/library/:id" element={<LibraryDetail />} />
              <Route path="/impressum" element={<Impressum />} />
            </Routes>
          </main>
        </div>
      </GlossaryManagerProvider>
    </Router>
  );
};

export default App;
