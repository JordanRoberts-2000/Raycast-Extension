// components/actions/DeleteKeybindAction.tsx
import { Action, Alert, confirmAlert } from "@raycast/api";
import { keybindsService } from "../../services/keybinds.service";

type DeleteKeybindActionProps = {
  id: string;
  title?: string;
  revalidate: () => Promise<unknown> | void;
};

export default function DeleteKeybindAction({ id, title, revalidate }: DeleteKeybindActionProps) {
  return (
    <Action
      title="Delete Keybind"
      style={Action.Style.Destructive}
      onAction={async () => {
        const confirmed = await confirmAlert({
          title: "Delete Keybind",
          message: title ? `Delete "${title}"?` : "Are you sure you want to delete this keybind?",
          primaryAction: {
            title: "Delete",
            style: Alert.ActionStyle.Destructive,
          },
        });

        if (!confirmed) return;

        await keybindsService.delete(id);
        await revalidate();
      }}
    />
  );
}
