// Saves a fresh copy of the Suno song list into src/data/songs.json.
// The app shows this copy instantly and swaps in the live list from /api/songs once it loads,
// so the site still works if Suno is down. Runs before every build; also: `npm run sync`.
import { writeFile } from 'node:fs/promises';
import { fetchSunoSongs } from '../shared/suno.mjs';

const target = new URL('../src/data/songs.json', import.meta.url);

try {
  const songs = await fetchSunoSongs();
  await writeFile(target, JSON.stringify(songs, null, 2) + '\n');
  console.log(`Saved ${songs.length} songs from Suno.`);
} catch (err) {
  // Never block a deploy on Suno: keep the previous copy.
  console.warn(`Could not reach Suno (${err.message}); keeping the saved song list.`);
}
