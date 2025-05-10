import { scheduleNotification } from "@/lib/notifications/scheduleNotification";
import { scheduleRecurringNotification } from "@/lib/notifications/scheduleRecurringNotification";
import { NotificationPayload } from "@/lib/notifications/notificationTypes";
import { useTaskStore } from "@/stores/task.store";

export function scheduleTaskNotifications() {
  const tasks = useTaskStore.getState().tasks;
  tasks.forEach((task) => {
    if (!task.setAlarm || !task.dueDate) return;

    const payload: NotificationPayload = {
      title: task.title,
      body: task.description || "You have a task due!",
      
    };

    const dueDate = new Date(task.dueDate);

    if (task.isRecurring && task.recurrencePattern) {
      scheduleRecurringNotification(dueDate, payload, task.recurrencePattern);
    } else {
      scheduleNotification(dueDate, payload);
    }
  });
}
