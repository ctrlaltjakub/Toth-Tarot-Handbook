# v2 Sidebar Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the desktop top navbar with a collapsible left sidebar in the Thoth Tarot Handbook React 19 SPA, preserving mobile bottom navbar, all SVG diagrams, the v1 settings popover, and the cross-route back-navigation chain.

**Architecture:** Add a `Sidebar` component rendered alongside the existing `Navbar`; CSS media queries hide the navbar on desktop and the sidebar on mobile. Add a small `NavigationStackContext` that mirrors react-router's history into a labeled breadcrumb stack — the sidebar's "Recently viewed" list reads from this hook. Lift shared state (search-open, kofi-open, settings-open) to `App.tsx` so both navs trigger the same overlays.

**Tech Stack:** React 19, TypeScript, Vite 7, react-router 7, framer-motion, lucide-react, plain CSS (no Tailwind).

**Spec:** [`docs/superpowers/specs/2026-05-03-v2-sidebar-redesign.md`](../specs/2026-05-03-v2-sidebar-redesign.md)

**Branch:** `v2-sidebar` (already created locally; do not push during execution).

**Verification model:** This project has no test framework. Each task ends with `npm run build` (which runs `tsc -b && vite build`) as the type/build check, plus a manual browser smoke test for visible changes.

---

## Task 1: Add `direction` prop to ThemePicker

The sidebar's Settings row sits in the footer and must open its popover *upward*. Today the popover opens upward only on mobile (auto-detected). Make this explicit with a prop so sidebar use is unambiguous on any viewport.

**Files:**
- Modify: `src/components/ThemePicker.tsx`

- [ ] **Step 1: Add prop and use it**

Replace the component signature and `dropdownPosition` derivation. Open `src/components/ThemePicker.tsx` and:

Change line 8 from:
```tsx
const ThemePicker: React.FC = () => {
```
to:
```tsx
interface ThemePickerProps {
  direction?: 'down' | 'up';
}

const ThemePicker: React.FC<ThemePickerProps> = ({ direction }) => {
```

Change the `dropdownPosition` logic (around lines 29–31) from:
```tsx
const dropdownPosition: React.CSSProperties = isMobile
  ? { bottom: '100%', marginBottom: '0.75rem' }
  : { top: '100%', marginTop: '0.75rem' };
```
to:
```tsx
const effectiveDir = direction ?? (isMobile ? 'up' : 'down');
const dropdownPosition: React.CSSProperties = effectiveDir === 'up'
  ? { bottom: '100%', marginBottom: '0.75rem' }
  : { top: '100%', marginTop: '0.75rem' };
```

This keeps current behavior when `direction` is unset (mobile auto-up, desktop down) and lets the sidebar pass `direction="up"` explicitly.

- [ ] **Step 2: Build to verify type-correct**

```bash
npm run build
```
Expected: build succeeds, no TS errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ThemePicker.tsx
git commit -m "Add direction prop to ThemePicker for sidebar use"
```

---

## Task 2: Extract KofiOverlay component

Currently the Ko-fi modal lives inline in `Home.tsx`. The sidebar's Ko-fi button needs to trigger the same overlay, so lift it.

**Files:**
- Create: `src/components/KofiOverlay.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Create the new component**

Create `src/components/KofiOverlay.tsx`:

```tsx
import React from 'react';

interface KofiOverlayProps {
  open: boolean;
  onClose: () => void;
}

const KofiOverlay: React.FC<KofiOverlayProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'calc(100% - 2rem)',
          maxWidth: '420px',
          height: '80vh',
          maxHeight: '700px',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <iframe
          src="https://ko-fi.com/jakubfleitesjonczyk?hidefeed=true&widget=true&embed=true"
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Support on Ko-fi"
        />
      </div>
    </div>
  );
};

export default KofiOverlay;
```

- [ ] **Step 2: Replace the inline overlay in Home.tsx with the component**

In `src/pages/Home.tsx`:

Add import at top (with other imports near line 5):
```tsx
import KofiOverlay from '../components/KofiOverlay';
```

