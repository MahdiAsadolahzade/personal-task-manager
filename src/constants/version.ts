import { CURRENT_APP_VERSION } from "@/lib/config";
import { allUpdateNotes } from "./versions";

// src/constants/version.ts

export const CURRENT_UPDATE_NOTES =
  allUpdateNotes.find((u) => u.version === CURRENT_APP_VERSION) ??
  allUpdateNotes[0];
