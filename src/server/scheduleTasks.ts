'use client'
import { addDays, addWeeks, isAfter, isEqual } from "date-fns";
import { Task } from "@/types/task.type";
import {
  postNotification,
  notificationList,
  removeNotification,
} from "@/stores/notification.store";
import { v4 as uuid } from "uuid";
import { findRecurrencePattern } from "@/mock/recurrence.data";

export function ScheduleTasks(tasks: Task[]) {
  const now = new Date();
  const maxScheduleRange = addWeeks(now, 1);
  const existingNotifications = notificationList();

  tasks.forEach((task) => {
    if (!task.setAlarm || !task.dueDate) return;

    const due = new Date(task.dueDate);

    // Remove ALL notifications for this task's title (regardless of time)
    existingNotifications.forEach((n) => {
      if (n.title === `Reminder: ${task.title}`) {
        removeNotification(n.id);
      }
    });

    const alreadyScheduled = (date: Date) =>
      notificationList().some(
        (n) =>
          n.title === `Reminder: ${task.title}` &&
          n.scheduledTime &&
          isEqual(new Date(n.scheduledTime), date)
      );

    if (!task.isRecurring) {
      if (due > now && due < maxScheduleRange && !alreadyScheduled(due)) {
        postNotification({
          id: uuid(),
          message: `Task "${task.title}" is due on ${due.toLocaleString()}.`,
          title: `Reminder: ${task.title}`,
          timestamp: now,
          scheduledTime: due,
        });
      }
      return;
    }

    let nextDue = due;
    const pattern = findRecurrencePattern(task.recurrencePattern ?? "")?.name;

    while (nextDue < maxScheduleRange) {
      if (nextDue > now) {
        postNotification({
          id: uuid(),
          message: `Recurring task "${
            task.title
          }" is due on ${nextDue.toLocaleString()}.`,
          title: `Reminder: ${task.title}`,
          timestamp: now,
          scheduledTime: nextDue,
        });
      }

      switch (pattern) {
        case "Daily":
          nextDue = addDays(nextDue, task.recurrenceInterval || 1);
          break;
        case "Weekly":
          nextDue = addWeeks(nextDue, task.recurrenceInterval || 1);
          break;
        default:
          console.warn("Unsupported recurrence pattern", pattern);
          return;
      }

      if (
        task.recurrenceEndDate &&
        isAfter(nextDue, new Date(task.recurrenceEndDate))
      ) {
        break;
      }
    }
  });
}