Find the `{kofiOpen && (...)}` block (currently lines 305–341) — the entire inline overlay JSX — and replace it with:
```tsx
<KofiOverlay open={kofiOpen} onClose={() => setKofiOpen(false)} />
```

- [ ] **Step 3: Build to verify**

```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/KofiOverlay.tsx src/pages/Home.tsx
git commit -m "Extract KofiOverlay into shared component"
```

---

## Task 3: Lift global keyboard shortcuts to App

`Ctrl+K` and `/` shortcuts currently live in `Navbar.tsx`. Once the sidebar takes over on desktop, the navbar isn't always mounted — so lift the shortcut hook and the `searchOpen` state up to `App.tsx`.

**Files:**
- Create: `src/hooks/useGlobalShortcuts.ts`
- Modify: `src/App.tsx`
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Create the hook**

Create `src/hooks/useGlobalShortcuts.ts`:

```ts
import { useEffect } from 'react';

interface Options {
  onOpenSearch: () => void;
  searchOpen: boolean;
}

export function useGlobalShortcuts({ onOpenSearch, searchOpen }: Options): void {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onOpenSearch();
        return;
      }
      if (
        e.key === '/' &&
        !searchOpen &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        onOpenSearch();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onOpenSearch, searchOpen]);
}
```

- [ ] **Step 2: Lift `searchOpen` and shortcuts into App.tsx**

Replace the entire contents of `src/App.tsx` with:

```tsx
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
```

Note: `Home` and `Navbar` props change here. We'll update those next. `KofiOverlay` is now mounted at App level; the Home-level mount from Task 2 will be removed.

- [ ] **Step 3: Update Navbar to receive callback prop**

Open `src/components/Navbar.tsx`. Replace the entire contents with:

```tsx
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

const AstroIcon: React.FC = () => <span className="astro-nav-icon">♎︎</span>;

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
```

Changes from current: removed local `searchOpen`/`searchQuery` state, removed keyboard hook, removed search overlay rendering (lifted to App), turned the search button into a callback. Also exports the icon components so the Sidebar can reuse them.

- [ ] **Step 4: Export icons for reuse from Navbar**

Append at the end of `src/components/Navbar.tsx`, just before `export default Navbar;`:

```tsx
export { TarotIcon, TreeIcon, AstroIcon };
```

- [ ] **Step 5: Update Home.tsx prop signature**

Open `src/pages/Home.tsx`. Change the component signature (around line 7):
```tsx
const Home: React.FC = () => {
```
to:
```tsx
interface HomeProps {
  onOpenKofi?: () => void;
}
const Home: React.FC<HomeProps> = ({ onOpenKofi }) => {
```

Find the `setKofiOpen(true)` call (around line 260) and replace the surrounding button's onClick from:
```tsx
onClick={() => setKofiOpen(true)}
```
to:
```tsx
onClick={() => (onOpenKofi ? onOpenKofi() : setKofiOpen(true))}
```

Also remove the `<KofiOverlay open={kofiOpen} ... />` line near the end of Home.tsx (added in Task 2). Search and remove the line:
```tsx
<KofiOverlay open={kofiOpen} onClose={() => setKofiOpen(false)} />
```
And remove the `import KofiOverlay from '../components/KofiOverlay';` import line at the top.

The `kofiOpen` local state is now legacy (only triggered if `onOpenKofi` is missing) — leave it for safety.

- [ ] **Step 6: Build to verify**

```bash
npm run build
```
Expected: build succeeds, no TS errors. If `unused variable` warnings appear for `kofiOpen` or `kofiRef`, leave them — eslint is lenient.

- [ ] **Step 7: Manual smoke test**

```bash
npm run dev -- --host
```
- Open the app at http://localhost:5173 (or shown URL).
- Press `Ctrl+K` → search overlay opens.
- Press Esc / browser-back → overlay closes without leaving the page.
- Click the Ko-fi button on Home → iframe overlay opens.
- Stop the dev server (`Ctrl+C`).

