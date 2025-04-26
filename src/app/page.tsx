"use client";

import { useTaskStatusStore } from "@/stores/task_status.store";
import { useAppStore } from "@/stores/app.store";

export default function TaskPage() {
  const {
    statuses,
    addStatus,
    clearStatuses,
    deleteStatus,
    isLoading,
    hydrated,
  } = useTaskStatusStore();

  const { isMobile, isTablet, isDesktop } = useAppStore();

  if (!hydrated) {
    return (
      <div className="">
        <h1 className="text-2xl font-bold">Task Status Page</h1>

        <p className="text-gray-500 text-sm mb-2">
          Loading statuses from DB...
        </p>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Task Status Page</h1>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            addStatus({
              id: String(Date.now()),
              name: "New Status",
              color: "#ff0000",
              icon: "🆕",
            });
          }}
          className="btn btn-primary"
          disabled={isLoading}
        >
          Add Status
        </button>
        <button onClick={clearStatuses} className="btn btn-secondary">
          Clear Statuses
        </button>
      </div>

      {isLoading && <p className="text-sm text-blue-500">Updating...</p>}

      <ul className="mt-4">
        {statuses.map((status) => (
          <li key={status.id} className="flex items-center">
            <span className="mr-2">{status.icon}</span>
            <span>{status.name}</span>
            <button
              onClick={() => deleteStatus(status.id)}
              className="btn btn-error ml-auto"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
