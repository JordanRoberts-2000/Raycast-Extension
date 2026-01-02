import { Form, showToast, Toast, useNavigation } from "@raycast/api";
import useKeybindForm from "../hooks/useKeybindForm";
import useSections from "../hooks/useSections";
import { keybindsService } from "../services/keybinds.service";
import { Keybind, KeybindValues } from "../types";
import { AddKeybindActions } from "../actions/AddKeybindActions";

type Props =
  | {
      mode: "add";
      initialValues?: Partial<KeybindValues>;
    }
  | {
      mode: "edit";
      id: string;
      revalidate: () => Promise<Keybind[]>;
      initialValues: Partial<KeybindValues>;
    };

export function KeybindForm(props: Props) {
  const { pop } = useNavigation();
  const { sections = [], isLoading } = useSections();

  const currentSection = props.initialValues?.section ?? "uncategorized";
  const dropdownSections = Array.from(new Set(["uncategorized", currentSection, ...sections].filter(Boolean)));

  const isEdit = props.mode === "edit";

  const onSubmit = async (v: KeybindValues) => {
    if (isEdit) {
      await keybindsService.update(props.id, v);
      props.revalidate();
    } else {
      await keybindsService.create(v);
    }

    await showToast({
      style: Toast.Style.Success,
      title: isEdit ? "Keybind Updated" : "Keybind Created",
    });

    pop();
  };

  const { itemProps, handleSubmit } = useKeybindForm({
    onSubmit,
    initialValues: props.initialValues,
  });

  return (
    <Form isLoading={isLoading} actions={<AddKeybindActions onSubmit={handleSubmit} mode={props.mode} />}>
      <Form.TextField title="Title" placeholder="Hide / Show terminal" {...itemProps.title} />
      <Form.TextArea title="Description" placeholder="Optional notes or explanation" {...itemProps.description} />
      <Form.Dropdown title="Section" isLoading={isLoading} {...itemProps.section}>
        {dropdownSections.map((s) => (
          <Form.Dropdown.Item key={s} value={s} title={s} />
        ))}
      </Form.Dropdown>
      <Form.TextField title="Keybind" placeholder="⌃`" {...itemProps.keybind} />
    </Form>
  );
}