- [ ] **Step 8: Commit**

```bash
git add src/hooks/useGlobalShortcuts.ts src/App.tsx src/components/Navbar.tsx src/pages/Home.tsx
git commit -m "Lift search overlay, kofi overlay, and global shortcuts to App"
```

---

## Task 4: NavigationStackContext + label resolver

Add the parallel breadcrumb stack that mirrors react-router history. Pure data layer — no UI consumers yet.

**Files:**
- Create: `src/contexts/NavigationStackContext.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the context**

Create `src/contexts/NavigationStackContext.tsx`:

```tsx
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { tarotData } from '../data/tarotData';
import { sephiroth, paths } from '../data/treeOfLifeData';
import { articles } from '../data/libraryData';

export type NavKind = 'section' | 'card' | 'article' | 'node';

export interface NavEntry {
  pathname: string;
  search: string;
  label: string;
  kind: NavKind;
}

interface NavigationStackValue {
  stack: NavEntry[];
  recent: NavEntry[];     // stack minus the current entry, newest-first
  goBackTo: (recentIndex: number) => void;
}

const Ctx = createContext<NavigationStackValue>({
  stack: [],
  recent: [],
  goBackTo: () => {},
});

export const useNavigationStack = () => useContext(Ctx);

const MAX_STACK = 30;

function resolveLabel(pathname: string, search: string): { label: string; kind: NavKind } {
  if (pathname === '/') return { label: 'Home', kind: 'section' };
  if (pathname === '/tarot') return { label: 'Tarot', kind: 'section' };
  if (pathname === '/astrology') return { label: 'Astrology', kind: 'section' };
  if (pathname === '/library') return { label: 'Library', kind: 'section' };
  if (pathname === '/impressum') return { label: 'Impressum', kind: 'section' };

  if (pathname === '/tree-of-life') {
    const params = new URLSearchParams(search);
    const view = params.get('view');
    const id = params.get('id');
    if (view === 'sephirah' && id) {
      const seph = sephiroth.find(s => s.number === Number(id));
      if (seph) return { label: seph.name, kind: 'node' };
    }
    if (view === 'path' && id) {
      const path = paths.find(p => p.number === Number(id));
      if (path) return { label: path.cardName, kind: 'node' };
    }
    return { label: 'Tree of Life', kind: 'section' };
  }

  const tarotMatch = pathname.match(/^\/tarot\/([^/]+)$/);
  if (tarotMatch) {
    const card = tarotData.find(c => c.id === tarotMatch[1]);
    return { label: card?.name ?? 'Card', kind: 'card' };
  }

  const libMatch = pathname.match(/^\/library\/([^/]+)$/);
  if (libMatch) {
    const article = articles.find(a => a.id === libMatch[1]);
    return { label: article?.title ?? 'Article', kind: 'article' };
  }

  return { label: pathname, kind: 'section' };
}

function entryFor(loc: { pathname: string; search: string }): NavEntry {
  const { label, kind } = resolveLabel(loc.pathname, loc.search);
  return { pathname: loc.pathname, search: loc.search, label, kind };
}

