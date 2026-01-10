import { Action, Icon } from "@raycast/api";
import { useKeybindActions } from "../../hooks/useKeybindActions";
import { KeybindForm } from "../forms/keybindForm";

const AddKeybindAction = () => {
  const { createKeybind } = useKeybindActions();
  return <Action.Push icon={Icon.Plus} title="Add Keybind" target={<KeybindForm onSubmit={createKeybind} />} />;
};

export default AddKeybindAction;
