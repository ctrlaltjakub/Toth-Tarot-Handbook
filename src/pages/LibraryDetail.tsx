import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { articles } from '../data/libraryData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { autoLinkChildren } from '../utils/autoGlossary';

const LibraryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="main-content">
        <h2>Article not found</h2>
        <button onClick={() => navigate(-1)} className="back-button">Back</button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="main-content detail-container"
    >
      <button onClick={() => navigate(-1)} className="back-button">
        <ArrowLeft size={20} /> Back
      </button>

      <div className="card detail-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ color: 'var(--accent-purple)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem' }}>
            {article.category}
          </span>
          <h1 className="detail-title">{article.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{article.summary}</p>
        </div>

        <div className="article-body" style={{ textAlign: 'left' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: () => null, // Already rendered above
              h4: ({node, ...props}) => <h2 style={{marginTop: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem'}} {...props} />,
              p: ({node, children, ...props}: any) => <p style={{lineHeight: '1.8', marginBottom: '1.25rem', fontSize: '1rem'}} {...props}>{autoLinkChildren(children)}</p>,
              strong: ({node, ...props}) => {
                const symbolRegex = /(☿|♀|♂|♃|♄|♅|♆|♇)/g;
                const processText = (text: string) => {
                  const parts = text.split(symbolRegex);
                  if (parts.length === 1) return text;
                  return parts.map((part, i) => {
                    if (part.match(symbolRegex)) {
                      return (
                        <span key={i} style={{ fontSize: '2.0rem', verticalAlign: 'middle', marginRight: '0.2rem', fontWeight: 'normal', display: 'inline-block', lineHeight: '1' }}>
                          {part}
                        </span>
                      );
                    }
                    return part;
                  });
                };

                let newChildren;
                if (Array.isArray(props.children)) {
                  newChildren = props.children.map((child: any, index: number) => {
                    if (typeof child === 'string') return <React.Fragment key={index}>{processText(child)}</React.Fragment>;
                    return child;
                  });
                } else if (typeof props.children === 'string') {
                  newChildren = processText(props.children);
                } else {
                  newChildren = props.children;
                }

                return <strong style={{color: 'var(--accent-gold)'}}>{newChildren}</strong>;
              },
              li: ({node, children, ...props}: any) => <li style={{marginBottom: '0.75rem', lineHeight: '1.6'}} {...props}>{autoLinkChildren(children)}</li>,
              table: ({node, ...props}) => <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem', marginBottom: '1.5rem', backgroundColor: 'var(--bg-card)', display: 'block', overflowX: 'auto' }} {...props} />,
              th: ({node, ...props}) => <th style={{ border: '1px solid var(--border-subtle)', padding: '0.75rem', textAlign: 'left', color: 'var(--accent-warm)', fontFamily: 'var(--font-serif)', backgroundColor: 'var(--bg-surface)', whiteSpace: 'nowrap' }} {...props} />,
              td: ({node, ...props}) => <td style={{ border: '1px solid var(--border-subtle)', padding: '0.75rem', lineHeight: '1.6' }} {...props} />,
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

export default LibraryDetail;
