import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { SectionForm } from "./forms/SectionForm";
import useSections from "../hooks/useSections";
import { useSectionActions } from "../hooks/useSectionsActions";

export default function SectionList() {
  const { sections = [], isLoading, revalidate } = useSections();
  const { createSection, updateSection, deleteSection } = useSectionActions(revalidate);

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search sections…">
      {sections.map((section) => (
        <List.Item
          key={section}
          title={section}
          icon={Icon.Folder}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <Action.Push
                  title="Rename Section"
                  icon={Icon.Pencil}
                  target={
                    <SectionForm onSubmit={(newName) => updateSection(section, newName)} initialValue={section} />
                  }
                />

                <Action
                  title="Delete Section"
                  icon={Icon.Trash}
                  style={Action.Style.Destructive}
                  onAction={() => deleteSection(section)}
                />
              </ActionPanel.Section>

              <ActionPanel.Section>
                <Action.Push
                  title="Create New Section"
                  icon={Icon.Plus}
                  target={<SectionForm onSubmit={createSection} />}
                />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}

      {sections.length === 0 && !isLoading && (
        <List.EmptyView
          title="No Sections"
          description="Create your first section to organize keybinds."
          actions={
            <ActionPanel>
              <Action.Push title="Create Section" icon={Icon.Plus} target={<SectionForm onSubmit={createSection} />} />
            </ActionPanel>
          }
        />
      )}
    </List>
  );
}
