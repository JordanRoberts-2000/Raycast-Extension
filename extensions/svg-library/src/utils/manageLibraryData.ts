import { Alert, confirmAlert, LocalStorage, open, showToast, Toast } from "@raycast/api";
import { writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { Dispatch, SetStateAction } from "react";
import { IconLibrary } from "../types";
import { libraryDataSchema } from "./svgFormSchema";

export async function exportLibraryData() {
  const data = await LocalStorage.getItem("iconLibrary");

  if (!data) {
    showToast({
      title: "Export Failed",
      message: "No library data found to export.",
      style: Toast.Style.Failure,
    });
    return;
  }

  const parsedData = JSON.parse(data as string);
  const jsonString = JSON.stringify(parsedData, null, 2); // Beautify the JSON

  const tempFilePath = join(tmpdir(), "localStorageBackup.json");
  await writeFile(tempFilePath, jsonString, "utf-8");

  await open(tempFilePath);
}

export async function importLibraryData(
  jsonString: string,
  library: IconLibrary,
  setLibrary: Dispatch<SetStateAction<IconLibrary>>,
  pop: () => void,
) {
  const confirmed = await confirmAlert({
    title: "Are you sure?",
    message: `This will overwrite any existing SVGs with shared names.`,
    primaryAction: {
      title: "Confirm",
      style: Alert.ActionStyle.Destructive,
    },
  });

  if (confirmed) {
    try {
      // Parse JSON
      let userJson: any;
      try {
        userJson = JSON.parse(jsonString);
      } catch (parseError) {
        showToast({ title: "Invalid JSON", message: "Failed to parse the JSON string.", style: Toast.Style.Failure });
        return;
      }

      // Validate JSON
      const validationResult = libraryDataSchema.safeParse(userJson);
      if (!validationResult.success) {
        const errorMessage = validationResult.error.errors[0]?.message || "Invalid input";
        showToast({ title: "Validation Failed", message: errorMessage, style: Toast.Style.Failure });
        return;
      }

      const data = validationResult.data;

      // Merge Data into LocalStorage and State
      const updatedLibrary = { ...library, ...data };
      await LocalStorage.setItem("iconLibrary", JSON.stringify(updatedLibrary));
      setLibrary(updatedLibrary);
      pop();
      showToast({ title: "Imported Library Data Successfully", style: Toast.Style.Success });
    } catch (error) {
      showToast({ title: "Failed to Import Library Data", style: Toast.Style.Failure });
    }
  }
}

export async function deleteLibraryData(setLibrary: Dispatch<SetStateAction<IconLibrary>>) {
  const confirmed = await confirmAlert({
    title: "Are you sure?",
    message: `This will permanently delete all stored svgs.`,
    primaryAction: {
      title: "Delete",
      style: Alert.ActionStyle.Destructive,
    },
  });

  if (confirmed) {
    try {
      await LocalStorage.setItem("iconLibrary", "{}");
      setLibrary({});
      showToast({ title: "Deleted Library successfully", style: Toast.Style.Success });
    } catch (error) {
      console.error("Error deleting library:", error);
      showToast({ title: "Failed to delete", style: Toast.Style.Failure });
    }
  }
}
