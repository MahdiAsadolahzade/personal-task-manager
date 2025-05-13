const PRECACHE_URLS = ['/', '/tasks', '/configuration', '/settings'];
const STATIC_CACHE = 'static-cache-v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    clients.claim().then(() =>
      clients.matchAll({ type: 'window' }).then(windowClients => {
        windowClients.forEach(client => {
          client.postMessage({ type: 'APP_UPDATED' });
        });
      })
    )
  );
});

// Handle fetch and serve from cache if offline
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        return caches.open(STATIC_CACHE).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(() => {
        // Offline fallback (optional)
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      });
    })
  );
});

// Handle skipWaiting from app
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
