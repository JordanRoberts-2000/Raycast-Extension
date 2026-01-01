import { Dispatch, SetStateAction } from "react";
import { IconLibrary } from "../types";
import { LocalStorage } from "@raycast/api";

export default async function toggleFavorite(
  isFavorited: boolean,
  name: string,
  library: IconLibrary,
  setLibrary: Dispatch<SetStateAction<IconLibrary>>,
) {
  if (!library[name]) return;

  const updatedLibrary = {
    ...library,
    [name]: {
      ...library[name],
      isFavorited: !isFavorited,
    },
  };

  await LocalStorage.setItem("iconLibrary", JSON.stringify(updatedLibrary));
  setLibrary(updatedLibrary);
}
