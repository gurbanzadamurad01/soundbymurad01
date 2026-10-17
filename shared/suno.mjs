// Reads every public song from a Suno profile and turns it into the shape the app uses.
// Shared by the Netlify function (live list), the Vite dev server and `npm run sync` (saved copy).

export const SUNO_HANDLE = 'gurbanzademurad45';

const API = 'https://studio-api-prod.suno.com/api/profiles';

// Suno doesn't flag every song itself, so obvious titles get the E tag too.
const EXPLICIT_WORDS = /\b(fuck|shit|bitch)\b/i;

const titleCase = (g) =>
  g
    .split(/\s+/)
    .map((w) => w.split('-').map((p) => (p === p.toLowerCase() ? p.charAt(0).toUpperCase() + p.slice(1) : p)).join('-'))
    .join(' ');

function category(genre) {
  const g = genre.toLowerCase();
  if (!g) return 'Other';
  if (['hip', 'rap', 'trap', 'drill', 'boom bap'].some((k) => g.includes(k))) return 'Hip-Hop';
  if (['r&b', 'uk bass', 'jersey', 'electronic'].some((k) => g.includes(k))) return 'Electronic & R&B';
  if (['rock', 'grunge', 'metal', 'folk'].some((k) => g.includes(k))) return 'Rock';
  if (['pop', 'disko'].some((k) => g.includes(k))) return 'Pop';
  return 'Other';
}

function toSong(c) {
  const title = c.title.replace(/^Murad (Gurbanzada|Qurbanzada|Gurbanzade)\s*-\s*/, '').trim();
  const genre = titleCase((c.display_tags || '').split(',')[0].trim());
  const song = {
    id: c.id,
    title,
    genre,
    category: category(genre),
    plays: c.play_count ?? 0,
    model: (c.metadata?.model_badges?.songrow?.display_name || c.major_model_version || '').toLowerCase(),
    duration: Math.round(c.metadata?.duration ?? 0),
    released: (c.created_at || '').slice(0, 10),
  };
  if (c.explicit || EXPLICIT_WORDS.test(title)) song.explicit = true;
  return song;
}

async function fetchPage(handle, page, retries = 2) {
  const res = await fetch(`${API}/${handle}?page=${page}&playlists_sort_by=created_at&clips_sort_by=created_at`, {
    headers: { accept: 'application/json' },
  });
  if (res.ok) return res.json();
  if (retries > 0) {
    await new Promise((r) => setTimeout(r, 700));
    return fetchPage(handle, page, retries - 1);
  }
  throw new Error(`Suno answered ${res.status}`);
}

/** Returns all public, finished songs, newest first. Throws if Suno can't be reached. */
export async function fetchSunoSongs(handle = SUNO_HANDLE) {
  const clips = [];
  for (let page = 1; page <= 50; page++) {
    const data = await fetchPage(handle, page);
    if (!data.clips?.length) break;
    clips.push(...data.clips);
    if (clips.length >= (data.num_total_clips ?? Infinity)) break;
  }

  const seen = new Set();
  return clips
    .filter((c) => c.status === 'complete' && c.is_public !== false && !c.is_trashed && !c.is_hidden)
    .filter((c) => !seen.has(c.id) && seen.add(c.id))
    .map(toSong)
    .sort((a, b) => b.released.localeCompare(a.released));
}