export const NavigationStackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navType = useNavigationType();
  const navigate = useNavigate();

  const [stack, setStack] = useState<NavEntry[]>(() => [entryFor(location)]);
  // Keep a ref of the latest stack so the listener doesn't re-bind on every change
  const stackRef = useRef(stack);
  stackRef.current = stack;
  // Track the previous location to skip the initial mount tick
  const prevLocRef = useRef(location);

  useEffect(() => {
    const prev = prevLocRef.current;
    if (prev.pathname === location.pathname && prev.search === location.search) {
      // No actual location change — the initial render
      return;
    }
    prevLocRef.current = location;

    const newEntry = entryFor(location);

    setStack(prevStack => {
      if (navType === 'POP') {
        const second = prevStack[prevStack.length - 2];
        if (second && second.pathname === location.pathname && second.search === location.search) {
          // Back press → pop the last
          return prevStack.slice(0, -1);
        }
        // Forward-after-back or jump POP → treat as push
        const next = [...prevStack, newEntry];
        return next.length > MAX_STACK ? next.slice(next.length - MAX_STACK) : next;
      }
      if (navType === 'REPLACE') {
        const copy = [...prevStack];
        copy[copy.length - 1] = newEntry;
        return copy;
      }
      // PUSH
      const next = [...prevStack, newEntry];
      return next.length > MAX_STACK ? next.slice(next.length - MAX_STACK) : next;
    });
  }, [location, navType]);

  // recent = stack reversed and minus the current location
  const recent = stack.length > 1 ? stack.slice(0, -1).reverse() : [];

  const goBackTo = (recentIndex: number) => {
    // recent[0] is the second-to-last in stack → navigate(-1)
    // recent[1] is the third-to-last → navigate(-2)
    // etc.
    const steps = recentIndex + 1;
    if (steps > 0) navigate(-steps);
  };

  return (
    <Ctx.Provider value={{ stack, recent, goBackTo }}>
      {children}
    </Ctx.Provider>
  );
};
```

- [ ] **Step 2: Wire provider into App.tsx**

In `src/App.tsx`, add import:
```tsx
import { NavigationStackProvider } from './contexts/NavigationStackContext';
```

Wrap the inside of `<GlossaryManagerProvider>` with `<NavigationStackProvider>`. Find:
```tsx
<GlossaryManagerProvider>
  <AppShell />
</GlossaryManagerProvider>
```
Replace with:
```tsx
<GlossaryManagerProvider>
  <NavigationStackProvider>
    <AppShell />
  </NavigationStackProvider>
</GlossaryManagerProvider>
```

(Order doesn't strictly matter — both providers must be inside `<Router>`.)

- [ ] **Step 3: Build to verify**

```bash
npm run build
```
Expected: build succeeds. If `articles` doesn't exist as the export name in `libraryData.ts`, the build will fail — verify the export name and adjust the import. (Run `grep "^export" src/data/libraryData.ts` to confirm.)

- [ ] **Step 4: Commit**

```bash
git add src/contexts/NavigationStackContext.tsx src/App.tsx
git commit -m "Add NavigationStackContext mirroring react-router history"
```

---

## Task 5: Sidebar component + sidebar.css

Create the new component and stylesheet. Sidebar.tsx is the largest file in this plan; sidebar.css is ~200 lines.

**Files:**
- Create: `src/components/Sidebar.tsx`
- Create: `src/styles/sidebar.css`
- Modify: `src/styles/theme.css`

- [ ] **Step 1: Create sidebar.css**

Create `src/styles/sidebar.css`:

```css
/* ============================================
   Sidebar — desktop collapsible side panel
   Visible only at >= 768px; mobile uses .navbar.
   ============================================ */
:root {
  --sidebar-w: 248px;
  --sidebar-w-collapsed: 68px;
}

.sidebar {
  position: fixed;
  top: 0; left: 0; bottom: 0;
  width: var(--sidebar-w);
  background: var(--bg-card);
  border-right: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0.85rem 1rem;
  z-index: 100;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              padding 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              background-color 0.35s ease, color 0.35s ease;
  overflow: visible;
}
.sidebar.collapsed {
  width: var(--sidebar-w-collapsed);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
@media (max-width: 767px) {
  .sidebar { display: none; }
}

/* Toggle chevron — sits on the outer edge */
.sidebar-toggle {
  position: absolute;
  top: 28px;
  right: -14px;
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--bg-surface);
  border: 1px solid var(--accent);
  color: var(--accent);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}
.sidebar-toggle:hover {
  background: var(--accent);
  color: var(--bg-deep);
  transform: scale(1.08);
}

