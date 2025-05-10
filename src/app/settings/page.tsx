"use client";
import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Title from "@/components/typography/Title";
import { sendNotification } from "@/lib/notifications/notificationManager";

const SettingPage = () => {
  const ntificationTest = () => {
    sendNotification({ title: "this is a test", body: "test body" });
  };
  return (
    <div className="screen">
      <Title title="Settings" />

      <div className=" mt-10  flex justify-between items-center border-[1px] border-accent rounded-lg p-4 shadow-md">
        <h1 className="text-2xl font-bold">Theme</h1>
        <ThemeToggle />
      </div>

      <button onClick={ntificationTest} className="btn btn-primary">
        Test the Notification
      </button>
    </div>
  );
};

export default SettingPage;
