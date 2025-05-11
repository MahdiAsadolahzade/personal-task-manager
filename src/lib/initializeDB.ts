export function setupNotificationDB() {
    const request = indexedDB.open("notification-store", 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("notifications")) {
        db.createObjectStore("notifications", { keyPath: "id" });
      }
    };
  }
  