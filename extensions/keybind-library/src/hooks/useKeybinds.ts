import { usePromise } from "@raycast/utils";
import { keybindsService } from "../services/keybinds.service";
import type { Keybind } from "../types";
import { groupAndSortKeybinds } from "../utils/groupAndSortKeybinds";

export default function useKeybinds() {
  const {
    data: all = [],
    isLoading,
    revalidate,
  } = usePromise(async () => {
    return await keybindsService.getAll();
  }, []);

  const grouped = groupAndSortKeybinds(all as Keybind[]);

  return {
    all: all as Keybind[],
    grouped,
    revalidate,
    isLoading,
  };
}
