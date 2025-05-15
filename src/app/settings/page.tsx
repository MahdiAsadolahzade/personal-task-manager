"use client";
import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Title from "@/components/typography/Title";
import Icon from "@/components/utils/Icon";
import { useDialogStore } from "@/stores/dialog.store";
import AboutProject from "@/components/dialog/AboutProject";

const SettingPage = () => {
  const { openDialog } = useDialogStore();
  const handleClick = () => {
    openDialog({
      kind: "Info",
      title: "About the App",
      CustomComponent: AboutProject,
    });
  };
  return (
    <div className="screen">
      <Title title="Settings" />

      <div className=" mt-10  flex justify-between items-center border-[1px] border-accent rounded-lg p-4 shadow-md">
        <h1 className="text-2xl font-bold">Theme</h1>
        <ThemeToggle />
      </div>

      <div className=" mt-10  flex justify-between items-center border-[1px] border-accent rounded-lg p-4 shadow-md">
        <h1 className="text-2xl font-bold">About PTM</h1>
 
          <Icon alt="creator" src="/icons/qr-code.svg" className="w-10 h-10 cursor-pointer" clickFunction={handleClick}/>
    
      </div>
    </div>
  );
};

export default SettingPage;
