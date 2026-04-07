import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ZoomIn, ZoomOut } from 'lucide-react';
import ZodiacWheelSVG from '../components/ZodiacWheelSVG';
import AstrologyDetailPanel from '../components/AstrologyDetailPanel';
import { useTheme } from '../contexts/ThemeContext';

type SelectionType = 'sign' | 'planet' | 'element' | null;

export const Astrology: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { diagramMode } = useTheme();
  const [showPlanetLines, setShowPlanetLines] = useState(true);
  const [showElements, setShowElements] = useState(true);
  const [showQualities, setShowQualities] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Toggle class on app-container to hide navbar on wide screen
  useEffect(() => {
    const app = document.querySelector('.app-container');
    if (zoomed) app?.classList.add('diagram-focused');
    else app?.classList.remove('diagram-focused');
    return () => app?.classList.remove('diagram-focused');
  }, [zoomed]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const selectionType = (searchParams.get('view') as SelectionType) || null;
  const selectionName = searchParams.get('name') || null;

  const setSelection = useCallback((type: SelectionType, name: string | null = null) => {
    if (type && name) setSearchParams({ view: type, name }, { replace: false });
    else setSearchParams({}, { replace: false });
  }, [setSearchParams]);

  const handleSignClick = useCallback((n: string) => setSelection('sign', n), [setSelection]);
  const handlePlanetClick = useCallback((n: string) => setSelection('planet', n), [setSelection]);
  const handleElementClick = useCallback((n: string) => setSelection('element', n), [setSelection]);
  const handleQualityClick = useCallback((n: string) => setSelection('element', n), [setSelection]);
  const handleClose = useCallback(() => setSelection(null), [setSelection]);
  const handleBackgroundClick = useCallback(() => { if (selectionType) handleClose(); }, [selectionType, handleClose]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`main-content main-content--full ${zoomed ? 'astro-focus' : ''}`} onClick={handleBackgroundClick}>
      <header className={`section-header ${zoomed ? 'section-header--compact' : ''}`}>
        <AnimatePresence>
          {!zoomed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <h1>Astrology</h1>
              <button onClick={() => setShowInfo(!showInfo)} className="readme-btn">
                <Info size={14} /> {showInfo ? 'Hide' : 'Read Me'}
              </button>
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0.75rem auto 0.5rem', lineHeight: 1.7, fontSize: '0.9rem' }}>
                      The zodiac wheel maps the Thoth Tarot's astrological framework. The outer ring shows 12 signs with their decans — each decan assigned a pip card and a planetary sub-ruler. Inside, four triangles mark the elemental triplicities (Fire, Water, Air, Earth) and three squares mark the qualities (Cardinal, Fixed, Mutable). Orbiting planets connect to the signs they rule. Click any element to explore.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="tree-toggles">
          <button className={`tree-toggle ${showPlanetLines ? 'active' : ''}`} onClick={() => setShowPlanetLines(!showPlanetLines)}>Planet lines</button>
          <button className={`tree-toggle ${showElements ? 'active' : ''}`} onClick={() => setShowElements(!showElements)}>Elements</button>
          <button className={`tree-toggle ${showQualities ? 'active' : ''}`} onClick={() => setShowQualities(!showQualities)}>Qualities</button>
          <button className={`tree-toggle ${zoomed ? 'active' : ''}`} onClick={() => setZoomed(!zoomed)}>
            {zoomed ? <><ZoomOut size={14} /> Zoom</> : <><ZoomIn size={14} /> Zoom</>}
          </button>
        </div>
      </header>

      <div className="tree-layout">
        <div
          className={`astrology-wheel-container ${zoomed ? 'astrology-zoomed' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <ZodiacWheelSVG
            onSignClick={handleSignClick} onPlanetClick={handlePlanetClick} onElementClick={handleElementClick}
            selectedSign={selectionType === 'sign' ? selectionName : null}
            showPlanetLines={showPlanetLines} showElements={showElements} showQualities={showQualities}
            onQualityClick={handleQualityClick}
            mobileMode={diagramMode === 'mobile'}
          />
        </div>

        <AnimatePresence>
          {selectionType && (
            <>
              <motion.div className="tree-detail-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} />
              <div onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', inset: 0, zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <div style={{ pointerEvents: 'auto', width: 'calc(100% - 3rem)', maxWidth: '640px' }}>
                  <AstrologyDetailPanel type={selectionType} name={selectionName} onClose={handleClose} />
                </div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
