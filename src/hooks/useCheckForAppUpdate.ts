// src/hooks/useCheckForAppUpdate.ts
import { useEffect } from "react";
import { CURRENT_APP_VERSION } from "@/constants/version";
import { useRouter } from "next/navigation";
import { useDialogStore } from "@/stores/dialog.store";
import UpdateNote from "@/components/dialog/UpdateNote";

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
    return registration; // Return the registration object
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
    // Removed actions since they only work with service worker notifications
  };

  const handleNotificationClick = () => {
    // If service worker is ready, use it to update
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.active?.postMessage({ type: "SKIP_WAITING" });
      });
    }
    window.location.reload();
    router.push("/");
  };

  // Try to show notification through service worker first
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      if (registration) {
        // This is where we can use actions
        await registration.showNotification("Update Available", {
          ...notificationOptions,
          actions: [
            { action: "refresh", title: "🔄 Refresh Now" },
            { action: "dismiss", title: "✖ Dismiss" },
          ],
        });

        // Add event listener for notification click
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

  // Fallback to regular notifications
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
