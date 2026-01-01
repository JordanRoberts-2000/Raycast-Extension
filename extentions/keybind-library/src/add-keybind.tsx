import { Action, ActionPanel, Form } from "@raycast/api";
import { copyToClipboard } from "@strawr/raycast-utils";
import { MODIFIER_SYMBOLS } from "./constants";

export default function Command() {
  return (
     <Form
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
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Title" placeholder="Hide / Show terminal" />

      <Form.TextArea id="description" title="Description" placeholder="Optional notes or explanation" />

      <Form.Dropdown id="section" title="Section" defaultValue="uncategorized">
        <Form.Dropdown.Item value="uncategorized" title="Uncategorized" />
        <Form.Dropdown.Item value="vim" title="Vim" />
        <Form.Dropdown.Item value="vscode" title="VS Code" />
        <Form.Dropdown.Item value="misc" title="Misc" />
      </Form.Dropdown>

      <Form.TextField id="keybind" title="Keybind" placeholder="⌃`" />
    </Form>
  );
}
