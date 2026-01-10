import { Action, ActionPanel, Icon, showToast, Toast, useNavigation } from "@raycast/api";
import { Keybind, KeybindInput } from "../../types";
import { keybindsService } from "../../services/keybinds.service";
import DeleteKeybindAction from "./DeleteKeybindAction";
import AddKeybindAction from "./AddKeybindAction";
import { KeybindForm } from "../forms/keybindForm";
import SectionList from "../SectionList";

type Props = {
  keybind: Keybind;
  revalidate: () => Promise<Keybind[]>;
};

export function ListItemActions({ keybind: k, revalidate }: Props) {
  const { pop } = useNavigation();

  async function handleSubmit(values: KeybindInput) {
    await keybindsService.update(k.id, values);
    revalidate();

    await showToast({
      style: Toast.Style.Success,
      title: "Keybind Updated",
    });

    pop();
  }

  return (
    <ActionPanel>
      <AddKeybindAction />
      <DeleteKeybindAction id={k.id} title={k.title} revalidate={revalidate} />
      <Action.Push
        icon={Icon.Pencil}
        title="Edit Keybind"
        target={<KeybindForm onSubmit={handleSubmit} initialValues={k} />}
      />
      <Action.Push icon={Icon.Gear} title="Manage Sections" target={<SectionList />} />
    </ActionPanel>
  );
}
