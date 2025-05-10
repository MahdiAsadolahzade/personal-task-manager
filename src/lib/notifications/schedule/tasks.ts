// src/lib/notifications/schedule/tasks.ts

import { Task } from "@/types/task.type";

let timeouts: NodeJS.Timeout[] = [];

export function scheduleTaskNotifications(tasks: Task[]) {
  // Clear previous timeouts
  timeouts.forEach(clearTimeout);
  timeouts = [];

  tasks.forEach((task) => {
    if (!task.dueDate || task.setAlarm === false) return;

    const due = new Date(task.dueDate);
    const now = Date.now();

    if (due.getTime() > now) {
      const timeout = setTimeout(() => {
        new Notification(`Task Due: ${task.title}`);
      }, due.getTime() - now);

      timeouts.push(timeout);
    }
  });
}
