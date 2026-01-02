import { LocalStorage } from "@raycast/api";
import { Keybind, KeybindValues } from "../types";
import logger from "../lib/logger";
import randomId from "../utils/randomId";

const STORAGE_KEY = "keybinds:v1";

export class KeybindsService {
  async getAll(): Promise<Keybind[]> {
    logger.debug("[keybinds.getAll] reading storage");
    const raw = await LocalStorage.getItem<string>(STORAGE_KEY);
    if (!raw) {
      logger.debug("[keybinds.getAll] empty storage");
      return [];
    }

    // todo handle error and validation
    try {
      const parsed = JSON.parse(raw) as Keybind[];
      logger.debug("[keybinds.getAll] parsed items", { count: parsed.length });
      return parsed as Keybind[];
    } catch (err) {
      logger.error("[keybinds.getAll] failed to parse storage, resetting", err);
      return [];
    }
  }

  private async writeAll(items: Keybind[]): Promise<void> {
    logger.debug("[keybinds.writeAll] writing storage", { count: items.length });
    await LocalStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  async create(input: KeybindValues): Promise<Keybind> {
    logger.info("[keybinds.create] start", {
      title: input.title,
      section: input.section ?? "uncategorized",
    });

    const all = await this.getAll();

    const item: Keybind = {
      id: randomId(),
      title: input.title,
      description: input.description,
      section: input.section,
      keybind: input.keybind,
    };

    await this.writeAll([item, ...all]);

    logger.info("keybinds.create: success", {
      id: item.id,
      section: item.section ?? "uncategorized",
    });

    return item;
  }

  async delete(id: string): Promise<void> {
    logger.info("[keybinds.remove] start", { id });

    const all = await this.getAll();
    const next = all.filter((k) => k.id !== id);

    // todo better validation?
    if (next.length === all.length) {
      logger.warn("[keybinds.remove] not found", { id });
      return;
    }

    await this.writeAll(next);
    logger.info("[keybinds.remove] success", { id });
  }

  async update(id: string, patch: Partial<KeybindValues>): Promise<Keybind> {
    logger.info("[keybinds.update] start", { id });

    const all = await this.getAll();
    const idx = all.findIndex((k) => k.id === id);

    if (idx === -1) {
      logger.warn("[keybinds.update] not found", { id });
      throw new Error("Keybind not found");
    }

    const current = all[idx];

    const updated: Keybind = {
      ...current,
      ...patch,
      description: patch.description !== undefined ? patch.description : current.description,
      section: patch.section !== undefined ? patch.section : current.section,
    };

    const next = [...all];
    next[idx] = updated;

    await this.writeAll(next);

    logger.info("[keybinds.update] success", { id });
    return updated;
  }
}

export const keybindsService = new KeybindsService();
