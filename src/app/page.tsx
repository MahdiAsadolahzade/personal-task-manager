"use client";
import { useRef, useState } from "react";
import { useAppStore } from "@/stores/app.store";
import Title from "@/components/typography/Title";
import Menu from "@/components/menu/Menu";

export default function TaskPage() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  
  return (
    <div className="">
      <Title title="Home" />

      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Open Menu
      </button>

      <Menu
        anchorEl={buttonRef.current}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="hover:bg-gray-100 p-2 cursor-pointer">Item 1</div>
        <div className="hover:bg-gray-100 p-2 cursor-pointer">Item 2</div>
        <div className="hover:bg-gray-100 p-2 cursor-pointer">Item 3</div>
      </Menu>
    </div>
  );
}
