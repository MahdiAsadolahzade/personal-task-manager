'use client'
import { useEffect } from "react";
import { useTaskStore } from "@/stores/task.store";
import { ScheduleTasks } from "@/server/scheduleTasks";

export function useTaskScheduler() {
  const { tasks } = useTaskStore();

  useEffect(() => {
    if (tasks.length === 0) return;
    ScheduleTasks(tasks); // deduplication happens inside
  }, [tasks]);
}
