import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ZoomIn, ZoomOut } from 'lucide-react';
import TreeOfLifeSVG from '../components/TreeOfLifeSVG';
import TreeDetailPanel from '../components/TreeDetailPanel';
import { useTheme } from '../contexts/ThemeContext';

type SelectionType = 'sephirah' | 'path' | 'daath' | 'abyss' | 'world' | 'pillar' | null;

export const TreeOfLife: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { diagramMode } = useTheme();
  const [showWorlds, setShowWorlds] = useState(true);
  const [showAbyssDaath, setShowAbyssDaath] = useState(true);
  const [showPillars, setShowPillars] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // Toggle class on app-container to hide navbar on wide screen
  useEffect(() => {
    const app = document.querySelector('.app-container');
    if (zoomed) app?.classList.add('diagram-focused');
    else app?.classList.remove('diagram-focused');
    return () => app?.classList.remove('diagram-focused');
  }, [zoomed]);

  const setSelection = useCallback((type: SelectionType, id: number | null = null, name: string | null = null) => {
    if (type) {
      const params: Record<string, string> = { view: type };
      if (id !== null) params.id = String(id);
      if (name !== null) params.name = name;
      setSearchParams(params, { replace: false });
    } else {
      setSearchParams({}, { replace: false });
    }
  }, [setSearchParams]);

  const handleSephirahClick = useCallback((n: number) => setSelection('sephirah', n), [setSelection]);
  const handlePathClick = useCallback((n: number) => setSelection('path', n), [setSelection]);
  const handleDaathClick = useCallback(() => setSelection('daath'), [setSelection]);
  const handleAbyssClick = useCallback(() => setSelection('abyss'), [setSelection]);
  const handleWorldClick = useCallback((worldName: string) => setSelection('world', null, worldName), [setSelection]);
  const handlePillarClick = useCallback((pillarName: string) => setSelection('pillar', null, pillarName), [setSelection]);
  const handleClose = useCallback(() => setSelection(null), [setSelection]);

  const selectionType = (searchParams.get('view') as SelectionType) || null;
  const selectionId = searchParams.has('id') ? Number(searchParams.get('id')) : null;
  const selectionName = searchParams.get('name') || null;

  const handleBackgroundClick = useCallback(() => {
    if (selectionType) handleClose();
  }, [selectionType, handleClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`main-content ${zoomed ? 'tree-focus' : ''}`}
      onClick={handleBackgroundClick}
    >
      <header className={`section-header ${zoomed ? 'section-header--compact' : ''}`}>
        <AnimatePresence>
          {!zoomed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <h1>The Tree of Life</h1>
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
                      The Kabbalistic Tree of Life is the map upon which the entire Thoth Tarot is built. Its 10 spheres (Sephiroth) hold the pip cards — each numbered card sits on the Sephirah matching its number. Its 22 connecting paths carry the 22 Major Arcana, each linked to a Hebrew letter and an astrological attribution. Click any element to explore.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="tree-toggles">
          <button className={`tree-toggle ${showWorlds ? 'active' : ''}`} onClick={() => setShowWorlds(!showWorlds)}>Worlds</button>
          <button className={`tree-toggle ${showAbyssDaath ? 'active' : ''}`} onClick={() => setShowAbyssDaath(!showAbyssDaath)}>Abyss & Daath</button>
          <button className={`tree-toggle ${showPillars ? 'active' : ''}`} onClick={() => setShowPillars(!showPillars)}>Pillars</button>
          <button className={`tree-toggle ${zoomed ? 'active' : ''}`} onClick={() => setZoomed(!zoomed)}>
            {zoomed ? <><ZoomOut size={14} /> Zoom</> : <><ZoomIn size={14} /> Zoom</>}
          </button>
        </div>
      </header>

      <div className={`tree-layout ${zoomed ? 'tree-layout--focused' : ''}`}>
        <div className="tree-svg-container" onClick={(e) => e.stopPropagation()}>
          <TreeOfLifeSVG
            onSephirahClick={handleSephirahClick}
            onPathClick={handlePathClick}
            onDaathClick={handleDaathClick}
            onAbyssClick={handleAbyssClick}
            onWorldClick={handleWorldClick}
            onPillarClick={handlePillarClick}
            selectedSephirah={selectionType === 'sephirah' ? selectionId : null}
            selectedPath={selectionType === 'path' ? selectionId : null}
            showWorlds={showWorlds}
            showAbyssDaath={showAbyssDaath}
            showPillars={showPillars}
            mobileMode={diagramMode === 'mobile'}
          />
        </div>

        <AnimatePresence>
          {selectionType && (
            <>
              <motion.div className="tree-detail-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} />
              <div onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', inset: 0, zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <div style={{ pointerEvents: 'auto', width: 'calc(100% - 3rem)', maxWidth: '640px' }}>
                  <TreeDetailPanel type={selectionType} id={selectionId} name={selectionName} onClose={handleClose} />
                </div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
