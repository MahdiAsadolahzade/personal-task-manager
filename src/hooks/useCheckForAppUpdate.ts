import { useEffect } from "react";
import { CURRENT_APP_VERSION } from "@/constants/version";
import { useRouter } from "next/navigation";
import { useDialogStore } from "@/stores/dialog.store";
import UpdateNote from "@/components/dialog/UpdateNote";
import { CURRENT_UPDATE_NOTES } from "@/constants/versions";

const LOCAL_STORAGE_KEY = "appVersion";

export function useCheckForAppUpdate() {
  const router = useRouter();
  const { openDialog } = useDialogStore();
  const handleUpdateNoteDialog = () => {
    openDialog({
      kind: "Info",
      title: "Update Note",
      CustomComponent: UpdateNote,
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedVersion = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedVersion !== CURRENT_APP_VERSION) {
      console.log("🚀 New version detected!");
      notifyUpdateAvailable(router);
      handleUpdateNoteDialog();
      if (CURRENT_UPDATE_NOTES.needClean) {
        // Clear localStorage
        localStorage.clear();

        // Clear sessionStorage
        sessionStorage.clear();

        // Clear all caches
        if ("caches" in window) {
          caches.keys().then((cacheNames) => {
            cacheNames.forEach((cacheName) => {
              caches.delete(cacheName);
            });
          });
        }

        // Clear cookies
        document.cookie.split(";").forEach((cookie) => {
          const name = cookie.split("=")[0].trim();
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });

        // Unregister all service workers
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((registration) => {
              registration.unregister();
            });
          });
        }

        // Ensure the app version is updated after clearing
        localStorage.setItem(LOCAL_STORAGE_KEY, CURRENT_APP_VERSION);
      }
      // Register service worker if not already registered
      if ("serviceWorker" in navigator) {
        registerServiceWorker();
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, CURRENT_APP_VERSION);
    }
  }, [router]);
}

async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register("/sw.js");
    console.log(
      "ServiceWorker registration successful with scope: ",
      registration.scope
    );
    return registration;
  } catch (err) {
    console.error("ServiceWorker registration failed: ", err);
    return null;
  }
}

async function notifyUpdateAvailable(router: ReturnType<typeof useRouter>) {
  if (!("Notification" in window)) return;

  const notificationOptions = {
    body: "A new version of the app is ready! Click to refresh.",
    icon: "/icons/icon-192x192.png",
    tag: "app-update",
    requireInteraction: true,
  };

  const handleNotificationClick = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.active?.postMessage({ type: "SKIP_WAITING" });
      });
    }
    window.location.reload();
    router.push("/");
  };

  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      if (registration) {
        await registration.showNotification("Update Available", {
          ...notificationOptions,
          actions: [
            { action: "refresh", title: "🔄 Refresh Now" },
            { action: "dismiss", title: "✖ Dismiss" },
          ],
        });

        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.data && event.data.action === "notificationclick") {
            if (event.data.notificationAction === "refresh") {
              handleNotificationClick();
            }
          }
        });
        return;
      }
    } catch (swError) {
      console.log(
        "Service Worker notification failed, falling back to regular notification",
        swError
      );
    }
  }

  if (Notification.permission === "granted") {
    const notification = new Notification(
      "Update Available",
      notificationOptions
    );
    notification.onclick = handleNotificationClick;
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification(
          "Update Available",
          notificationOptions
        );
        notification.onclick = handleNotificationClick;
      }
    });
  }
}