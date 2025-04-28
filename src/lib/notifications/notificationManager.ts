// src/lib/notifications/notificationManager.ts

import { NotificationPayload } from "./notificationTypes";
export async function sendNotification(payload: NotificationPayload) {
  if (typeof window === "undefined") return;

  if (Notification.permission === "granted") {
    show(payload);
  } else if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      show(payload);
    }
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
