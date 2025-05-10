import { useEffect } from 'react';

export function useNotificationTrigger() {
  useEffect(() => {
    if (Notification.permission !== 'granted') return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/notifications/trigger');
        const data = await res.json();

        if (data.notifications?.length) {
          data.notifications.forEach((n: any) => {
            new Notification(n.title);
          });
        }
      } catch (error) {
        console.error('Notification trigger failed', error);
      }
    }, 60000); // every 60 seconds

    return () => clearInterval(interval);
  }, []);
}
