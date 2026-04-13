<div align="center">

# <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/> Thoth Tarot Handbook <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>

<p>
  <a href="#"><img src="https://img.shields.io/badge/React_19-1e1e2e?style=for-the-badge&logo=react&logoColor=89b4fa" alt="React 19"/></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-1e1e2e?style=for-the-badge&logo=typescript&logoColor=89b4fa" alt="TypeScript"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Vite_7-1e1e2e?style=for-the-badge&logo=vite&logoColor=a6e3a1" alt="Vite 7"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Catppuccin-1e1e2e?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iI2NiYTZmNyIvPjwvc3ZnPg==&logoColor=cba6f7" alt="Catppuccin"/></a>
</p>

<p><em>An interactive, open-source encyclopedia of the Thoth Tarot system.</em></p>

<p>
  <a href="https://toth.jakub.computer"><img src="https://img.shields.io/badge/Live_App-toth.jakub.computer-cba6f7?style=flat-square&labelColor=1e1e2e" alt="Live App"/></a>
  <img src="https://img.shields.io/badge/license-MIT-cba6f7?style=flat-square&labelColor=1e1e2e" alt="License"/>
  <img src="https://img.shields.io/badge/PRs-welcome-a6e3a1?style=flat-square&labelColor=1e1e2e" alt="PRs Welcome"/>
</p>

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/G2G4104TZU)

</div>

---

<div align="center">
<table>
<tr>
<td>

**The Thoth Tarot is not a standalone system** — it is the meeting point of three ancient traditions. The **78 cards** are mapped onto the **Kabbalistic Tree of Life**, where the 22 Major Arcana correspond to the 22 paths and the 40 pip cards sit on the 10 Sephiroth. Each card also carries an **astrological** attribution — zodiac signs, planets, and elements — creating a web of correspondences where every symbol illuminates every other. This handbook maps all three systems together, with **Jungian psychological interpretation** as a fourth lens.

</td>
</tr>
</table>
</div>

## <img src="https://img.shields.io/badge/-1e1e2e?style=flat-square" height="1" width="0"/> Features

> [!NOTE]
> Every term, card, sign, and symbol is cross-linked — click anything to explore its connections.

- **Tarot** — All 78 cards (Major Arcana, Court Cards, pip cards) with visual, esoteric, and Jungian descriptions
- **Tree of Life** — Interactive SVG diagram of the 10 Sephiroth and 22 paths with click-to-explore panels
- **Astrology** — Zodiac wheel with decans, elements, qualities, planetary rulerships, and SVG-rendered planet glyphs
- **Library** — Reference articles on history, methods, and foundational knowledge
- **Glossary** — 285+ cross-linked terms with stack-based navigation and auto-linking across all descriptions
- **Search** — `Ctrl+K` instant search across cards, signs, planets, sephiroth, and glossary terms
- **Mobile-first** — Responsive design with auto-detected diagram modes, bottom navbar, and keyboard-aware search

## <img src="https://img.shields.io/badge/-1e1e2e?style=flat-square" height="1" width="0"/> Themes

Three [Catppuccin](https://github.com/catppuccin/catppuccin) dark palettes, switchable from Settings: 🌿 Mocha · 🌺 Macchiato · 🪴 Frappe

## <img src="https://img.shields.io/badge/-1e1e2e?style=flat-square" height="1" width="0"/> Getting Started

```bash
# Clone the repository
git clone https://github.com/ctrlaltjakub/Toth-Tarot-Handbook.git
cd Toth-Tarot-Handbook

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

## <img src="https://img.shields.io/badge/-1e1e2e?style=flat-square" height="1" width="0"/> Tech Stack

| Layer | Technology |
|:------|:-----------|
| Framework | React 19 |
| Language | TypeScript |
| Build | Vite 7 |
| Styling | CSS custom properties + Catppuccin |
| Diagrams | Inline SVG (Tree of Life, Zodiac Wheel) |
| Planet Glyphs | Custom SVG paths (cross-platform consistent) |
| Animations | Framer Motion |
| Routing | React Router |
| Icons | Lucide React + custom SVGs |
| Hosting | Vercel |

## <img src="https://img.shields.io/badge/-1e1e2e?style=flat-square" height="1" width="0"/> Project Structure

```
src/
├── components/     # Reusable UI — diagrams, glossary, navbar, search, planet glyphs
├── contexts/       # Theme provider (palette + diagram mode)
├── data/           # All content — tarot cards, astrology, tree, glossary, library
├── pages/          # Route pages — Home, Tarot, Astrology, TreeOfLife, Library
├── styles/         # Global CSS with Catppuccin tokens
└── utils/          # Auto-glossary linker, card auto-linker, symbol formatting
```

## <img src="https://img.shields.io/badge/-1e1e2e?style=flat-square" height="1" width="0"/> License

[MIT](LICENSE) — free to use, modify, and distribute. Just keep the copyright notice.
