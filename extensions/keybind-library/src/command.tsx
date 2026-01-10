import { Action, ActionPanel, Icon, List } from "@raycast/api";
import useKeybinds from "./hooks/useKeybinds";
import KeybindsListItem from "./components/KeybindsListItem";
import AddKeybindAction from "./components/actions/AddKeybindAction";
import SectionList from "./components/SectionList";
import { useState } from "react";
import { SectionFilterDropdown } from "./components/SectionFilterDropdown";

export default function Command() {
  const [selectedSection, setSelectedSection] = useState<string>("all");

  const {
    isLoading,
    revalidate,
    grouped: { sections, uncategorized },
  } = useKeybinds();

  const filteredUncategorized = selectedSection === "all" ? uncategorized : [];

  const filteredSections =
    selectedSection === "all" ? sections : sections.filter(({ section }) => section === selectedSection);

  return (
    <List
      isLoading={isLoading}
      searchBarAccessory={
        <SectionFilterDropdown
          sections={sections}
          selectedSection={selectedSection}
          onSectionChange={setSelectedSection}
        />
      }
      actions={
        <ActionPanel>
          <AddKeybindAction />
          <Action.Push icon={Icon.Gear} title="Manage Sections" target={<SectionList />} />
        </ActionPanel>
      }
    >
      {filteredUncategorized.map((keybind) => (
        <KeybindsListItem key={keybind.id} keybind={keybind} revalidate={revalidate} />
      ))}

      {filteredSections.map(({ section, items }) => (
        <List.Section key={section} title={section}>
          {items.map((keybind) => (
            <KeybindsListItem key={keybind.id} keybind={keybind} revalidate={revalidate} />
          ))}
        </List.Section>
      ))}
    </List>
  );
}
