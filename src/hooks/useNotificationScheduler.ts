// src/hooks/useNotificationScheduler.ts

import { useEffect, useRef } from "react";
import { useNotificationStore } from "@/stores/notification.store";

export const useNotificationScheduler = () => {
  const { notifications } = useNotificationStore();
  const scheduledTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    // Clear existing timeouts to avoid duplication
    Object.values(scheduledTimeouts.current).forEach(clearTimeout);
    scheduledTimeouts.current = {};

    const now = Date.now();

    notifications.forEach((notif) => {
      if (!notif.scheduledTime) return;

      const time = new Date(notif.scheduledTime).getTime();
      const delay = time - now;

      if (delay > 0) {
        const timeout = setTimeout(() => {
          showBrowserNotification(notif.title, notif.message);
        }, delay);

        scheduledTimeouts.current[notif.id] = timeout;
      }
    });

    return () => {
      Object.values(scheduledTimeouts.current).forEach(clearTimeout);
    };
  }, [notifications]);
};

function showBrowserNotification(title: string, message: string) {
  if (Notification.permission === "granted") {
    new Notification(title, { body: message });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, { body: message });
      }
    });
  }
}
