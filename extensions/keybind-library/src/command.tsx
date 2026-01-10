import { Action, ActionPanel, List } from "@raycast/api";
import useKeybinds from "./hooks/useKeybinds";
import KeybindsListItem from "./components/KeybindsListItem";
import AddKeybindAction from "./components/actions/AddKeybindAction";
import SectionList from "./components/SectionList";

export default function Command() {
  const {
    isLoading,
    revalidate,
    grouped: { sections, uncategorized },
  } = useKeybinds();
  return (
    <List
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <AddKeybindAction />
          <Action.Push title="Manage Sections" target={<SectionList />} />
        </ActionPanel>
      }
    >
      {uncategorized.map((keybind) => (
        <KeybindsListItem key={keybind.id} keybind={keybind} revalidate={revalidate} />
      ))}

      {sections.map(({ section, items }) => (
        <List.Section key={section} title={section}>
          {items.map((keybind) => (
            <KeybindsListItem key={keybind.id} keybind={keybind} revalidate={revalidate} />
          ))}
        </List.Section>
      ))}
    </List>
  );
}
