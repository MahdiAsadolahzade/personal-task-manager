// public/sw.js
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  
  self.addEventListener('activate', event => {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(windowClients => {
        windowClients.forEach(client => {
          client.postMessage({ type: 'APP_UPDATED' });
        });
      })
    );
  });
  
  self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'refresh') {
      // Tell the page to refresh
      event.waitUntil(
        clients.matchAll({ type: 'window' }).then(clients => {
          if (clients && clients.length) {
            clients.forEach(client => {
              client.postMessage({
                action: 'notificationclick',
                notificationAction: event.action
              });
            });
          }
        })
      );
    }
  });


//   const PRECACHE_URLS = [
//     '/', // home page
//     '/tasks',
//     '/configuration',
//     '/settings',
//   ];
  
//   // Install event: Cache all core pages
//   self.addEventListener('install', (event) => {
//     event.waitUntil(
//       caches.open('static-cache-v1').then((cache) => {
//         return cache.addAll(PRECACHE_URLS);
//       })
//     );
//     self.skipWaiting(); // Ensure immediate activation
//   });
  
//   // Activate event
//   self.addEventListener('activate', (event) => {
//     event.waitUntil(
//       clients.matchAll({ type: 'window' }).then(windowClients => {
//         windowClients.forEach(client => {
//           client.postMessage({ type: 'APP_UPDATED' });
//         });
//       })
//     );
//     self.clients.claim(); // Take control immediately
//   });
  