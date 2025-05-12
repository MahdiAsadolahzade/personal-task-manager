// src/lib/getVersions.ts (server-only)
import fs from "fs";
import path from "path";

interface UpdateNotes {
  version: string;
  features: string[];
  fixes?: string[];
  improvements?: string[];
}

export async function getAllUpdateNotes() {
  const versionsDir = path.join(process.cwd(), "src/constants/versions");

  const versionFiles = fs
    .readdirSync(versionsDir)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts");

  // Sort descending semver
  versionFiles.sort((a, b) => {
    const versionA = a.replace(".ts", "");
    const versionB = b.replace(".ts", "");
    return versionB.localeCompare(versionA, undefined, { numeric: true, sensitivity: "base" });
  });

  const allUpdateNotes: UpdateNotes[] = await Promise.all(
    versionFiles.map(async (file) => {
      const version = file.replace(".ts", "");
      // Destructure the imported module to avoid assigning to `module`
      const { updateNotes } = await import(`../constants/versions/${version}`);
      return updateNotes as UpdateNotes;
    })
  );

  const CURRENT_APP_VERSION = versionFiles[0].replace(".ts", "");

  const CURRENT_UPDATE_NOTES = allUpdateNotes.find(
    (note) => note.version === CURRENT_APP_VERSION
  );

  return { CURRENT_APP_VERSION, allUpdateNotes, CURRENT_UPDATE_NOTES };
}