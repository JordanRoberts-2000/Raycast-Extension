import { Action, ActionPanel, confirmAlert, Icon, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { sectionsService } from "../services/sections.service";
import { SectionForm } from "./SectionForm";
import useSections from "../hooks/useSections";

export default function SectionList() {
  const { sections = [], isLoading, revalidate } = useSections();

  async function handleDelete(section: string) {
    const confirmed = await confirmAlert({
      title: "Delete Section",
      message: `Delete "${section}"? All keybinds will be moved to Uncategorized.`,
      primaryAction: {
        title: "Delete",
      },
    });

    if (!confirmed) return;

    await sectionsService.delete(section);
    await revalidate();
  }

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
                  target={<SectionForm mode="edit" section={section} onDone={revalidate} />}
                />

                <Action
                  title="Delete Section"
                  icon={Icon.Trash}
                  style={Action.Style.Destructive}
                  onAction={() => handleDelete(section)}
                />
              </ActionPanel.Section>

              <ActionPanel.Section>
                <Action.Push
                  title="Create New Section"
                  icon={Icon.Plus}
                  target={<SectionForm mode="create" onDone={revalidate} />}
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
              <Action.Push
                title="Create Section"
                icon={Icon.Plus}
                target={<SectionForm mode="create" onDone={revalidate} />}
              />
            </ActionPanel>
          }
        />
      )}
    </List>
  );
}
