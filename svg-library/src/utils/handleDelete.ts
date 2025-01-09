import { Alert, confirmAlert, LocalStorage, showToast, Toast } from "@raycast/api";
import { IconLibrary } from "../types";

export default async function handleDelete(name: string, library: IconLibrary) {
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
      showToast({ title: "Deleted successfully", style: Toast.Style.Success });
    } catch (error) {
      console.error("Error deleting item:", error);
      showToast({ title: "Failed to delete", style: Toast.Style.Failure });
    }
  }
}
