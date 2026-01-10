// components/actions/DeleteKeybindAction.tsx
import { Action, Icon } from "@raycast/api";
import { useKeybindActions } from "../../hooks/useKeybindActions";
import { Keybind } from "../../types";

type DeleteKeybindActionProps = {
  id: string;
  title?: string;
  revalidate: () => Promise<Keybind[]>;
};

export default function DeleteKeybindAction({ id, title, revalidate }: DeleteKeybindActionProps) {
  const { deleteKeybind } = useKeybindActions(revalidate);
  return (
    <Action
      icon={Icon.Trash}
      title="Delete Keybind"
      style={Action.Style.Destructive}
      onAction={() => deleteKeybind(id, title)}
    />
  );
}
