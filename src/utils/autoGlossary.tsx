import React from 'react';
import { glossary } from '../data/glossaryData';
import GlossaryTerm from '../components/GlossaryTerm';

// Sorted by length (longest first) to match longer terms before shorter substrings
const sortedTerms = Object.keys(glossary).sort((a, b) => b.length - a.length);

// Build a regex that matches any glossary term as a whole word
const termPattern = new RegExp(
  `\\b(${sortedTerms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
  'g'
);

/**
 * Takes a string and returns React nodes with glossary terms wrapped in <GlossaryTerm>.
 * Only processes plain string children — leaves React elements untouched.
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

    // Add the glossary term component
    nodes.push(<GlossaryTerm key={`gl-${key++}`} term={term} />);

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
