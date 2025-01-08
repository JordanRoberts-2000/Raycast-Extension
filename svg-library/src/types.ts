export type Storage = {
  sortBy?: SortBy;
  iconLibrary?: IconLibrary;
};

export type SortBy = "date" | "alphabetical" | "usage";

export type IconLibrary = Record<string, IconContent>;

type IconContent = {
  content: string;
  keywords: string[];
};
