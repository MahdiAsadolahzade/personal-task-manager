// src/hooks/useTaskActions.ts
import { useCallback } from "react";
import useTaskStore from "@/stores/task.store";
import { Task } from "@/types/task.type";

export const useTaskActions = () => {
  const { addTask, updateTask, deleteTask, clearAll, setLoading, setError, clearState } = useTaskStore();

  const handleAddTask = useCallback(async (task: Omit<Task, 'id'>) => {
    try {
      setLoading(true);
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      addTask(newTask);
    } catch (_err) {
      console.log(_err);
      setError("Failed to add task");
    } finally {
      setLoading(false);
    }
  }, [addTask, setError, setLoading]);

  const handleUpdateTask = useCallback(async (task: Task) => {
    try {
      setLoading(true);
      updateTask(task);
    } catch (_err) {
      console.log(_err);
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  }, [updateTask, setError, setLoading]);

  const handleDeleteTask = useCallback(async (id: string) => {
    try {
      setLoading(true);
      deleteTask(id);
    } catch (_err) {
      console.log(_err);
      
      setError("Failed to delete task");
    } finally {
      setLoading(false);
    }
  }, [deleteTask, setError, setLoading]);

  const handleClearAll = useCallback(async () => {
    try {
      setLoading(true);
      clearAll();
    } catch (_err) {
      console.log(_err);
      setError("Failed to clear tasks");
    } finally {
      setLoading(false);
    }
  }, [clearAll, setError, setLoading]);

  return {
    addTask: handleAddTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    clearAll: handleClearAll,
    clearErrors: clearState,
  };
};