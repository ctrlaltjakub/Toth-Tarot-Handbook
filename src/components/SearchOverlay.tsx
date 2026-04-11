import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, Sparkles, BookOpen, GitBranch, Compass } from 'lucide-react';
import { tarotData } from '../data/tarotData';
import { articles } from '../data/libraryData';
import { sephiroth } from '../data/treeOfLifeData';
import { zodiacSigns, planets } from '../data/astrologyData';

interface SearchOverlayProps {
  onClose: () => void;
  initialQuery?: string;
}

export interface SearchResult {
  type: 'card' | 'article' | 'sephirah' | 'sign' | 'planet';
  title: string;
  subtitle: string;
  path: string;
}

// Arabic to Roman numeral mapping for search
const arabicToRoman: Record<string, string> = {
  '0': '0', '1': 'I', '2': 'II', '3': 'III', '4': 'IV', '5': 'V',
  '6': 'VI', '7': 'VII', '8': 'VIII', '9': 'IX', '10': 'X',
  '11': 'XI', '12': 'XII', '13': 'XIII', '14': 'XIV', '15': 'XV',
  '16': 'XVI', '17': 'XVII', '18': 'XVIII', '19': 'XIX', '20': 'XX', '21': 'XXI',
};
const wordToRoman: Record<string, string> = {
  'ace': 'Ace', 'one': 'Ace',
  'two': 'II', 'three': 'III', 'four': 'IV', 'five': 'V',
  'six': 'VI', 'seven': 'VII', 'eight': 'VIII', 'nine': 'IX', 'ten': 'X',
};

export function runSearch(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  if (query.trim().length === 0) return results;
  const q = query.toLowerCase().trim();
  const mappedRoman = arabicToRoman[q];
  const mappedWord = wordToRoman[q];

  tarotData.forEach(card => {
    if (
      card.name.toLowerCase().includes(q) ||
      card.id.toLowerCase().includes(q) ||
      (card.suit && card.suit.toLowerCase().includes(q)) ||
      card.arcana.toLowerCase().includes(q) ||
      (card.astrology && card.astrology.toLowerCase().includes(q)) ||
      (card.hebrewLetter && card.hebrewLetter.toLowerCase().includes(q)) ||
      (card.number && mappedRoman && card.number === mappedRoman) ||
      (card.number && mappedWord && card.number === mappedWord)
    ) {
      results.push({
        type: 'card',
        title: card.number ? `${card.number} — ${card.name}` : card.name,
        subtitle: `${card.arcana}${card.suit ? ` · ${card.suit}` : ''}`,
        path: `/tarot/${card.id}`,
      });
    }
  });

  articles.forEach(article => {
    if (
      article.title.toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'article',
        title: article.title,
        subtitle: article.category,
        path: `/library/${article.id}`,
      });
    }
  });

  sephiroth.forEach(seph => {
    if (
      seph.name.toLowerCase().includes(q) ||
      seph.meaning.toLowerCase().includes(q) ||
      seph.hebrew.includes(q)
    ) {
      results.push({
        type: 'sephirah',
        title: `${seph.number}. ${seph.name}`,
        subtitle: `${seph.meaning} · ${seph.planet}`,
        path: `/tree-of-life?view=sephirah&id=${seph.number}`,
      });
    }
  });

  zodiacSigns.forEach(sign => {
    if (
      sign.name.toLowerCase().includes(q) ||
      sign.element.toLowerCase().includes(q) ||
      sign.ruler.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'sign',
        title: `${sign.glyph} ${sign.name}`,
        subtitle: `${sign.quality} ${sign.element} · Ruler: ${sign.ruler}`,
        path: `/astrology?view=sign&name=${sign.name}`,
      });
    }
  });

  planets.forEach(planet => {
    if (
      planet.name.toLowerCase().includes(q) ||
      planet.sephirah.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'planet',
        title: `${planet.glyph} ${planet.name}`,
        subtitle: `${planet.sephirah} · Rules: ${planet.rules.join(', ')}`,
        path: `/astrology?view=planet&name=${planet.name}`,
      });
    }
  });

  return results;
}

export const iconForType = (type: string) => {
  switch (type) {
    case 'card': return <Sparkles size={16} />;
    case 'article': return <BookOpen size={16} />;
    case 'sephirah': return <GitBranch size={16} />;
    case 'sign': return <Compass size={16} />;
    case 'planet': return <Compass size={16} />;
    default: return null;
  }
};

export const colorForType = (type: string) => {
  switch (type) {
    case 'card': return 'var(--accent-warm)';
    case 'article': return 'var(--color-peach)';
    case 'sephirah': return 'var(--accent)';
    case 'sign': return 'var(--color-sapphire)';
    case 'planet': return 'var(--color-teal)';
    default: return 'var(--text-muted)';
  }
};

const SearchOverlay: React.FC<SearchOverlayProps> = ({ onClose, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    // Move caret to end after focusing
    const len = inputRef.current?.value.length ?? 0;
    inputRef.current?.setSelectionRange(len, len);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const results = runSearch(query);

  const handleSelect = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <>
      <motion.div
        className="tree-detail-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="search-overlay"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="search-overlay-panel">
        <div className="search-overlay-input-row">
          <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search cards, articles, sephiroth..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-overlay-input"
          />
          <button onClick={onClose} className="search-overlay-close">
            <X size={18} />
          </button>
        </div>

        {query.trim().length > 0 && (
          <div className="search-overlay-results">
            {results.length === 0 ? (
              <div className="search-overlay-empty">No results for "{query}"</div>
            ) : (
              results.slice(0, 20).map((r, i) => (
                <button
                  key={`${r.type}-${r.path}-${i}`}
                  className="search-overlay-result"
                  onClick={() => handleSelect(r.path)}
                >
                  <span style={{ color: colorForType(r.type), flexShrink: 0 }}>
                    {iconForType(r.type)}
                  </span>
                  <span className="search-overlay-result-text">
                    <span className="search-overlay-result-title">{r.title}</span>
                    <span className="search-overlay-result-subtitle">{r.subtitle}</span>
                  </span>
                </button>
              ))
            )}
          </div>
        )}
        </div>
      </motion.div>
    </>
  );
};

export default SearchOverlay;
