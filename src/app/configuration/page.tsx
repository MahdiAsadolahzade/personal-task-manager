"use client";
import Title from "@/components/typography/Title";
import { useTaskStatusStore } from "@/stores/task_status.store";
import React from "react";
import { MdPending } from "react-icons/md";

const page = () => {
  const { statuses, hydrated } = useTaskStatusStore();
  return (
    <div>
      <Title title="Configuration" />

      <div className="grid grid-cols-2 gap-2">
        <div className="card">
          <div className="card-header">Statuses</div>
          <div className="card-body">
            {hydrated ? (
              <ul>
                {statuses.map((status) => (
                  <li key={status.id} className="p-2 border-b">
                    {status.name}
                    {status.icon}
         
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading statuses...</p>
            )}
          </div>
          <div className="card-footer">Actions</div>
        </div>
        <div className="card">2</div>
        <div className="card">3</div>
        <div className="card">4</div>
      </div>
    </div>
  );
};

export default page;
