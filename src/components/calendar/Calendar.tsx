// src/components/Calendar.tsx
'use client'
import React, { FC, useMemo, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subMonths,
  addMonths,
  isSameMonth,
} from "date-fns";
import clsx from "clsx";
import { Task } from "@/types/task.type";
import { useAppStore } from "@/stores/app.store";
import CalendarDay from "./CalendarDay";
import { generateTaskInstancesForDate } from "@/lib/utils/recurrence";

interface CalendarProps {
  tasks: Task[];
  initialDate?: Date;
  onDayClick?: (date: Date) => void;
}

const Calendar: FC<CalendarProps> = ({
  tasks,
  initialDate = new Date(),
  onDayClick,
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const { isMobile } = useAppStore();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = useMemo(() => {
    const rows = [];
    let day = startDate;
    while (day <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(day);
        day = addDays(day, 1);
      }
      rows.push(week);
    }
    return rows;
  }, [startDate, endDate]);

  const memoizedTasksByDate = useMemo(() => {
    const map = new Map<string, Task[]>();
    for (const task of tasks) {
      const key = task.dueDate
        ? format(new Date(task.dueDate), "yyyy-MM-dd")
        : "";
      if (!map.has(key)) map.set(key, []);
      map.get(key)?.push(task);
    }
    return map;
  }, [tasks]);

  const handlePrev = () => setCurrentDate((prev) => subMonths(prev, 1));
  const handleNext = () => setCurrentDate((prev) => addMonths(prev, 1));

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrev}
          className="btn btn-outline"
        >
          ← Prev
        </button>
        <div className="font-semibold text-lg">
          {format(currentDate, "MMMM yyyy")}
        </div>
        <button
          onClick={handleNext}
          className="btn btn-outline"
        >
          Next →
        </button>
      </div>

      {/* Weekday Headers */}
      <div
        className={clsx(
          "grid text-center font-semibold mb-1",
          "grid-cols-7 text-sm"
        )}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      {days.map((week, idx) => (
        <div className="grid grid-cols-7 gap-1" key={idx}>
          {week.map((date) => {
            const dateKey = format(date, "yyyy-MM-dd");
            const todayTasks = memoizedTasksByDate.get(dateKey) || [];

            return (
              <CalendarDay
                key={date.toISOString()}
                date={date}
                isCurrentMonth={isSameMonth(date, currentDate)}
                tasks={todayTasks}
                isMobile={isMobile}
                onClick={onDayClick}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Calendar;