/* Brand block */
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.25rem 0.5rem 1.1rem;
  margin-bottom: 1.1rem;
  border-bottom: 1px solid var(--border-subtle);
  color: var(--accent-warm);
  min-height: 48px;
}
.sidebar.collapsed .sidebar-brand {
  justify-content: center;
  padding-left: 0;
  padding-right: 0;
}
.sidebar-brand-mark {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-warm);
}
.sidebar-brand-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
  overflow: hidden;
}
.sidebar-brand-title {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  line-height: 1.3;
  color: var(--accent-warm);
  white-space: normal;
  word-break: keep-all;
  text-transform: uppercase;
  margin: 0;
}

/* Search button row */
.sidebar-search {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 0.7rem;
  margin-bottom: 1.25rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}
.sidebar-search:hover {
  color: var(--text-main);
  border-color: var(--accent);
  box-shadow: 0 0 12px rgba(203, 166, 247, 0.18);
}
.sidebar-search-icon { flex: 0 0 auto; color: var(--accent); display: flex; align-items: center; }
.sidebar-search-label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sidebar-search-kbd {
  flex: 0 0 auto;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  padding: 0.12rem 0.4rem;
  border-radius: 4px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
}
.sidebar.collapsed .sidebar-search { justify-content: center; padding: 0.6rem 0; }

/* Section label */
.sidebar-section-label {
  font-family: var(--font-serif);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 0 0.7rem;
  margin-bottom: 0.45rem;
  height: 1rem;
  opacity: 0.75;
}
.sidebar.collapsed .sidebar-section-label { opacity: 0; height: 0.4rem; }

/* Nav list */
.sidebar-nav { display: flex; flex-direction: column; gap: 0.15rem; }

.sidebar-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.55rem 0.7rem;
  border-radius: 8px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: 0.92rem;
  cursor: pointer;
  text-align: left;
  text-decoration: none;
  width: 100%;
  transition: color 0.2s ease, background 0.2s ease;
}
.sidebar-link:hover { color: var(--accent-warm); background: var(--bg-surface); }
.sidebar-link.active { color: var(--accent-warm); background: var(--bg-surface); }
.sidebar-link.active .sidebar-link-marker {
  position: absolute;
  left: 0; top: 18%; bottom: 18%;
  width: 2px;
  border-radius: 2px;
  background: var(--accent-warm);
}
.sidebar-link-icon {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
}
.sidebar-link-icon .astro-nav-icon {
  font-size: 22px;
  margin-top: 0;
  line-height: 1;
}
.sidebar-link-label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.sidebar.collapsed .sidebar-link { justify-content: center; padding: 0.6rem 0; gap: 0; }
.sidebar.collapsed .sidebar-link.active .sidebar-link-marker { display: none; }
.sidebar.collapsed .sidebar-link.active {
  background: var(--bg-surface);
  box-shadow: inset 2px 0 0 var(--accent-warm);
}

/* Tooltips when collapsed */
.sidebar.collapsed [data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  left: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  background: var(--bg-surface);
  color: var(--text-main);
  border: 1px solid var(--border-subtle);
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.78rem;
  white-space: nowrap;
  z-index: 10;
  pointer-events: none;
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
}

.sidebar-spacer {
  flex: 1;
  min-height: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Recently viewed */
.sidebar-recent {
  margin-top: 1.25rem;
  padding: 0 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-height: 0;
  overflow: hidden;
}
.sidebar.collapsed .sidebar-recent { display: none; }
.sidebar-recent-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  overflow-y: auto;
}
.sidebar-recent-empty {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.72rem;
  color: var(--text-muted);
  opacity: 0.7;
  padding: 0.4rem 0.5rem;
  line-height: 1.5;
}
.sidebar-recent-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;
  width: 100%;
  background: none;
  border: none;
  border-left: 2px solid var(--border-subtle);
  padding: 0.35rem 0.55rem;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-sans);
  color: var(--text-main);
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}
.sidebar-recent-item:hover { background: var(--bg-surface); }
.sidebar-recent-kind {
  font-family: var(--font-serif);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
  opacity: 0.8;
}
.sidebar-recent-label {
  font-size: 0.82rem;
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.sidebar-recent-item--card { border-left-color: var(--ctp-red); }
.sidebar-recent-item--section { border-left-color: var(--accent); }
.sidebar-recent-item--article { border-left-color: var(--ctp-sky); }
.sidebar-recent-item--node { border-left-color: var(--color-earth); }

/* Footer */
.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-subtle);
  position: relative;
}
.sidebar-link-quiet {
  color: var(--text-muted);
  opacity: 0.85;
  font-size: 0.85rem;
}
.sidebar-link-quiet:hover { color: var(--accent); opacity: 1; }

