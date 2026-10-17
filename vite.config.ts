import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fetchSunoSongs } from './shared/suno.mjs';

// Serves /api/songs during `npm run dev`, same as the Vercel function does in production.
const songsApi = (): Plugin => ({
  name: 'songs-api',
  configureServer(server) {
    server.middlewares.use('/api/songs', async (_req, res) => {
      try {
        const songs = await fetchSunoSongs();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(songs));
      } catch (err) {
        res.statusCode = 502;
        res.end(JSON.stringify({ error: String(err) }));
      }
    });
  },
});

export default defineConfig({
  plugins: [react(), songsApi()],
  server: { port: 5180 },
});
