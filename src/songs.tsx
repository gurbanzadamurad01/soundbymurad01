import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Capacitor } from '@capacitor/core';
import { fetchSunoSongs } from '../shared/suno.mjs';
import { savedSongs, type Song } from './data/songs';

// Starts with the saved copy so the page renders instantly, then swaps in the live list, so new
// Suno songs appear without a redeploy or an app update:
// - website: /api/songs (Vercel function → Suno; Suno blocks direct browser requests)
// - Android app: asks Suno directly through Capacitor's native HTTP (capacitor.config.json)
const loadLiveSongs = (signal: AbortSignal): Promise<Song[]> =>
  Capacitor.isNativePlatform()
    ? fetchSunoSongs()
    : fetch('/api/songs', { signal }).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));

const SongsContext = createContext<Song[]>(savedSongs);

export function SongsProvider({ children }: { children: ReactNode }) {
  const [songs, setSongs] = useState<Song[]>(savedSongs);

  useEffect(() => {
    const ctrl = new AbortController();
    loadLiveSongs(ctrl.signal)
      .then((live) => {
        if (!ctrl.signal.aborted && Array.isArray(live) && live.length) setSongs(live);
      })
      .catch(() => {
        /* offline or Suno down — keep the saved copy */
      });
    return () => ctrl.abort();
  }, []);

  return <SongsContext.Provider value={songs}>{children}</SongsContext.Provider>;
}

export const useSongs = () => useContext(SongsContext);
