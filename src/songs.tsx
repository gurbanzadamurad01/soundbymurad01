import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { savedSongs, type Song } from './data/songs';

// Starts with the saved copy so the page renders instantly, then swaps in the live list from
// /api/songs (Netlify function → Suno). New Suno songs appear here without a redeploy.
const SongsContext = createContext<Song[]>(savedSongs);

export function SongsProvider({ children }: { children: ReactNode }) {
  const [songs, setSongs] = useState<Song[]>(savedSongs);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch('/api/songs', { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((live: Song[]) => {
        if (Array.isArray(live) && live.length) setSongs(live);
      })
      .catch(() => {
        /* offline or Suno down — keep the saved copy */
      });
    return () => ctrl.abort();
  }, []);

  return <SongsContext.Provider value={songs}>{children}</SongsContext.Provider>;
}

export const useSongs = () => useContext(SongsContext);