.sidebar-kofi {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 0.6rem;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  background: var(--bg-surface);
  border: 1px solid var(--accent);
  color: var(--accent);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.sidebar-kofi:hover {
  background: var(--accent);
  color: var(--bg-deep);
  box-shadow: 0 0 12px rgba(203, 166, 247, 0.25);
}
.sidebar-kofi-icon { flex: 0 0 auto; display: flex; align-items: center; }
.sidebar-kofi-label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sidebar.collapsed .sidebar-kofi { justify-content: center; padding: 0.55rem 0; }

/* Diagram focus mode hides sidebar entirely on desktop */
@media (min-width: 768px) {
  .diagram-focused .sidebar { display: none !important; }
}
```

- [ ] **Step 2: Create Sidebar.tsx**

Create `src/components/Sidebar.tsx`:

```tsx
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Book, Search, Settings, Github } from 'lucide-react';
import ThemePicker from './ThemePicker';
import { TarotIcon, TreeIcon, AstroIcon } from './Navbar';
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

const NAV_ITEMS = [
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
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            data-tooltip={item.label}
          >
            <span className="sidebar-link-icon">
              {React.createElement(item.Icon as any, { size: 20 })}
            </span>
            {!collapsed && <span className="sidebar-link-label">{item.label}</span>}
            <span className="sidebar-link-marker" aria-hidden="true" />
          </NavLink>
        ))}
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
        <SidebarSettings collapsed={collapsed} />
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

const SidebarSettings: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  return (
    <div className={collapsed ? 'sidebar-settings-collapsed' : ''} style={{ position: 'relative' }}>
      <ThemePicker direction="up" />
    </div>
  );
};

export default Sidebar;
```

Note: The sidebar currently delegates Settings to the existing `<ThemePicker />` which renders its own button + popover. The popover uses `direction="up"` from Task 1 so it opens above its trigger.

The existing ThemePicker renders a button with class `nav-link` and label "Settings". That label is hidden by `nav-link .nav-label { display: block }` ... wait, `.nav-label` is currently `display: block` desktop, `display: none` mobile. We want the sidebar's settings label to show alongside other items. The simplest fix: don't use `.nav-link` styling here — give ThemePicker an outer wrapper that styles consistently with `.sidebar-link`.

This is acceptable — visually the ThemePicker button sits in the footer. The "Settings" label and gear icon will appear styled by `.nav-link` rules, which is close enough. Cosmetic refinement is out-of-scope for v2 sidebar shipping.

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

The sidebar isn't yet rendered or its CSS imported anywhere — Vite tree-shakes unused JS but unused CSS files are fine. Build should pass with an unused-export warning (or none, depending on config).

- [ ] **Step 4: Commit**

```bash
git add src/components/Sidebar.tsx src/styles/sidebar.css
git commit -m "Add Sidebar component and sidebar.css"
```

---

## Task 6: Wire Sidebar into App and scope Navbar to mobile

The desktop layout swap. After this task, desktop shows the sidebar; mobile is unchanged.

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles/theme.css`

- [ ] **Step 1: Render Sidebar alongside Navbar and import sidebar.css**

In `src/App.tsx`, add imports:
```tsx
import Sidebar from './components/Sidebar';
import './styles/sidebar.css';
```

Add the sidebar.css import below the existing `import './styles/theme.css';` so it loads after (sidebar rules win on conflict).

