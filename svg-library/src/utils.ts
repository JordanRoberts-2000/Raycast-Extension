import { Alert, confirmAlert, LocalStorage, showToast, Toast } from "@raycast/api";
import { IconLibrary } from "./types";

export const saveSVG = async (name: string, content: string) => {
  await LocalStorage.setItem(name, content);
};
