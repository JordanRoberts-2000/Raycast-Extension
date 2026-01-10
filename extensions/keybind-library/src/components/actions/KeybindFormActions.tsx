import { Action, ActionPanel, Icon } from "@raycast/api";
import { MODIFIER_SYMBOLS } from "../../constants";
import { copyToClipboard } from "@strawr/raycast-utils";
import SectionList from "../SectionList";
import { KeybindInput } from "../../types";

type Props = {
  onSubmit: (values: KeybindInput) => void;
};

export function KeybindFormActions({ onSubmit }: Props) {
  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action.SubmitForm title={"Save"} onSubmit={onSubmit} />
        <Action.Push icon={Icon.Gear} title="Manage Sections" target={<SectionList />} />
      </ActionPanel.Section>

      <ActionPanel.Section title="Copy Symbols">
        {MODIFIER_SYMBOLS.map((s) => (
          <Action key={s} title={`Copy ${s}`} onAction={() => copyToClipboard(s)} />
        ))}
      </ActionPanel.Section>
    </ActionPanel>
  );
}
