// src/lib/notifications/scheduleNotification.ts

import { NotificationPayload } from "./notificationTypes";
import { sendNotification } from "./notificationManager";

/**
 * Schedule a notification to appear at a future time.
 * @param scheduledTime - Date object of when the notification should be triggered
 * @param payload - The notification payload (title, body, etc.)
 */
// src/lib/notifications/scheduleNotification.ts
export function scheduleNotification(scheduledTime: Date, payload: NotificationPayload) {
  const now = new Date();
  const delay = scheduledTime.getTime() - now.getTime();

  if (delay <= 0) return;

  // For mobile, we need to use Background Sync or periodic sync
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(registration => {
      if ('sync' in registration) {
        if ('sync' in registration) {
          (registration as any).sync.register(`notification-${scheduledTime.getTime()}`)
            .then(() => console.log('Sync registered'))
            .catch(console.error);
        } else {
          console.warn('Background Sync is not supported in this browser.');
        }
      } else {
        console.warn('Background Sync is not supported in this browser.');
      }
    });
  } else {
    // Fallback for desktop
    setTimeout(() => sendNotification(payload), delay);
  }
}

