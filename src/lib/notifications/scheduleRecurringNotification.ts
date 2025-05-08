// src/lib/notifications/scheduleRecurringNotification.ts

import { scheduleNotification } from "./scheduleNotification";
import { NotificationPayload } from "./notificationTypes";
import { addRecurringTime } from "./utils/recurrenceUtils";

/**
 * Schedule a recurring notification.
 * @param initialTime - The first scheduled time
 * @param payload - Notification content
 * @param recurrencePattern - Pattern string ID like "1" (Daily), "2" (Weekly), etc.
 */
export function scheduleRecurringNotification(
  initialTime: Date,
  payload: NotificationPayload,
  recurrencePattern: string
) {
  let nextTime = new Date(initialTime);

  const scheduleNext = () => {
    nextTime = addRecurringTime(nextTime, recurrencePattern);
    scheduleNotification(nextTime, payload);
    setTimeout(scheduleNext, nextTime.getTime() - new Date().getTime());
  };

  // Schedule the first
  scheduleNotification(nextTime, payload);
  setTimeout(scheduleNext, nextTime.getTime() - new Date().getTime());
}
