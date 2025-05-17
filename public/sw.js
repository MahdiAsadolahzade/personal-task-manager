
const CACHE_NAME = "ptm-cache-v-1.0.0"; 

const URLS_TO_CACHE = [
  "/",
  "/manifest.json",
  "/icons/icon-192x192.png",
  // Add other critical assets and routes here
];

// On install — cache core files
self.addEventListener("install", (event) => {
  console.log("[SW] Install event");
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// On activate — clean old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activate event");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("[SW] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

// Intercept fetch requests
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => cachedResponse); // Fallback to cache if offline

      return cachedResponse || fetchPromise;
    })
  );
});

// Optional: Handle notification click
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  // Send message to client
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage("reload-app");
    });
  });
});
