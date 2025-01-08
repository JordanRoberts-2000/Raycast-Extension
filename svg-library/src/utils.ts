import { LocalStorage } from "@raycast/api";

export const saveSVG = async (name: string, content: string) => {
  await LocalStorage.setItem(name, content);
};

export const getSVGs = async () => {
  return (await LocalStorage.getItem("svgLibrary")) || {};
};

export const handleDelete = async (title: string) => {
  await LocalStorage.removeItem(title);
};
