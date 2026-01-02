import { Keybind } from "../types";

export function groupAndSortKeybinds(keybinds: Keybind[]): {
  uncategorized: Keybind[];
  sections: Array<{ section: string; items: Keybind[] }>;
} {
  const grouped = keybinds.reduce<Record<string, Keybind[]>>((acc, keybind) => {
    const section = keybind.section ?? "uncategorized";
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(keybind);
    return acc;
  }, {});

  const uncategorized = (grouped.uncategorized ?? []).sort((a, b) => a.title.localeCompare(b.title));

  const sections = Object.entries(grouped)
    .filter(([section]) => section !== "uncategorized")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([section, items]) => ({
      section,
      items: items.sort((a, b) => a.title.localeCompare(b.title)),
    }));

  return { uncategorized, sections };
}
