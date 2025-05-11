self.addEventListener('push', function (event) {
    const data = event.data?.json();
  
    const title = data?.title || "Notification";
    const options = {
      body: data?.message || "",
      icon: "/icons/icon-192x192.png",
      tag: data?.id,
      vibrate: [200, 100, 200],
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  