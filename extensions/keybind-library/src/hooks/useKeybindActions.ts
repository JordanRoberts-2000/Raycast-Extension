import { Alert, confirmAlert, showToast, Toast, useNavigation } from "@raycast/api";
import { Keybind, KeybindInput } from "../types";
import { keybindsService } from "../services/keybinds.service";

export function useKeybindActions(revalidate?: () => Promise<Keybind[]>) {
  const { pop } = useNavigation();

  return {
    createKeybind: async (input: KeybindInput) => {
      await keybindsService.create(input);
      await showToast({
        style: Toast.Style.Success,
        title: "Keybind Created",
      });
      pop();
    },

    updateKeybind: async (id: string, input: KeybindInput) => {
      await keybindsService.update(id, input);
      await showToast({
        style: Toast.Style.Success,
        title: "Keybind Updated",
      });
      pop();
    },

    deleteKeybind: async (id: string, title?: string) => {
      const confirmed = await confirmAlert({
        title: "Delete Keybind",
        message: title ? `Delete "${title}"?` : "Are you sure you want to delete this keybind?",
        primaryAction: {
          title: "Delete",
          style: Alert.ActionStyle.Destructive,
        },
      });

      if (!confirmed) return;

      await keybindsService.delete(id);
      await showToast({
        style: Toast.Style.Success,
        title: "Keybind Deleted",
      });

      if (revalidate) {
        await revalidate();
      }
    },
  };
}
