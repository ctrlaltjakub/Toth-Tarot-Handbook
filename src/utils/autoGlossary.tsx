import React from 'react';
import { Link } from 'react-router-dom';
import { glossary } from '../data/glossaryData';
import { tarotData } from '../data/tarotData';
import GlossaryTerm from '../components/GlossaryTerm';

// Sorted by length (longest first) to match longer terms before shorter substrings
const sortedTerms = Object.keys(glossary).sort((a, b) => b.length - a.length);

// Build a map of card-name variants → card id, for inline linking
// e.g. "The Hierophant", "Hierophant", "The Hierophant (V)" → '5-the-hierophant'
const cardNameToId = new Map<string, string>();
for (const card of tarotData) {
  const fullName = card.name; // e.g. "The Hierophant"
  cardNameToId.set(fullName, card.id);
  // Also accept the bare name without leading "The"
  if (fullName.startsWith('The ')) {
    cardNameToId.set(fullName.slice(4), card.id);
  }
}

// Sort card names by length (longest first) so "The Hierophant" matches before "Hierophant"
const sortedCardNames = Array.from(cardNameToId.keys()).sort((a, b) => b.length - a.length);

// Combined pattern: card names OR glossary terms
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const termPattern = new RegExp(
  `\\b(${[...sortedCardNames, ...sortedTerms].map(escape).join('|')})\\b`,
  'g'
);

const tarotLinkStyle: React.CSSProperties = {
  color: 'var(--accent-warm)',
  textDecoration: 'underline',
  textDecorationStyle: 'dotted',
  textUnderlineOffset: '2px',
};

/**
 * Takes a string and returns React nodes with glossary terms wrapped in <GlossaryTerm>
 * and card names wrapped in <Link> to the card detail page.
 */
export function autoLinkGlossary(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  // Reset regex state
  termPattern.lastIndex = 0;

  while ((match = termPattern.exec(text)) !== null) {
    const term = match[1];
    const matchIndex = match.index;

    // Add text before this match
    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    // Card name takes priority over glossary term
    const cardId = cardNameToId.get(term);
    if (cardId) {
      nodes.push(
        <Link key={`tc-${key++}`} to={`/tarot/${cardId}`} style={tarotLinkStyle}>
          {term}
        </Link>
      );
    } else {
      nodes.push(<GlossaryTerm key={`gl-${key++}`} term={term} />);
    }

    lastIndex = matchIndex + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

/**
 * Process React children recursively, auto-linking glossary terms in text nodes.
 */
export function autoLinkChildren(children: React.ReactNode): React.ReactNode {
  if (typeof children === 'string') {
    const linked = autoLinkGlossary(children);
    return linked.length === 1 && typeof linked[0] === 'string' ? children : <>{linked}</>;
  }
  if (Array.isArray(children)) {
    return children.map((child, i) => <React.Fragment key={i}>{autoLinkChildren(child)}</React.Fragment>);
  }
  if (React.isValidElement(children) && (children.props as any)?.children) {
    // Don't recurse into GlossaryTerm components (prevent infinite loop)
    if ((children.type as any)?.displayName === 'GlossaryTerm' || (children.type as any) === GlossaryTerm) {
      return children;
    }
    return React.cloneElement(children as React.ReactElement<any>, {
      children: autoLinkChildren((children.props as any).children),
    });
  }
  return children;
}
