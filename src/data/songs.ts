// Songs come straight from https://suno.com/@gurbanzademurad45 — publish on Suno and they appear here.
import savedJson from './songs.json';

export type Category = 'Rock' | 'Hip-Hop' | 'Pop' | 'Electronic & R&B' | 'Other';

export type Song = {
  id: string;
  title: string;
  genre: string;
  category: Category;
  plays: number;
  model: string;
  /** Length in seconds. */
  duration: number;
  /** Release date, YYYY-MM-DD. */
  released: string;
  explicit?: boolean;
};

// Saved copy of the Suno list (refreshed by `npm run sync` and every build). The live list
// from /api/songs replaces it in the browser — see src/songs.tsx.
export const savedSongs = savedJson as Song[];

export const categories: Category[] = ['Rock', 'Hip-Hop', 'Pop', 'Electronic & R&B'];

export const embedUrl = (s: Song) => `https://suno.com/embed/${s.id}`;
export const sunoUrl = (s: Song) => `https://suno.com/song/${s.id}`;
// Suno serves a 360px cover and a 1024px "large" one.
export const coverUrl = (s: Song, size: 'sm' | 'lg' = 'sm') =>
  `https://cdn2.suno.ai/image_${size === 'lg' ? 'large_' : ''}${s.id}.jpeg`;

/** Released in the last 14 days. */
export const isNew = (s: Song) => Date.now() - new Date(s.released).getTime() < 14 * 864e5;

export const formatDuration = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
