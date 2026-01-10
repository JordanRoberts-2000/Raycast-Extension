import { List } from "@raycast/api";
import { Keybind } from "../types";

export type SectionGroup = {
  section: string;
  items: Keybind[];
};

type Props = {
  sections: SectionGroup[];
  selectedSection: string;
  onSectionChange: (section: string) => void;
};

export function SectionFilterDropdown({ sections, selectedSection, onSectionChange }: Props) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <List.Dropdown tooltip="Filter by Section" value={selectedSection} onChange={onSectionChange}>
      <List.Dropdown.Item value="all" title="All" />
      <List.Dropdown.Section title="Sections">
        {sections.map(({ section }) => (
          <List.Dropdown.Item key={section} value={section} title={section} />
        ))}
      </List.Dropdown.Section>
    </List.Dropdown>
  );
}
