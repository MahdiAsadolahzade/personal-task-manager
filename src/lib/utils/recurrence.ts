// src/utils/recurrence.ts
import { Task } from "@/types/task.type";
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isBefore,
  isAfter,
  isSameDay,
  format,
} from "date-fns";
import { parseISO } from "date-fns/fp";

export function isTaskOccurringOnDate(task: Task, date: Date): boolean {
  if (!task.isRecurring || !task.dueDate) return false;

  const dueDate = parseISO(task.dueDate);
  const dateStr = format(date, "yyyy-MM-dd");

  // Check if this is before the initial due date
  if (isBefore(date, dueDate)) return false;

  // Check if after end date
  if (
    task.recurrenceRule?.endDate &&
    isAfter(date, parseISO(task.recurrenceRule.endDate))
  ) {
    return false;
  }

  // Check exception dates
//   if (task.recurrenceRule?.exceptions?.includes(dateStr)) return false;

  // Check recurrence pattern
  switch (task.recurrenceRule?.frequency) {
    case "1": // Daily
      const dayDiff = Math.floor(
        (date.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return dayDiff % task.recurrenceRule.interval === 0;

    case "2": // Weekly
      // Implement weekly logic (same day of week)
      return (
        dueDate.getDay() === date.getDay() &&
        Math.floor(
          (date.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
        ) %
          task.recurrenceRule.interval ===
          0
      );

    case "3": // Monthly
      // Same day of month
      return (
        dueDate.getDate() === date.getDate() &&
        (date.getMonth() -
          dueDate.getMonth() +
          12 * (date.getFullYear() - dueDate.getFullYear())) %
          task.recurrenceRule.interval ===
          0
      );

    case "4": // Yearly
      // Same month and day
      return (
        dueDate.getMonth() === date.getMonth() &&
        dueDate.getDate() === date.getDate() &&
        (date.getFullYear() - dueDate.getFullYear()) %
          task.recurrenceRule.interval ===
          0
      );

    default:
      return false;
  }
}

export function generateTaskInstancesForDate(date: Date, task: Task): Task[] {
  if (!isTaskOccurringOnDate(task, date)) return [];

  return [
    {
      ...task,
      id: `${task.id}-${format(date, "yyyy-MM-dd")}`,
      isInstance: true,
      originalTaskId: task.id,
      dueDate: format(date, "yyyy-MM-dd") + task?.dueDate!.slice(10), // Keep original time
    },
  ];
}
