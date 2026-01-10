import { Form } from "@raycast/api";
import { KeybindInput } from "../../types";
import useSections from "../../hooks/useSections";
import useKeybindForm from "../../hooks/useKeybindForm";
import { KeybindFormActions } from "../actions/KeybindFormActions";

type Props = {
  onSubmit: (values: KeybindInput) => void | Promise<void>;
  initialValues?: KeybindInput;
};

export function KeybindForm({ onSubmit, initialValues }: Props) {
  const { sections = [], isLoading } = useSections();

  const currentSection = initialValues?.section ?? "uncategorized";
  const dropdownSections = Array.from(new Set(["uncategorized", currentSection, ...sections].filter(Boolean)));

  const { itemProps, handleSubmit } = useKeybindForm({
    onSubmit,
    initialValues,
  });

  return (
    <Form isLoading={isLoading} actions={<KeybindFormActions onSubmit={handleSubmit} />}>
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
