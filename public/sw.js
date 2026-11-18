/* Optional progressive enhancement: caches this small site's assets and visited pages. */
const VERSION = 'sinta-v2';
const STATIC = `${VERSION}-static`;
const PAGES = `${VERSION}-pages`;
const SHELL = ['/', '/offline.html', '/icons/favicon.svg'];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(STATIC).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()).catch(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(Promise.all([caches.keys().then((keys) => Promise.all(keys.filter((key) => !key.startsWith(VERSION)).map((key) => caches.delete(key)))), self.clients.claim()]));
});
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then((response) => {
      if (response.ok && response.type === 'basic') {
        const clone = response.clone();
        event.waitUntil(caches.open(PAGES).then((cache) => cache.put(request, clone)));
      }
      return response;
    }).catch(async () => (await caches.match(request)) || (await caches.match('/offline.html'))));
    return;
  }
  if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/photos/') || url.pathname.startsWith('/scenes/') || url.pathname.startsWith('/icons/')) {
    event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      if (response.ok && response.type === 'basic') {
        const clone = response.clone();
        event.waitUntil(caches.open(STATIC).then((cache) => cache.put(request, clone)));
      }
      return response;
    })));
  }
});
