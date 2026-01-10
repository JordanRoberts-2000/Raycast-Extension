import { showToast, Toast, confirmAlert } from "@raycast/api";
import { sectionsService } from "../services/sections.service";

export function useSectionActions(revalidate?: () => Promise<string[]>) {
  return {
    createSection: async (name: string) => {
      await sectionsService.create(name);
      await showToast({
        style: Toast.Style.Success,
        title: "Section Created",
      });

      if (revalidate) {
        await revalidate();
      }
    },

    updateSection: async (oldName: string, newName: string) => {
      await sectionsService.update(oldName, newName);
      await showToast({
        style: Toast.Style.Success,
        title: "Section Renamed",
      });

      if (revalidate) {
        await revalidate();
      }
    },

    deleteSection: async (section: string) => {
      const confirmed = await confirmAlert({
        title: "Delete Section",
        message: `Delete "${section}"? All keybinds will be moved to Uncategorized.`,
        primaryAction: {
          title: "Delete",
        },
      });

      if (!confirmed) return;

      await sectionsService.delete(section);
      await showToast({
        style: Toast.Style.Success,
        title: "Section Deleted",
      });

      if (revalidate) {
        await revalidate();
      }
    },
  };
}
