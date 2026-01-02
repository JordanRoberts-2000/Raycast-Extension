import { Action, ActionPanel } from "@raycast/api";
import { MODIFIER_SYMBOLS } from "../constants";
import { copyToClipboard } from "@strawr/raycast-utils";
import SectionList from "../components/SectionList";
import { KeybindValues } from "../types";

type Props = {
  mode: "add" | "edit";
  onSubmit: (values: KeybindValues) => void;
};

export function AddKeybindActions({ mode, onSubmit }: Props) {
  const isEdit = mode === "edit";

  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action.SubmitForm title={isEdit ? "Save Changes" : "Add Keybind"} onSubmit={onSubmit} />
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
  );
}
