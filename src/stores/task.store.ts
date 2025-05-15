// src/stores/task.store.ts
import { createPersistedStore } from "./createPersistedStore";
import { TaskStoreModel } from "@/models/task.model";
import { Task } from "@/types/task.type";
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isBefore,
  format,
  isSameDay
} from 'date-fns';
import { parseISO } from "date-fns/parseISO";

export const useTaskStore = createPersistedStore<TaskStoreModel>(
  "task-store",
  (set) => ({
    tasks: [],
    addTask: (task) => set((state) => {
      if (!task.isRecurring || !task.dueDate) {
        return { tasks: [task, ...state.tasks] };
      }
      
      // Generate instances for the recurring task
      const instances = generateRecurringInstances(task);
      return { 
        tasks: [
          ...instances,
          { ...task, isRecurringParent: true }, // Mark parent task
          ...state.tasks
        ] 
      };
    }),
    
    deleteTask: (id) => set((state) => {
      // Find the task being deleted
      const taskToDelete = state.tasks.find(t => t.id === id);
      
      if (!taskToDelete) return state;
      
      // If it's a recurring parent task, delete all its instances
      if (taskToDelete.isRecurringParent) {
        return {
          tasks: state.tasks.filter(t => 
            t.id !== id && t.originalTaskId !== id
          )
        };
      }
      
      // If it's an instance, just delete that instance
      return { tasks: state.tasks.filter(t => t.id !== id) };
    }),
    
    updateTask: (task) => set((state) => {
      // For non-recurring tasks or instances
      if (!task.isRecurring || !task.dueDate || task.isInstance) {
        return {
          tasks: state.tasks.map(t => t.id === task.id ? task : t)
        };
      }
      
      // For recurring parent tasks:
      // 1. Remove all existing instances
      // 2. Add the updated parent task
      // 3. Generate new instances
      const filteredTasks = state.tasks.filter(t => 
        t.id !== task.id && t.originalTaskId !== task.id
      );
      
      const instances = generateRecurringInstances(task);
      return { 
        tasks: [
          ...instances,
          { ...task, isRecurringParent: true },
          ...filteredTasks
        ] 
      };
    }),
    
    // Method to update a single instance without affecting others
    updateTaskInstance: (instance:Task) => set((state) => {
      // Mark this instance as manually modified
      const updatedInstance = { 
        ...instance, 
        isModifiedInstance: true 
      };
      
      return {
        tasks: state.tasks.map(t => 
          t.id === instance.id ? updatedInstance : t
        )
      };
    }),
    
    clearTasks: () => set({ tasks: [] }),
    setTasks: (tasks) => set({ tasks }),
  }),
  (state) => ({ tasks: state.tasks })
);

// Enhanced helper function to generate recurring instances
function generateRecurringInstances(task: Task): Task[] {
  if (!task.isRecurring || !task.dueDate || !task.recurrenceRule) return [];
  
  const instances: Task[] = [];
  const startDate = parseISO(task.dueDate);
  const endDate = task.recurrenceRule.endDate 
    ? parseISO(task.recurrenceRule.endDate)
    : addYears(startDate, 1); // Default to 1 year ahead if no end date
  
  let currentDate = startDate;
  let instanceIndex = 1;
  
  while (isBefore(currentDate, endDate)) {
    // Skip the original date (we'll keep the main task)
    if (!isSameDay(currentDate, startDate)) {
      instances.push({
        ...task,
        id: `${task.id}-${format(currentDate, 'yyyyMMdd')}-${instanceIndex++}`,
        title: `${task.title} (${instanceIndex})`, // Optional: Add index to title
        isInstance: true,
        originalTaskId: task.id,
        dueDate: format(currentDate, 'yyyy-MM-dd') + task.dueDate.slice(10),
        instanceDate: format(currentDate, 'yyyy-MM-dd'), // Store clean date
        instanceIndex: instanceIndex // Track instance order
      });
    }
    
    // Increment based on recurrence rule
    switch (task.recurrenceRule.frequency) {
      case '1': // Daily
        currentDate = addDays(currentDate, task.recurrenceRule.interval);
        break;
      case '2': // Weekly
        currentDate = addWeeks(currentDate, task.recurrenceRule.interval);
        break;
      case '3': // Monthly
        currentDate = addMonths(currentDate, task.recurrenceRule.interval);
        break;
      case '4': // Yearly
        currentDate = addYears(currentDate, task.recurrenceRule.interval);
        break;
      default:
        return instances; // Unknown frequency
    }
  }
  
  return instances;
}

