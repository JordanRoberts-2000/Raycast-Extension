export type Storage = {
  defaultAction?: DefaultAction;
  iconLibrary?: string;
};

export type DefaultAction = "copySvg" | "copyJsx" | "copyPng" | "copyFile" | "pasteSvg" | "pasteJsx";

export type IconLibrary = Record<string, IconContent>;

export type IconContent = {
  content: string;
  keywords: string[];
};

export type SvgFormValues = {
  name: string;
  content: string;
  keywords: string;
};
