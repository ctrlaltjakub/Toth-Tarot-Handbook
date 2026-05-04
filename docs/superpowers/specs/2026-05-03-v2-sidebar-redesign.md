# v2 Sidebar Redesign — Design Spec

**Date:** 2026-05-03
**Branch:** `v2-sidebar` (local only, no push until user approves)
**Source design:** Anthropic Claude Design handoff bundle (`Thoth Tarot Handbook.html`)

## Goal

Replace the desktop top navbar with a collapsible left sidebar. Keep the mobile bottom navbar, the v1 settings popover, and every diagram / cross-link / back-navigation behavior exactly as-is.

## Scope summary

**Desktop changes:**
- New `<Sidebar />` component on left side (248px expanded / 68px collapsed).
- Existing top-navbar styling scoped to mobile only.
- Home page: remove the search bar (sidebar has search). Keep the Ko-fi banner.
- New "Recently viewed" list in sidebar = live mirror of back-navigation chain.

**Mobile (≤ 767px) — unchanged:**
- Bottom navbar identical.
- Search overlay identical.
- Diagram pages identical.
- Cross-link back-navigation chain identical (this is a hard requirement).

**Diagram focus mode:**
- Sidebar is hidden via `display: none` in `.diagram-focused` mode on desktop, matching v1's navbar treatment. Diagrams render at full viewport.

