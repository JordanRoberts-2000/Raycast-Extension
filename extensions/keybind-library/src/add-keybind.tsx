import { Action, ActionPanel, Form } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { copyToClipboard } from "@strawr/raycast-utils";
import { MODIFIER_SYMBOLS } from "./constants";
import { sectionsService } from "./services/sections.service";
import SectionList from "./components/SectionList";

export default function Command() {
  const { data: sections = [], isLoading } = usePromise(async () => {
    return await sectionsService.getAll();
  }, []);

  const dropdownSections = ["uncategorized", ...sections];
  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.SubmitForm
              title="Save Keybind"
              onSubmit={(values) => {
                console.log(values);
              }}
            />
          </ActionPanel.Section>
          <ActionPanel.Section title="Copy Symbols">
            {MODIFIER_SYMBOLS.map((s) => (
              <Action key={s} title={`Copy ${s}`} onAction={() => copyToClipboard(s)} />
            ))}
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action.Push title="Manage Sections" target={<SectionList />} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Title" placeholder="Hide / Show terminal" />

      <Form.TextArea id="description" title="Description" placeholder="Optional notes or explanation" />

      <Form.Dropdown id="section" title="Section" defaultValue="uncategorized">
        {dropdownSections.map((s) => (
          <Form.Dropdown.Item key={s} value={s} title={s} />
        ))}
      </Form.Dropdown>

      <Form.TextField id="keybind" title="Keybind" placeholder="⌃`" />
    </Form>
  );
}
