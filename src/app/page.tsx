// src/app/page.tsx
"use client";
import { useAppState } from "@/hooks/useAppState";
import { useTaskActions } from "@/hooks/useTaskActions";
import useTaskStore from "@/stores/task.store";
import { TaskStatus, TaskType } from "@/types/task.type";
import { useState } from "react";

export default function Home() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { tasks } = useTaskStore();
  const { addTask, deleteTask } = useTaskActions();
  const { isLoading, error, isHydrated, isOffline, clearState } = useAppState();

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    
    addTask({
      title: newTaskTitle,
      description: "",
      status: "PENDING" as TaskStatus,
      type: "PERSONAL" as TaskType,
      createdAt: new Date().toISOString()
    });
    
    setNewTaskTitle("");
  };

  if (!isHydrated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Loading your tasks...</p>
        {isOffline && (
          <p className="text-yellow-600 mt-2">
            Offline mode - using local data
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      
      {isOffline && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>You are currently offline. Changes will be saved locally.</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
          <button 
            onClick={clearState}
            className="text-sm text-red-600 hover:text-red-800 mt-2"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter task title"
          className="flex-1 p-2 border rounded"
          disabled={isLoading}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button
          onClick={handleAddTask}
          disabled={isLoading || !newTaskTitle.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li 
            key={task.id} 
            className="p-3 border rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              disabled={isLoading}
              className="text-red-500 hover:text-red-700 disabled:opacity-50"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No tasks yet. Add your first task!
        </p>
      )}
    </div>
  );
}