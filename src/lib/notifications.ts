type NotificationItem = {
    id: string;
    title: string;
    dueDate: string; // ISO string
  };
  
  let notifications: NotificationItem[] = [];
  
  export function addNotification(item: NotificationItem) {
    notifications.push(item);
  }
  
  export function getDueNotifications(): NotificationItem[] {
    const now = Date.now();
    return notifications.filter(n => {
      const due = new Date(n.dueDate).getTime();
      return Math.abs(due - now) < 60000; // due within next 60s
    });
  }
  
  export function clearSent(dueItems: NotificationItem[]) {
    notifications = notifications.filter(n => !dueItems.find(d => d.id === n.id));
  }
  
  export function getAllNotifications() {
    return notifications;
  }
  