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