"use effect";
import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Title from "@/components/typography/Title";

const SettingPage = () => {
  return (
    <div className="screen">
      <Title title="Settings" />

      <div className=" mt-10  flex justify-between items-center border-[1px] border-accent rounded-lg p-4 shadow-md">
        <h1 className="text-2xl font-bold">Theme</h1>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default SettingPage;