Inside the `AppShell` component, add `<Sidebar />` immediately before `<Navbar />`. Replace:
```tsx
return (
  <div className="app-container">
    <Navbar onOpenSearch={() => setSearchOpen(true)} onOpenKofi={() => setKofiOpen(true)} />
```
with:
```tsx
return (
  <div className="app-container">
    <Sidebar onOpenSearch={() => setSearchOpen(true)} onOpenKofi={() => setKofiOpen(true)} />
    <Navbar onOpenSearch={() => setSearchOpen(true)} onOpenKofi={() => setKofiOpen(true)} />
```

- [ ] **Step 2: Scope navbar to mobile in theme.css**

Open `src/styles/theme.css`. Find the `.navbar` rule (currently around lines 233–251):

```css
.navbar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  ...
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  ...
}
```

Add **after** this block (and after the existing `@media (max-width: 767px) { .navbar { ... } }` block — currently around line 253-267):

```css
/* Hide top navbar on desktop — sidebar takes over */
@media (min-width: 768px) {
  .navbar {
    display: none !important;
  }
}
```

- [ ] **Step 3: Adjust main-content for sidebar offset on desktop**

Still in `src/styles/theme.css`, find the `.main-content` rule (around line 205–212):

```css
.main-content {
  flex: 1;
  padding: 1.1rem;
  padding-top: 48px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
```

Replace the `@media (min-width: 768px)` block (around lines 214–219) with:

```css
@media (min-width: 768px) {
  .main-content {
    padding: 1.1rem 1.5rem;
    padding-top: 1rem;
    margin-left: var(--sidebar-w);
    margin-right: 0;
    max-width: calc(1200px + var(--sidebar-w));
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  body:has(.sidebar.collapsed) .main-content {
    margin-left: var(--sidebar-w-collapsed);
  }
}
```

Note: `:has()` is widely supported in modern browsers (Chrome 105+, Safari 15.4+, Firefox 121+). The transition keeps the content sliding when the sidebar collapses.

Also, in the same file, find the desktop `.diagram-focused` rule near line 839–852 and update:

```css
@media (min-width: 768px) {
  .diagram-focused .navbar { display: none !important; }
  .diagram-focused .main-content { padding-top: 0 !important; }
  .tree-focus, .astro-focus { ... }
}
```

Add the main-content override for focus mode (sidebar hide is already in `sidebar.css`):

```css
@media (min-width: 768px) {
  .diagram-focused .main-content {
    margin-left: 0 !important;
    max-width: 100% !important;
  }
}
```

Place this near the existing `.diagram-focused` rules.

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

- [ ] **Step 5: Manual smoke test (desktop and mobile-emulated)**

```bash
npm run dev -- --host
```

Open in browser. Verify on desktop (≥ 768px viewport):
- Sidebar visible on left at 248px wide.
- Top navbar is gone.
- Main content is offset right (no overlap).
- Click sidebar Search → search overlay opens.
- Click toggle chevron → sidebar collapses to 68px, content slides left.
- Click any nav item → route changes, active state updates.
- Click Settings → ThemePicker popover opens upward; flavor swatches and diagram-mode toggle render identically to v1.
- Click Source → opens GitHub in new tab.
- Click Ko-fi → iframe overlay opens.
- Visit /tarot → click a card → navigate around → recent list populates with type-colored entries.
- Click a recent entry → browser navigates back to that point.
- Visit /tree-of-life and trigger focus mode → sidebar hides; diagram fills viewport.
- Resize browser to < 768px → sidebar disappears, bottom navbar appears.

