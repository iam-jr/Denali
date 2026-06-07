/* Denali Luxury - Service Worker */

const CACHE_NAME = 'denali-cache-v3';
const CORE_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/script.js',
  './img/logodenaliognb.png?v=20260507b',
  './favicon_io/favicon-32x32.png?v=20260507b',
  './favicon_io/favicon-16x16.png?v=20260507b',
  './favicon_io/apple-touch-icon.png?v=20260507b',
  './favicon_io/android-chrome-192x192.png?v=20260507b',
  './favicon_io/android-chrome-512x512.png?v=20260507b'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // For navigation requests, try network first then fallback to cached index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // For static assets, use cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request).then((response) => {
          const respClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, respClone));
          return response;
        }).catch(() => cached)
      );
    })
  );
});
