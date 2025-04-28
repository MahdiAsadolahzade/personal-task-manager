"use client";

import { useAppStore } from "@/stores/app.store";
import Title from "@/components/typography/Title";

export default function TaskPage() {
  const { hydrated } = useAppStore();

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
      <Title title="Home" />

   




    </div>
  );
}
