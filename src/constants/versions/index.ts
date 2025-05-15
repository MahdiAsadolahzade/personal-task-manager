// src/constants/versions/index.ts
import { updateNotes as v100 } from "./1.0.0";
import { updateNotes as v000 } from "./0.0.0";

export const allUpdateNotes = [v000, v100]; // make sure order matches
export const CURRENT_UPDATE_NOTES = v000; // must match the CURRENT_APP_VERSION
