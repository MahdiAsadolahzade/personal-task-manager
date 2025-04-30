// src/app/config/page.tsx
"use client";
import Title from "@/components/typography/Title";
import { useDialogStore } from "@/stores/dialog.store";

const ConfigPage = () => {
  const { openDialog } = useDialogStore();

  const handleOpenDialog = (kind: any) => {
    openDialog({
      title: `${kind} Dialog`,
      kind: kind,
    });
  };

  return (
    <div>
      <Title title="Configuration" />
      {/* <button className="btn btn-primary mt-10" onClick={handleOpenDialog}>
        Open Add
      </button> */}

      {["Add", "Edit", "Delete", "Info", "Confirm", "Custom"].map((kind) => (
        <button
          className="btn btn-primary m-10"
          onClick={handleOpenDialog.bind(null, kind)}
          key={kind}
        >
          Open {kind}
        </button>
      ))}
    </div>
  );
};

export default ConfigPage;
