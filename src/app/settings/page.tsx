"use client";
import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Title from "@/components/typography/Title";
import { useNotificationStore } from "@/stores/notification.store";

const SettingPage = () => {
  const { pushNotification } = useNotificationStore();

  const handleClick = () => {
    pushNotification({
      id: crypto.randomUUID(),
      title: "Reminder",
      message: "Do the thing!",
      timestamp: new Date(),
      scheduledTime: new Date(Date.now() + 1000 * 60), // 1 minute later
    });
  };
  return (
    <div className="screen">
      <Title title="Settings" />

      <div className=" mt-10  flex justify-between items-center border-[1px] border-accent rounded-lg p-4 shadow-md">
        <h1 className="text-2xl font-bold">Theme</h1>
        <ThemeToggle />
      </div>

      <button className="btn btn-primary" onClick={handleClick}>
        test a notif
      </button>
    </div>
  );
};

export default SettingPage;
