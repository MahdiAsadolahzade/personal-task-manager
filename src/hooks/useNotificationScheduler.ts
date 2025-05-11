// hooks/useNotificationScheduler.ts
"use client";
import { useEffect, useRef } from "react";
import { useNotificationStore } from "@/stores/notification.store";
import type { TNotification } from "@/stores/notification.store";

export const useNotificationScheduler = () => {
  const { notifications } = useNotificationStore();
  const scheduledTimeouts = useRef<Record<string, NodeJS.Timeout>>({});
  const isPWA = useRef(false);

  useEffect(() => {
    // Check if running as PWA
    isPWA.current =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://");

    // For all environments - handle notifications
    handleNotifications();

    return () => {
      Object.values(scheduledTimeouts.current).forEach(clearTimeout);
    };
  }, [notifications]);

  const handleNotifications = () => {
    Object.values(scheduledTimeouts.current).forEach(clearTimeout);
    scheduledTimeouts.current = {};

    const now = Date.now();

    notifications.forEach((notif) => {
      if (!notif.scheduledTime) return;

      const time = new Date(notif.scheduledTime).getTime();
      const delay = time - now;

      if (delay > 0) {
        // For PWA/mobile, use service worker if available
        if (isPWA.current && "serviceWorker" in navigator) {
          scheduleWithServiceWorker(notif);
        }
        // For desktop browsers, use setTimeout
        else {
          scheduleWithTimeout(notif, delay);
        }
      } else if (time <= now) {
        // Notification is due now
        showBrowserNotification(notif.title, notif.message);
      }
    });
  };

  const scheduleWithTimeout = (notif: TNotification, delay: number) => {
    const timeout = setTimeout(() => {
      showBrowserNotification(notif.title, notif.message);
    }, delay);

    scheduledTimeouts.current[notif.id] = timeout;
  };

  const scheduleWithServiceWorker = async (notif: TNotification) => {
    try {
      const registration = await navigator.serviceWorker.ready;

      // Use standard background sync instead of periodic sync
      if ("sync" in registration) {
        // Store notification in IndexedDB
        await storeNotificationForSync(notif);

        try {
          await (registration as any)?.sync?.register(`notif-${notif.id}`);
          console.log("Background sync registered for notification");
        } catch (syncError) {
          console.log("Background sync registration failed:", syncError);
          alert(`Background sync registration failed:${syncError} `);
          // Fallback to setTimeout if sync fails
          scheduleWithTimeout(
            notif,
            new Date(notif.scheduledTime!).getTime() - Date.now()
          );
        }
      } else {
        // Fallback to setTimeout if sync not available
        scheduleWithTimeout(
          notif,
          new Date(notif.scheduledTime!).getTime() - Date.now()
        );
      }
    } catch (e) {
      console.log("Service worker error:", e);
      alert(`Service worker error:${e} `);
      scheduleWithTimeout(
        notif,
        new Date(notif.scheduledTime!).getTime() - Date.now()
      );
    }
  };

  async function storeNotificationForSync(notif: TNotification) {
    return new Promise((resolve) => {
      const request = indexedDB.open("notification-store", 1);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("notifications")) {
          db.createObjectStore("notifications", { keyPath: "id" });
        }
      };

      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction("notifications", "readwrite");
        const store = tx.objectStore("notifications");
        store.put(notif);
        tx.oncomplete = () => resolve(true);
      };

      request.onerror = () => resolve(false);
    });
  }

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
};
