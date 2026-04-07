import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Impressum: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="main-content"
    >
      <header className="section-header">
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          <ArrowLeft size={14} /> Home
        </Link>
        <h1>Impressum</h1>
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Angaben nach 5 TMG
        </p>
        {/* Contact info as image — not indexable, searchable, or scrappable */}
        <img
          src="/impressum.png"
          alt=""
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            maxWidth: '220px',
            width: '100%',
            height: 'auto',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>
    </motion.div>
  );
};

export default Impressum;
