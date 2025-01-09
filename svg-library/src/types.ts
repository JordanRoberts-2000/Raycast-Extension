export type Storage = {
  sortBy?: SortBy;
  iconLibrary?: string;
};

export type SortBy = "date" | "alphabetical" | "usage";

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
