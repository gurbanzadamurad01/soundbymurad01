# soundbymurad

Songs by Murad Gurbanzada, straight from [Suno](https://suno.com/@gurbanzademurad45).

- **Songs** page: every public song on the Suno profile, playable through Suno's embed player.
- **Contact** page: email and links.

New songs published on Suno appear automatically: the site loads the live list from
`/api/songs` (a Netlify function in `netlify/functions/songs.mjs`, cached ~10 minutes).
`src/data/songs.json` is a saved copy used as a fallback; it refreshes on every build or with `npm run sync`.

```bash
npm install
npm run dev     # http://localhost:5180
npm run build
```

Edit your name, email and social links in `src/data/site.ts`.
