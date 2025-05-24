
const CACHE_NAME = "ptm-cache-v-1.0.0"; 

const URLS_TO_CACHE = [
  "/",
  "/offline.html",
  "/tasks",
  "/configuration",
  "/settings",
  "/manifest.json",
  "/icons/icon-192x192.png",
  // Add other critical assets and routes here
];

// On install — cache core files
self.addEventListener("install", (event) => {
  console.log("[SW] Install event");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Immediately activate new SW
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activate event");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // Take control of open pages
});


// Intercept fetch requests
self.addEventListener("fetch", (event) => {
  if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith("http")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // If this is a navigation request (HTML page), show offline fallback
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html");
          }
          return cachedResponse;
        });

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
