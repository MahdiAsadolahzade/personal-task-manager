// hooks/useAppVersionControl.ts
"use client";
import { useEffect } from "react";
import { CURRENT_APP_VERSION } from "@/lib/config";
import { useDialogStore } from "@/stores/dialog.store";
import UpdateNote from "@/components/dialog/UpdateNote";
import { useAppStore } from "@/stores/app.store";

export const useAppVersionControl = () => {
  const { openDialog } = useDialogStore();
  const { version, setVersion } = useAppStore();

  const handleUpdateClick = () => {
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => {
        // Mark this version as shown before reloading
        const shownUpdates = JSON.parse(
          localStorage.getItem("shownUpdates") || "{}"
        );
        shownUpdates[CURRENT_APP_VERSION] = true;
        localStorage.setItem("shownUpdates", JSON.stringify(shownUpdates));

        setVersion(CURRENT_APP_VERSION);
        window.location.reload();
      });
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    if ("serviceWorker" in navigator) {
      // Check if we've already shown this update
      const shownUpdates = JSON.parse(
        localStorage.getItem("shownUpdates") || "{}"
      );
      const shouldShowUpdate = !shownUpdates[CURRENT_APP_VERSION];

      // Check for version mismatch immediately
      if (version !== CURRENT_APP_VERSION && shouldShowUpdate) {
        openUpdateDialog();
        return;
      }

      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("[App] Service worker registered:", reg);

          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (
                  installingWorker.state === "installed" &&
                  shouldShowUpdate
                ) {
                  if (navigator.serviceWorker.controller) {
                    openUpdateDialog();
                  }
                }
              };
            }
          };
        })
        .catch(console.error);

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (shouldShowUpdate) {
          openUpdateDialog();
        }
      });

      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data === "reload-app" && shouldShowUpdate) {
          openUpdateDialog();
        }
      });
    }

    function openUpdateDialog() {
      // Mark this version as shown
      const shownUpdates = JSON.parse(
        localStorage.getItem("shownUpdates") || "{}"
      );
      shownUpdates[CURRENT_APP_VERSION] = true;
      localStorage.setItem("shownUpdates", JSON.stringify(shownUpdates));

      openDialog({
        kind: "Custom",
        title: "Update Note",
        CustomComponent: UpdateNote,
        customConfig: {
          buttonTitle: "Refresh",
          headerIcon: "/icons/update.svg",
        },
        actions: {
          Custom: handleUpdateClick,
        },
      });
    }
  }, [version]);
};