**What is NOT changing:**
- Routing, data files, all SVG diagrams (Tree, Zodiac, planet glyphs).
- `ThemeContext.tsx`.
- `ThemePicker.tsx` v1 popover (user explicitly wants this kept; design's `ThemePickerPopover.jsx` is rejected).
- `Navbar.tsx` source — still rendered, hidden on desktop via media query.
- `GlossaryManagerProvider` and modal popovers.
- `SearchOverlay`.

## Architecture

### Layout

```
<App>
  <NavigationStackProvider>     ← new
    <GlossaryManagerProvider>
      <div class="app-shell">
        <Sidebar />              ← new, hidden on mobile via @media
        <Navbar />               ← existing, hidden on desktop via @media
        <main class="main-content">
          <Routes />
        </main>
      </div>
    </GlossaryManagerProvider>
  </NavigationStackProvider>
</App>
```

Desktop layout: `app-shell` is `display: flex`. `Sidebar` is fixed-positioned left column. `main-content` gets `margin-left: var(--sidebar-w)` (transitions to `--sidebar-w-collapsed`).

Mobile layout: `Sidebar` is `display: none`. `Navbar` is fixed bottom (current behavior). `main-content` keeps `padding-bottom: 70px + safe-area-inset-bottom`.

### CSS variables (added to `theme.css`)

```css
:root {
  --sidebar-w: 248px;
  --sidebar-w-collapsed: 68px;
}
```

### File changes

**New files:**
- `src/components/Sidebar.tsx`
- `src/contexts/NavigationStackContext.tsx`
- `src/styles/sidebar.css` (imported from `theme.css`)

**Modified files:**
- `src/App.tsx` — wrap routes in `NavigationStackProvider`, render `<Sidebar />` alongside `<Navbar />`, add `app-shell` class.
- `src/styles/theme.css` — scope existing top-navbar styles to mobile only, add CSS vars, import sidebar.css, adjust `.main-content` desktop padding.
- `src/components/Navbar.tsx` — move global keyboard shortcut hook out (so it works regardless of which nav is on screen).
- `src/components/ThemePicker.tsx` — accept optional `direction: 'down' | 'up'` prop (default down) for sidebar-anchored use.
- `src/pages/Home.tsx` — remove the search bar block. Keep Ko-fi banner.

## Component: `Sidebar.tsx`

### Props

```ts
interface SidebarProps {
  // No props — internally manages collapsed state, reads location, etc.
}
```

### Internal state

```ts
const [collapsed, setCollapsed] = useState(() => 
  localStorage.getItem('thoth-sidebar-collapsed') === '1'
);
const [searchOpen, setSearchOpen] = useState(false);  // bridges to existing SearchOverlay
const [settingsOpen, setSettingsOpen] = useState(false);
```

`collapsed` is persisted to `localStorage['thoth-sidebar-collapsed']` on change.

### Anatomy (top to bottom)

1. **Toggle chevron** — 28px circle hanging at `right: -14px`. Accent-mauve border + color, drop shadow. Rotates 180° between states.
2. **Brand block** — ☉ astrological sun glyph (28px SVG) + "THOTH TAROT HANDBOOK" wordmark in Cinzel uppercase 0.82rem; line-height 1.3 for two-line wrap. Bottom-bordered.
3. **Search row** — full-width button: search icon + "Search" + ⌘K kbd hint. Border, `bg-surface`, hover glow. Opens `SearchOverlay`.
4. **Sections label** — Cinzel "SECTIONS" 0.66rem, hidden when collapsed.
5. **Nav items** — Home / Tarot / Tree of Life / Astrology / Library, each `NavLink` row with icon (reusing `HomeIcon`, `TarotIcon`, `TreeIcon`, Libra glyph for Astrology, `Book`) + label. Active = warm accent text + surface bg + 2px left marker.
6. **Recently viewed** (flex spacer) — see "Back-navigation chain" section. Hidden when collapsed.
7. **Footer** (separated by top border):
   - **Settings** row → opens v1 `ThemePicker` popover with `direction="up"`.
   - **Source** quiet link → `https://github.com/ctrlaltjakub/Toth-Tarot-Handbook`.
   - **Ko-fi** button → distinct mauve-bordered. Opens the same Ko-fi iframe overlay used by the Home banner. **Lift the overlay JSX out of `Home.tsx`** into a new `src/components/KofiOverlay.tsx` (controlled by `kofiOpen` prop). Mount it in `App.tsx` so both the Sidebar button and the Home banner button can trigger it; `kofiOpen` state lives in App.

### Collapsed state (68px rail)

- Only icons visible. Brand text, search label/kbd, "Sections" label, recent list, settings/source/ko-fi labels all hidden.
- Native `data-tooltip` CSS on hover.
- Active marker becomes `inset 2px 0 0 accent-warm` shadow.

### Astro icon

The Libra glyph (♎︎) is currently rendered with `.astro-nav-icon` font sizing in `Navbar.tsx`. Reuse the existing class — it works at sidebar sizes too.

### Settings popover anchoring

Reuses v1 `ThemePicker.tsx` unchanged in behavior. New optional prop:

```ts
interface ThemePickerProps {
  direction?: 'down' | 'up';   // default 'down'
}
```

In sidebar, render with `direction="up"` so the popover opens above the Settings row (sidebar-bottom anchored).

### Keyboard shortcuts

`Ctrl/⌘+K` and `/` currently live in `Navbar.tsx`. Move them to a small `useGlobalShortcuts` hook called from `App.tsx`, so the shortcut works regardless of which nav is rendered. The `searchOpen` state moves up too — opt: keep it inside Sidebar/Navbar each, OR lift to App. Lifting to App keeps it as one piece of state; cleaner. Decision: **lift to App**.

## Context: `NavigationStackContext.tsx`

### State shape

```ts
type NavKind = 'section' | 'card' | 'article' | 'node';

interface NavEntry {
  pathname: string;
  search: string;        // for tree/astrology query-deeplinks
  label: string;
  kind: NavKind;
}

interface NavigationStackValue {
  stack: NavEntry[];     // ordered, oldest-first; current location is last
  goBackTo: (index: number) => void;  // navigate(-(stack.length - 1 - index))
}
```

### Maintenance logic

Inside provider, listen via `useLocation()` + `useNavigationType()`:

```
on every location change:
  navType = useNavigationType()
  newEntry = makeEntry(location)
  
  if navType === "PUSH":
    stack.push(newEntry)
  
  else if navType === "POP":
    if stack[length - 2]?.pathname === location.pathname &&
       stack[length - 2]?.search === location.search:
      // user pressed Back
      stack.pop()
    else:
      // forward-after-back, or POP to a non-adjacent entry — push fresh
      stack.push(newEntry)
  
  else if navType === "REPLACE":
    stack[length - 1] = newEntry

  cap stack at 30 entries (oldest dropped) — guard against runaway growth
```

`makeEntry(location)` calls `routeToLabel(location)` to fill in label + kind.

### Label resolver

```ts
function routeToLabel(location): { label, kind }
```

- `/` → `{ label: 'Home', kind: 'section' }`
- `/tarot` → `{ label: 'Tarot', kind: 'section' }`
- `/tarot/:id` → look up `tarotData.find(c => c.id === id)?.name ?? 'Card'`, kind `card`
- `/tree-of-life` → `{ label: 'Tree of Life', kind: 'section' }`
- `/tree-of-life?view=sephirah&id=N` → look up sephirah by number, kind `node`
- `/tree-of-life?view=path&id=N` → look up path's card name or "Path N", kind `node`
- `/astrology` → `{ label: 'Astrology', kind: 'section' }`
- `/astrology?view=sign&id=X` → sign name, kind `node` (if such deep links exist)
- `/library` → `{ label: 'Library', kind: 'section' }`
- `/library/:id` → libraryData lookup, kind `article`
- `/impressum` → `{ label: 'Impressum', kind: 'section' }`

Resolver imports from `tarotData.ts`, `treeOfLifeData.ts`, `libraryData.ts`. (Cheap — these are already in the app bundle.)

### Hook

```ts
function useNavigationStack(): {
  recent: NavEntry[];          // stack minus the current (last) entry, reversed
  goBackTo: (index: number) => void;
}
```

`recent` is what the Sidebar renders. It's empty when `stack.length <= 1` (only the home/current page).

### Sidebar consumption

```tsx
const { recent, goBackTo } = useNavigationStack();
// renders up to 10 items
recent.slice(0, 10).map((entry, i) => (
  <button class={`sidebar-recent-item sidebar-recent-item--${entry.kind}`}
          onClick={() => goBackTo(stack.length - 1 - i - 1)}>
    <span class="sidebar-recent-kind">{kindLabel(entry.kind)}</span>
    <span class="sidebar-recent-label">{entry.label}</span>
  </button>
))
```

(Index math will be encapsulated inside `goBackTo` so the consumer just passes the displayed index.)

### Border color mapping

- `card` → `var(--ctp-red)`
- `section` → `var(--accent)` (mauve)
- `article` → `var(--ctp-sky)`
- `node` → `var(--color-earth)` (green)

### Empty state

When `recent.length === 0`, render the design's italic placeholder: *"Cards and pages you visit will appear here."*

## Home page changes

In `src/pages/Home.tsx`:

1. **Remove** the entire `<div ref={searchRef} className="search-container">` block (the search input + dropdown). Roughly lines 128–181.
2. **Remove** the related `searchQuery`, `searchResults`, `handleSelectResult`, click-outside hook for search.
3. **Keep** the H1, the "Why an interactive handbook?" intro paragraph, the four section cards, AND the Ko-fi banner + overlay.

Title size and spacing left as-is (don't get into the design's H1-tweaking rabbit hole).

## CSS scope changes (in `theme.css`)

Wrap existing top-navbar desktop rules in mobile media query:

```css
/* Top-navbar styling now mobile-only */
@media (max-width: 767px) {
  .navbar { /* current top/bottom positioning rules */ }
}
```

The current file already has `@media (max-width: 767px)` for navbar bottom positioning; I'll merge the desktop rules under it (currently navbar is `position: fixed; top: 0` by default, then mobile overrides). New approach: navbar is hidden on desktop, only renders on mobile.

`.main-content` desktop padding-top removed (no top navbar to clear). Replace with `margin-left: var(--sidebar-w)` on the parent container (`.app-shell-main` wrapper) instead of on `.main-content` itself, to preserve the existing centered max-width layout.

## Diagram focus mode

Existing rule:
```css
@media (min-width: 768px) {
  .diagram-focused .navbar { display: none !important; }
}
```

Add equivalent:
```css
@media (min-width: 768px) {
  .diagram-focused .sidebar { display: none !important; }
  .diagram-focused .app-shell-main { margin-left: 0 !important; }
}
```

Mobile diagram focus mode unchanged.

## Edge cases & decisions

- **Initial sidebar state on first visit:** **expanded**. Discoverability matters; users see labels and the recent list. Persisted state takes over on subsequent loads.
- **Sidebar width transition:** `0.3s cubic-bezier(0.4, 0, 0.2, 1)` on width, padding, margin-left.
- **Tooltips when collapsed:** CSS-only via `[data-tooltip]:hover::after`. No portal needed.
- **Ko-fi sidebar button vs Home banner:** Both exist. Sidebar button is small/persistent; Home banner is the prominent CTA. Both use the same iframe overlay.
- **Browser back chain:** `navigate(-N)` is the only navigation primitive used, so the chain semantics are preserved. The new `NavigationStackContext` is purely observational — it never injects entries.
- **Stack growth bound:** capped at 30 internal entries; visible capped at 10. Prevents memory grow on long sessions.
- **Mobile back chain:** the chain is still tracked in context (cheap), just not rendered. Mobile back buttons (browser, gesture, app's `back-button`) all use `navigate(-1)` and are unaffected.

## Out of scope (explicit YAGNI)

- Glossary-term tracking in recent list (modals not in route history).
- Drag-to-resize sidebar.
- Sidebar themes / customization.
- Recent-list filtering or grouping.
- Mobile sidebar drawer.

## Risk register

| Risk | Mitigation |
|---|---|
| Mobile navbar accidentally broken by CSS scope changes | Don't touch any rule inside `@media (max-width: 767px)`; only modify default + min-width 768px rules. |
| Settings popover positioning breaks when anchored from sidebar bottom | New `direction="up"` prop only changes positioning math; existing dropdown content unchanged. |
| Diagram focus mode breaks because sidebar takes horizontal space | Explicit `display: none` rule in `.diagram-focused .sidebar`, matching navbar treatment. |
| Back-chain context has off-by-one in goBackTo | Cover with manual click-test in implementation; encapsulate index math inside hook. |
| `useNavigationType` returning unexpected values for HashRouter / future router changes | Project uses `BrowserRouter`; check explicitly. Worst case, fall back to pure pathname comparison. |
| Existing keyboard shortcuts break when moved out of Navbar | Move atomically to `useGlobalShortcuts` hook called from App; verify Ctrl+K still opens overlay on both desktop and mobile. |

## Acceptance criteria

1. On desktop ≥ 768px, top navbar is gone; sidebar visible at left.
2. On mobile ≤ 767px, bottom navbar is identical to v1; no sidebar visible.
3. Sidebar collapse toggle works; state persists across reload.
4. Search button + Ctrl+K both open the existing SearchOverlay on both layouts.
5. Settings popover from sidebar Settings row shows v1 popover content (3 flavors + diagram-mode toggle + Catppuccin link + Impressum link).
6. Cross-clicking through cards / signs / sephiroth / library articles still allows pressing Back N times to retrace; the recent-list reflects this chain in real time.
7. Tree of Life and Zodiac wheel diagrams render unchanged; focus mode hides sidebar entirely.
8. Home page no longer has search bar; Ko-fi banner remains.
9. Recently-viewed entries are colored by kind (card=red, section=mauve, article=sky, node=green).
10. Clicking a recent entry rewinds browser history to that point (preserves Back semantics).
