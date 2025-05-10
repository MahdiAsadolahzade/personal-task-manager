// src/components/Calendar.tsx
import React, { FC, useMemo, useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subMonths,
  addMonths,
  isToday,
  isSameMonth,
} from 'date-fns';
import clsx from 'clsx';
import { Task } from '@/types/task.type';
import { useAppStore } from '@/stores/app.store';

interface CalendarProps {
  tasks: Task[];
  initialDate?: Date;
  onDayClick?: (date: Date) => void;
}

const Calendar: FC<CalendarProps> = ({ tasks, initialDate = new Date(), onDayClick }) => {
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
      const key = task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '';
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
        <button onClick={handlePrev} className="text-sm px-3 py-1 rounded hover:bg-gray-200">
          ← Prev
        </button>
        <div className="font-semibold text-lg">{format(currentDate, 'MMMM yyyy')}</div>
        <button onClick={handleNext} className="text-sm px-3 py-1 rounded hover:bg-gray-200">
          Next →
        </button>
      </div>

      {/* Weekday Headers */}
      <div className={clsx('grid text-center font-semibold mb-1', 'grid-cols-7 text-sm')}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      {days.map((week, idx) => (
        <div className="grid grid-cols-7 gap-1" key={idx}>
          {week.map((date) => {
            const dateKey = format(date, 'yyyy-MM-dd');
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

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  tasks: Task[];
  isMobile: boolean;
  onClick?: (date: Date) => void;
}

const CalendarDay: FC<CalendarDayProps> = React.memo(
  ({ date, isCurrentMonth, tasks, isMobile, onClick }) => {
    const maxVisibleTasks = isMobile ? 1 : 2;

    return (
      <div
        onClick={() => onClick?.(date)}
        className={clsx(
          'border rounded min-h-[80px] flex flex-col gap-1 p-1 m-1 sm:p-2 transition duration-150',
          !isCurrentMonth && 'bg-gray-100 text-gray-400',
          isToday(date) && 'border-blue-500 ring-2 ring-blue-200',
          'hover:bg-blue-50 active:scale-[0.98] cursor-pointer'
        )}
      >
        <div className="text-xs sm:text-sm font-medium">{format(date, 'd')}</div>
        <div className="flex flex-col gap-0.5">
          {tasks.slice(0, maxVisibleTasks).map((task) => (
            <div
              key={task.id}
              className="text-[10px] sm:text-xs truncate bg-blue-100 text-blue-700 rounded px-1 py-0.5"
              title={task.title}
            >
              {task.title}
            </div>
          ))}
          {tasks.length > maxVisibleTasks && (
            <div className="text-[10px] sm:text-xs text-gray-500">
              +{tasks.length - maxVisibleTasks} more
            </div>
          )}
        </div>
      </div>
    );
  }
);

CalendarDay.displayName = 'CalendarDay';
