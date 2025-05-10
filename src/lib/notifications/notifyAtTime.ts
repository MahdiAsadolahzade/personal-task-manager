// src/lib/notifications/notifyAtTime.ts

export function notifyAtTime(title: string, time: Date) {
    const delay = time.getTime() - Date.now();
  
    if (delay <= 0) return; // Already past due
  
    setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification(title);
      }
    }, delay);
  }
  