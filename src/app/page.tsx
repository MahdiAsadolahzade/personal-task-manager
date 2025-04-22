// src/app/page.tsx
"use client";
import { useAppState } from "@/hooks/useAppState";
import { useTaskActions } from "@/hooks/useTaskActions";
import useTaskStore from "@/stores/task.store";
import { TaskStatus, TaskType } from "@/types/task.type";
import { useEffect, useState } from "react";

export default function Home() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { tasks } = useTaskStore();
  const { addTask, deleteTask, clearErrors } = useTaskActions();
  const { isLoading, error, success, isHydrated, clearState } = useAppState();

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    
    addTask({
      title: newTaskTitle,
      description: "",
      status: "PENDING" as TaskStatus,
      type: "PERSONAL" as TaskType,
      createdAt: ""
    });
    
    setNewTaskTitle("");
  };

  if (!isHydrated) {
    return <div>Loading your tasks...</div>;
  }

  return (
    <div className="p-4">
      <h1>Task Manager</h1>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={clearState}>Dismiss</button>
        </div>
      )}

      <input
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        disabled={isLoading}
      />
      <button
        onClick={handleAddTask}
        disabled={isLoading || !newTaskTitle.trim()}
      >
        {isLoading ? "Adding..." : "Add Task"}
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