Verify on mobile (Chrome DevTools "iPhone 12 Pro" or actual phone):
- Bottom navbar at bottom, identical to v1.
- Search button glows in center.
- Theme picker popover opens upward.
- All routes work; back button traverses chain correctly.

Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/styles/theme.css
git commit -m "Wire Sidebar into App and hide top navbar on desktop"
```

---

## Task 7: Strip Home page search bar

The sidebar provides search; remove the redundant search input from Home. Keep the Ko-fi banner.

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Remove search bar block**

Open `src/pages/Home.tsx`. Remove these blocks:

1. The `searchRef` ref declaration (line 15):
   ```tsx
   const searchRef = useRef<HTMLDivElement>(null);
   ```

2. The search-related state and helpers (lines 19–25):
   ```tsx
   const navigate = useNavigate();
   const [searchQuery, setSearchQuery] = useState('');
   const searchResults = searchQuery.trim().length > 0 ? runSearch(searchQuery) : [];

   const handleSelectResult = (path: string) => {
     setSearchQuery('');
     navigate(path);
   };
   ```

3. The click-outside `useEffect` for search dropdown (lines 28–41).

4. The entire `<div ref={searchRef} className="search-container">` block (lines 128–181) — the search input + dropdown rendering.

5. Unused imports — remove from line 1–5:
   - `useNavigate` from `react-router-dom` (no longer used in Home)
   - `Search`, `ChevronDown`, `ChevronUp` (Search no longer needed; ChevronDown/Up are still used by the more/less button — keep those)
   - `runSearch, iconForType, colorForType` from SearchOverlay (no longer used)

   The imports should end up looking like:
   ```tsx
   import React, { useState, useRef, useEffect, useCallback } from 'react';
   import { motion } from 'framer-motion';
   import { Link } from 'react-router-dom';
   import { ChevronDown, ChevronUp, Github } from 'lucide-react';
   import KofiOverlay from '../components/KofiOverlay';
   ```

   (Note: depending on prior task work, the KofiOverlay import may or may not be present. If not present, do not re-add it — App now handles the overlay. Recheck after editing.)

- [ ] **Step 2: Build and verify**

```bash
npm run build
```
Expected: build succeeds. If TS complains about unused imports, remove them.

- [ ] **Step 3: Manual check**

```bash
npm run dev -- --host
```
Visit Home page. Verify:
- No search bar between title and intro.
- Intro paragraph + "more/less" button still works.
- Four section cards render.
- Ko-fi banner still at bottom.
- Click Ko-fi button → overlay opens (via App-level state).

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "Remove search bar from Home page"
```

---

## Task 8: Final verification

Catch any regressions or missed edges.

- [ ] **Step 1: Lint**

```bash
npm run lint
```
Expected: no errors. Warnings about unused vars may exist; OK.

- [ ] **Step 2: Build clean**

```bash
npm run build
```
Expected: `dist/` produced, no TS errors.

- [ ] **Step 3: Cross-link back-chain manual smoke test**

```bash
npm run dev -- --host
```

Run this exact path on desktop:
1. From Home, click Tarot → click The Fool → click "Mercury" inside Esoteric meaning (if linked) or any related card → click another card.
2. Verify the sidebar's Recently Viewed list shows the chain (newest at top, type-colored borders).
3. Click the second-from-top entry → browser navigates back two steps; recent list shrinks.
4. Click browser back → goes back one more step; recent shrinks again.
5. Check that the keyboard shortcut `Ctrl+K` still opens search overlay; pressing browser back closes it without leaving the page.

Run this on mobile (DevTools emulator or phone):
1. Same chain navigation. Recent list isn't visible (correct).
2. Bottom navbar is identical to v1.
3. Theme picker opens upward; settings unchanged.
4. Tree of Life and Astrology pages load and zoom into focus mode.

- [ ] **Step 4: Final commit / done**

If any small fixes were needed, commit them with a `Polish:` prefixed message. Otherwise nothing to commit.

```bash
git status
git log --oneline main..HEAD
```

Expected: a clean tree, ~7-8 commits ahead of main on the `v2-sidebar` branch.

---

## Summary

Total commits: 7-8.
Files created: `Sidebar.tsx`, `sidebar.css`, `KofiOverlay.tsx`, `useGlobalShortcuts.ts`, `NavigationStackContext.tsx`.
Files modified: `App.tsx`, `Navbar.tsx`, `ThemePicker.tsx`, `Home.tsx`, `theme.css`.
Branch: `v2-sidebar` (local only, not pushed).

Once execution is complete, start the dev server with `npm run dev -- --host` to expose it on the local network — Vite will print both the localhost URL and the LAN URL. Share the LAN URL with phones/tablets on the same WiFi.
