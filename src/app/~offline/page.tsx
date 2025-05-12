"use client";
import Title from "@/components/typography/Title";
import { useTaskStore } from "@/stores/task.store";
import NavLink from "@/components/NavLink";
import Calendar from "@/components/calendar/Calendar";

export default function HomePage() {
  const { tasks } = useTaskStore();

  return (
    <div className="p-4">
      <Title title="Home" />

      {tasks?.length > 0 ? (
        <>
          <Calendar tasks={tasks}  />
        </>
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
