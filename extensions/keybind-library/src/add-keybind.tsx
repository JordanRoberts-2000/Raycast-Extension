import { Form, showToast, Toast, useNavigation } from "@raycast/api";
import useSections from "./hooks/useSections";
import { AddKeybindActions } from "./actions/AddKeybindActions";
import { KeybindValues } from "./types";
import useKeybindForm from "./hooks/useKeybindForm";
import { keybindsService } from "./services/keybinds.service";
import { KeybindForm } from "./components/keybindForm";

export default function Command() {
  const { pop } = useNavigation();
  const { sections = [], isLoading } = useSections();
  const dropdownSections = ["uncategorized", ...sections];

  return <KeybindForm mode="add" />;
}
