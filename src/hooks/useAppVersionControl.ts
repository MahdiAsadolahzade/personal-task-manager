// hooks/useAppVersionControl.ts
"use client";
import { useEffect } from "react";
import { CURRENT_APP_VERSION } from "@/lib/config";
import { useAppStore } from "@/stores/app.store";
import { useDialogStore } from "@/stores/dialog.store";
import UpdateNote from "@/components/dialog/UpdateNote";

export const useAppVersionControl = () => {
  const { version, setVersion } = useAppStore();
  const { openDialog } = useDialogStore();

  useEffect(() => {
    if (version !== CURRENT_APP_VERSION) {
      console.log(
        `[App] Version mismatch: ${version} → ${CURRENT_APP_VERSION}`
      );
      setVersion(CURRENT_APP_VERSION);
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("[App] Service worker registered:", reg);

          reg.onupdatefound = () => {
            const installingWorker = reg.installing;

            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === "installed") {
                  if (navigator.serviceWorker.controller) {
                    console.log("[App] New content is available!");

                    openDialog({
                      kind: "Info",
                      title: "Update Note",
                      CustomComponent: UpdateNote,
                    });
                  } else {
                    console.log("[App] Content cached for offline use");
                  }
                }
              };
            }
          };
        })
        .catch((err) => {
          console.error("[App] SW registration failed:", err);
        });
    }
  }, []);
};
