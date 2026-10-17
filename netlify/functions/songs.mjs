// Live song list for the app: GET /api/songs (routed here in netlify.toml)
// Netlify's CDN keeps the answer for 10 minutes, so a new Suno song shows up within ~10 minutes
// without anyone redeploying the site.
import { fetchSunoSongs } from '../../shared/suno.mjs';

export default async () => {
  try {
    const songs = await fetchSunoSongs();
    return Response.json(songs, {
      headers: {
        'Cache-Control': 'public, max-age=60',
        'Netlify-CDN-Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
};
