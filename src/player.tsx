import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { Song } from './data/songs';
import { useSongs } from './songs';

// Playback happens inside Suno's official embed (see PlayerBar), so the app only
// tracks which song is open; Suno's player handles play/pause and the timeline.
type PlayerState = {
  current: Song | null;
  play: (song: Song) => void;
  next: () => void;
  prev: () => void;
  close: () => void;
};

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const songs = useSongs();
  const [current, setCurrent] = useState<Song | null>(null);

  const step = useCallback(
    (dir: 1 | -1) => {
      const i = current ? songs.findIndex((s) => s.id === current.id) : -1;
      setCurrent(songs[(i + dir + songs.length) % songs.length]);
    },
    [current, songs],
  );

  return (
    <PlayerContext.Provider
      value={{ current, play: setCurrent, next: () => step(1), prev: () => step(-1), close: () => setCurrent(null) }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
}
