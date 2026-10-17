// Offline support for the installed site: the app shell is cached, the song list is
// network-first (so new Suno songs show up) with the last copy as a fallback.
const CACHE = 'soundbymurad-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['/', '/manifest.webmanifest', '/icons/icon-192.png'])));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;

  const networkFirst = e.request.mode === 'navigate' || url.pathname === '/api/songs';
  if (networkFirst) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request.mode === 'navigate' ? '/' : e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request.mode === 'navigate' ? '/' : e.request)),
    );
  } else if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/icons/')) {
    // Hashed build files never change: cache-first.
    e.respondWith(
      caches.match(e.request).then(
        (hit) =>
          hit ||
          fetch(e.request).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
            return res;
          }),
      ),
    );
  }
});
