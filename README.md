# soundbymurad

Songs by Murad Gurbanzada, straight from [Suno](https://suno.com/@gurbanzademurad45). A website and an Android app.

- **Songs** page: every public song on the Suno profile, playable through Suno's embed player.
- **Contact** page: email and links.

## New songs appear automatically

Publish a song on Suno and it shows up without redeploying or updating the app:

- **Website** loads the live list from `/api/songs`, a Vercel function (`api/songs.mjs`) cached ~10 minutes.
- **Android app** asks Suno directly through Capacitor's native HTTP.

`src/data/songs.json` is a saved copy shown instantly and used if Suno can't be reached.
It refreshes on every build, or with `npm run sync`.

## Website

```bash
npm install
npm run dev     # http://localhost:5180
npm run build
```

Hosted on Vercel: import this repo at vercel.com/new. The settings come from `vercel.json`.
On phones the site can also be installed from the browser ("Add to Home Screen").

## Android app

Built with Capacitor from the same code (`android/` folder).

```bash
npm run apk     # → android/app/build/outputs/apk/debug/app-debug.apk
```

`npm run android` copies the latest web build into the app. You can then open `android/` in Android Studio.

Edit your name, email and social links in `src/data/site.ts`.
