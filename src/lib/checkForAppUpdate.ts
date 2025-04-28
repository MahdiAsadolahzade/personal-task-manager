// src/lib/checkForAppUpdate.ts

import { CURRENT_APP_VERSION } from "@/constants/version";
import { sendNotification } from "@/lib/notifications/notificationManager";

export function checkForAppUpdate() {
  if (typeof window === "undefined") return;

  const storedVersion = localStorage.getItem("appVersion");

  if (storedVersion !== CURRENT_APP_VERSION) {
    console.log("🚀 New version detected!");

    // Send notification using manager
    sendNotification({
      title: "Update Available",
      body: "A new version of the app is ready! Please refresh.",
      icon: "/icons/icon-192x192.png",
      urlToOpen: window.location.href, // Optional: refresh the page
    });

    localStorage.setItem("appVersion", CURRENT_APP_VERSION);
  }
}
