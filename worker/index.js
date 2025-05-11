self.addEventListener('push', function(event) {
    const data = event.data?.json();
  
    const title = data?.title || "Notification";
    const options = {
      body: data?.message || "",
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-72x72.png",
      vibrate: [200, 100, 200],
      data: {
        url: data?.url || '/',
        id: data?.id
      }
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
        const url = event.notification.data?.url || '/';
        for (const client of windowClients) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        return clients.openWindow(url);
      })
    );
  });
  
  self.addEventListener('sync', function(event) {
    // Handle any notification tag starting with "notif-"
    if (event.tag.startsWith('notif-')) {
      event.waitUntil(handleScheduledNotifications());
    }
  });
  
  async function handleScheduledNotifications() {
    const notifications = await getNotificationsFromIndexedDB();
    const now = Date.now();
  
    for (const notif of notifications) {
      if (notif.scheduledTime && new Date(notif.scheduledTime).getTime() <= now) {
        await self.registration.showNotification(notif.title, {
          body: notif.message,
          icon: "/icons/icon-192x192.png",
          badge: "/icons/icon-72x72.png",
        });
        await removeNotificationFromIndexedDB(notif.id);
      }
    }
  }
  
  function getNotificationsFromIndexedDB() {
    return new Promise((resolve) => {
      const request = indexedDB.open("notification-store");
      request.onsuccess = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("notifications")) {
          resolve([]);
          return;
        }
        const tx = db.transaction("notifications", "readonly");
        const store = tx.objectStore("notifications");
        const getAllRequest = store.getAll();
        getAllRequest.onsuccess = () => resolve(getAllRequest.result);
        getAllRequest.onerror = () => resolve([]);
      };
      request.onerror = () => resolve([]);
    });
  }
  
  function removeNotificationFromIndexedDB(id) {
    return new Promise((resolve) => {
      const request = indexedDB.open("notification-store");
      request.onsuccess = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("notifications")) {
          resolve();
          return;
        }
        const tx = db.transaction("notifications", "readwrite");
        const store = tx.objectStore("notifications");
        store.delete(id);
        tx.oncomplete = () => resolve();
      };
      request.onerror = () => resolve();
    });
  }
  

  self.addEventListener('periodicsync', event => {
    if (event.tag === 'my-sync-tag') {
      event.waitUntil(doPeriodicTask());
    }
  });
  
  async function doPeriodicTask() {
    // Fetch API, IndexedDB, cache updates, etc.
    console.log('Running background sync task...');
    // Example: await fetch('/api/sync');
  }
  