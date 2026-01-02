import { List, Color, ActionPanel, Action, useNavigation } from "@raycast/api";
import useKeybinds from "./hooks/useKeybinds";
import { keybindsService } from "./services/keybinds.service";
import DeleteKeybindAction from "./components/actions/DeleteKeybindAction";
import { KeybindForm } from "./components/keybindForm";

export default function Command() {
  const {
    isLoading,
    revalidate,
    grouped: { sections, uncategorized },
  } = useKeybinds();
  const { push } = useNavigation();
  return (
    <List
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action title={"toggle"} onAction={() => {}} />
        </ActionPanel>
      }
    >
      {uncategorized.map((k) => {
        const { id, ...initialValues } = k;

        return (
          <List.Item
            key={id}
            title={k.title}
            subtitle={k.description}
            accessories={[{ tag: { value: k.keybind, color: Color.Green } }]}
            actions={
              <ActionPanel>
                <ActionPanel.Section>
                  <DeleteKeybindAction id={id} title={k.title} revalidate={revalidate} />

                  <Action
                    title="Edit"
                    onAction={() =>
                      push(<KeybindForm revalidate={revalidate} mode="edit" id={id} initialValues={initialValues} />)
                    }
                  />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        );
      })}

      {/* Grouped sections */}
      {sections.map(({ section, items }) => (
        <List.Section key={section} title={section}>
          {items.map((k) => {
            const { id, ...initialValues } = k;

            return (
              <List.Item
                key={id}
                title={k.title}
                subtitle={k.description}
                accessories={[{ tag: { value: k.keybind, color: Color.Green } }]}
                actions={
                  <ActionPanel>
                    <ActionPanel.Section>
                      <DeleteKeybindAction id={id} title={k.title} revalidate={revalidate} />

                      <Action
                        title="Edit"
                        onAction={() =>
                          push(
                            <KeybindForm revalidate={revalidate} mode="edit" id={id} initialValues={initialValues} />,
                          )
                        }
                      />
                    </ActionPanel.Section>
                  </ActionPanel>
                }
              />
            );
          })}
        </List.Section>
      ))}
    </List>
  );
}
