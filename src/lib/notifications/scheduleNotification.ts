// src/lib/notifications/scheduleNotification.ts

import { NotificationPayload } from "./notificationTypes";
import { sendNotification } from "./notificationManager";

/**
 * Schedule a notification to appear at a future time.
 * @param scheduledTime - Date object of when the notification should be triggered
 * @param payload - The notification payload (title, body, etc.)
 */
export function scheduleNotification(scheduledTime: Date, payload: NotificationPayload) {
  const now = new Date();
  const delay = scheduledTime.getTime() - now.getTime(); // ms

  if (delay <= 0) {
    console.warn("Scheduled time is in the past. Skipping notification.");
    return;
  }

  console.log(`⏰ Notification scheduled in ${delay / 1000} seconds.`);

  setTimeout(() => {
    sendNotification(payload);
  }, delay);
}
