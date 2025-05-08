"use client";
import { useRef, useState } from "react";
import Title from "@/components/typography/Title";
import { useTaskStore } from "@/stores/task.store";
import TasksList from "@/components/sections/TasksList";
import NavLink from "@/components/NavLink";

export default function TaskPage() {
  const { tasks } = useTaskStore();

  return (
    <div className="p-4">
      <Title title="Home" />

      <h2 className="text-secondary ">Latest Tasks</h2>
      {tasks?.length > 0 ? (
        <TasksList data={tasks?.slice(Math.max(tasks?.length - 2, 0))} />
      ) : (
        <div className="flex-col justify-center items-center">
          <p> you dont have task you can create a task in task page</p>
          <NavLink href={"/tasks"}>
            <div className="btn btn-secondary">Tasks</div>
          </NavLink>
        </div>
      )}
    </div>
  );
}
