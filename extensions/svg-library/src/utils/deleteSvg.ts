import { Alert, confirmAlert, LocalStorage, showToast, Toast } from "@raycast/api";
import { IconLibrary } from "../types";
import { Dispatch, SetStateAction } from "react";

export default async function deleteSvg(
  name: string,
  library: IconLibrary,
  setLibrary: Dispatch<SetStateAction<IconLibrary>>,
) {
  const confirmed = await confirmAlert({
    title: "Are you sure?",
    message: `This will permanently delete "${name}".`,
    primaryAction: {
      title: "Delete",
      style: Alert.ActionStyle.Destructive,
    },
  });

  if (confirmed) {
    try {
      const updatedLibrary = { ...library };
      delete updatedLibrary[name];
      await LocalStorage.setItem("iconLibrary", JSON.stringify(updatedLibrary));
      setLibrary(updatedLibrary);
      showToast({ title: "Deleted successfully", style: Toast.Style.Success });
    } catch (error) {
      console.error("Error deleting item:", error);
      showToast({ title: "Failed to delete", style: Toast.Style.Failure });
    }
  }
}
