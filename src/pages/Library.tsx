import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articles } from '../data/libraryData';
import { glossary } from '../data/glossaryData';
import { BookOpen, ChevronRight, Search } from 'lucide-react';
import GlossaryTerm from '../components/GlossaryTerm';

const glossaryEntries = Object.values(glossary).sort((a, b) => a.term.localeCompare(b.term));

// Group glossary by first letter
const glossaryGroups: Record<string, typeof glossaryEntries> = {};
glossaryEntries.forEach(entry => {
  const letter = entry.term[0].toUpperCase();
  if (!glossaryGroups[letter]) glossaryGroups[letter] = [];
  glossaryGroups[letter].push(entry);
});

export const Library: React.FC = () => {
  const [view, setView] = useState<'articles' | 'glossary'>('articles');
  const [glossarySearch, setGlossarySearch] = useState('');

  const filteredGlossary = glossarySearch.trim()
    ? glossaryEntries.filter(e =>
        e.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        e.shortDef.toLowerCase().includes(glossarySearch.toLowerCase())
      )
    : glossaryEntries;

  const filteredGroups: Record<string, typeof glossaryEntries> = {};
  filteredGlossary.forEach(entry => {
    const letter = entry.term[0].toUpperCase();
    if (!filteredGroups[letter]) filteredGroups[letter] = [];
    filteredGroups[letter].push(entry);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="main-content detail-container"
    >
      <header className="section-header">
        <h1>Esoteric Library</h1>
        <div className="tree-toggles" style={{ marginTop: '0.5rem' }}>
          <button className={`tree-toggle ${view === 'articles' ? 'active' : ''}`} onClick={() => setView('articles')}>Articles</button>
          <button className={`tree-toggle ${view === 'glossary' ? 'active' : ''}`} onClick={() => setView('glossary')}>Glossary ({glossaryEntries.length})</button>
        </div>
      </header>

      {view === 'articles' && (
        <div className="card-list">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/library/${article.id}`}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--color-peach)', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {article.category}
                  </span>
                  <BookOpen size={18} color="var(--color-peach)" />
                </div>

                <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>{article.title}</h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '0.5rem', gap: '1rem' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0', flex: 1 }}>
                    {article.summary}
                  </p>
                  <div style={{ color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', flexShrink: 0, marginTop: '0.1rem' }}>
                    Read <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {view === 'glossary' && (
        <div>
          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Filter glossary..."
              value={glossarySearch}
              onChange={e => setGlossarySearch(e.target.value)}
              className="search-input"
              style={{ paddingLeft: '2.5rem', fontSize: '0.9rem', padding: '0.6rem 0.75rem 0.6rem 2.5rem' }}
            />
          </div>

          {/* Glossary entries grouped by letter */}
          {Object.keys(filteredGroups).sort().map(letter => (
            <div key={letter} style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--accent)', fontSize: '1.2rem', margin: '0 0 0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.3rem' }}>
                {letter}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {filteredGroups[letter].map(entry => (
                  <div key={entry.term} style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-card)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <span style={{ color: 'var(--accent-warm)', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.95rem' }}>
                        {entry.term}
                      </span>
                      {entry.link && (
                        <Link to={entry.link} style={{ color: 'var(--accent-lavender)', fontSize: '0.7rem', textDecoration: 'none' }}>
                          See more →
                        </Link>
                      )}
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                      <GlossaryText text={entry.shortDef} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredGlossary.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
              No glossary entries match "{glossarySearch}"
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

// Render glossary text with {Term} references as clickable GlossaryTerms
const GlossaryText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/\{([^}]+)\}/g);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          return <GlossaryTerm key={i} term={part} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};
