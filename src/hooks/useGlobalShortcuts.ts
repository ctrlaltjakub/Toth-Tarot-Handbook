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
