// src/lib/notifications/notificationManager.ts

import { NotificationPayload } from "./notificationTypes";
// src/lib/notifications/notificationManager.ts
export async function sendNotification(payload: NotificationPayload) {
  if (typeof window === "undefined" || !('serviceWorker' in navigator)) return;

  // Register service worker if not already registered
  const registration = await navigator.serviceWorker.ready;

  // Request permission (works differently on mobile)
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return;

  // For mobile, we need to use the Push API
  if ('PushManager' in window) {
    // This assumes your server supports push notifications
    // For local notifications while app is open, fall back to regular Notification API
    try {
      await registration.showNotification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/icons/icon-192x192.png',
        data: { url: payload.urlToOpen }
      });
      return;
    } catch (error) {
      console.error('Push API failed, falling back:', error);
    }
  }

  // Fallback for desktop or when Push API fails
  if (Notification.permission === 'granted') {
    show(payload);
  }
}

function show({ title, body, icon, urlToOpen }: NotificationPayload) {
  const notification = new Notification(title, {
    body,
    icon: icon || "/icons/icon-192x192.png",
  });

  if (urlToOpen) {
    notification.onclick = () => {
      window.open(urlToOpen, "_blank");
    };
  }
}
