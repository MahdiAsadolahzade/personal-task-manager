// worker/index.js
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
        clients.matchAll({type: 'window'}).then(windowClients => {
            const url = event.notification.data?.url || '/';
            for (const client of windowClients) {
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

// Background sync for scheduled notifications
self.addEventListener('sync', function(event) {
    if (event.tag === 'sync-scheduled-notifications') {
        event.waitUntil(
            handleScheduledNotifications()
        );
    }
});

async function handleScheduledNotifications() {
    // Get notifications from IndexedDB
    const notifications = await getNotificationsFromIndexedDB();
    const now = new Date().getTime();
    
    for (const notif of notifications) {
        if (notif.scheduledTime && new Date(notif.scheduledTime).getTime() <= now) {
            self.registration.showNotification(notif.title, {
                body: notif.message,
                icon: "/icons/icon-192x192.png",
                badge: "/icons/icon-72x72.png"
            });
            // Remove or mark as shown in IndexedDB
            await removeNotificationFromIndexedDB(notif.id);
        }
    }
}

// Helper functions for IndexedDB access
async function getNotificationsFromIndexedDB() {
    // Implement IndexedDB access
    return new Promise(resolve => {
        const request = indexedDB.open('notification-store');
        request.onsuccess = (event) => {
            const db = event.target.result;
            const tx = db.transaction('notifications', 'readonly');
            const store = tx.objectStore('notifications');
            const getAllRequest = store.getAll();
            getAllRequest.onsuccess = () => resolve(getAllRequest.result);
        };
    });
}

async function removeNotificationFromIndexedDB(id) {
    // Implement IndexedDB deletion
    return new Promise(resolve => {
        const request = indexedDB.open('notification-store');
        request.onsuccess = (event) => {
            const db = event.target.result;
            const tx = db.transaction('notifications', 'readwrite');
            const store = tx.objectStore('notifications');
            store.delete(id);
            tx.oncomplete = () => resolve();
        };
    });
}