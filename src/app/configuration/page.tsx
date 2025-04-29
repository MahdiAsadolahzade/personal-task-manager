"use client";
import Title from "@/components/typography/Title";
import Icon from "@/components/utils/Icon";
import { useIconStore } from "@/stores/icons.store";
import { useTaskStatusStore } from "@/stores/task_status.store";
import React from "react";
import { MdPending } from "react-icons/md";

const page = () => {
  const {
    addStatus,
    clearStatuses,
    deleteStatus,
    hydrated,
    setLoading,
    statuses,
    updateStatus,
    setStatuses,
  } = useTaskStatusStore();

  
  return (
    <div>
      <Title title="Configuration" />
    </div>
  );
};

export default page;
