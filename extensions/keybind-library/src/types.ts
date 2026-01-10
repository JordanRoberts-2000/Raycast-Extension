export type Keybind = {
  id: string;
  title: string;
  description?: string;
  section: string;
  keybind: string;
};

export type KeybindInput = Omit<Keybind, "id">;
