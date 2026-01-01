import { LocalStorage } from "@raycast/api";
import logger from "../lib/logger";

const STORAGE_KEY = "sections:v1";

export class SectionsService {
  async getAll(): Promise<string[]> {
    logger.debug(`[SectionsService.getAll] reading "${STORAGE_KEY}"`);

    const sectionsString = await LocalStorage.getItem<string>(STORAGE_KEY);
    if (!sectionsString) {
      logger.debug(`[SectionsService.getAll] no value found, returning []`);
      return [];
    }

    try {
      const parsed: unknown = JSON.parse(sectionsString);
      // todo validation
      logger.debug(`[SectionsService.getAll] loaded ${Array.isArray(parsed) ? parsed.length : "?"} sections`);
      return parsed as string[];
    } catch (err) {
      // todo handle error
      logger.error(`[SectionsService.getAll] failed to parse stored JSON`, err);
      return [];
    }
  }

  private async setAll(sections: string[]) {
    const payload = JSON.stringify(sections);

    logger.debug(`[SectionsService.setAll] writing ${sections.length} sections`);
    await LocalStorage.setItem(STORAGE_KEY, payload);
  }

  async create(input: string): Promise<string> {
    const newSection = input.trim();
    logger.debug(`[SectionsService.create] input="${input}" normalized="${newSection}"`);

    if (!newSection) {
      logger.warn(`[SectionsService.create] empty section name rejected`);
      throw new Error("Title cannot be empty");
    }

    const existing_sections = await this.getAll();

    const exists = existing_sections.some((s) => s.toLowerCase() === newSection.toLowerCase());
    if (exists) {
      logger.warn(`[SectionsService.create] duplicate rejected: "${newSection}"`);
      throw new Error(`Section "${newSection}" already exists`);
    }

    const new_arr = [newSection, ...existing_sections];
    await this.setAll(new_arr);
    logger.info(`[SectionsService.create] created "${newSection}" (total=${new_arr.length})`);

    return newSection;
  }

  async delete(input: string): Promise<void> {
    const section = input.trim();
    logger.debug(`[SectionsService.delete] input="${input}" normalized="${section}"`);

    if (!section) {
      logger.warn(`[SectionsService.delete] empty section name ignored`);
      return;
    }

    const sections = await this.getAll();
    const filteredSections = sections.filter((s) => s !== section);
    await this.setAll(filteredSections);
    logger.info(`[SectionsService.delete] deleted "${section}" (total=${filteredSections.length})`);
  }

  async update(oldSection: string, input: string): Promise<string> {
    const newSection = input.trim();
    logger.debug(`[SectionsService.update] old="${oldSection}" new="${newSection}"`);

    if (!newSection) {
      logger.warn(`[SectionsService.update] empty new name rejected`);
      throw new Error("Section name cannot be empty");
    }

    const sections = await this.getAll();

    const index = sections.findIndex((s) => s === oldSection);
    if (index === -1) {
      logger.warn(`[SectionsService.update] not found: "${oldSection}"`);
      throw new Error(`Section "${oldSection}" not found`);
    }

    if (sections.some((s) => s === newSection)) {
      logger.warn(`[SectionsService.update] rename collision: "${newSection}"`);
      throw new Error(`Section "${newSection}" already exists`);
    }

    const next = sections.slice();
    next[index] = newSection;

    await this.setAll(next);
    logger.info(`[SectionsService.update] renamed "${newSection}" -> "${oldSection}"`);

    return newSection;
  }
}

export const sectionsService = new SectionsService();
