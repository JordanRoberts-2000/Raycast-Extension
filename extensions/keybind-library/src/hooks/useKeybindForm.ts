import { FormValidation, useForm } from "@raycast/utils";
import { KeybindInput } from "../types";

const requiredTrimmed = (value?: string) => {
  if (!value || !value.trim()) return "This field is required";
};

type UseKeybindFormArgs = {
  onSubmit: (values: KeybindInput) => void | Promise<void>;
  initialValues?: KeybindInput;
};

export default function useKeybindForm({ onSubmit, initialValues }: UseKeybindFormArgs) {
  return useForm<KeybindInput>({
    onSubmit,
    validation: {
      title: requiredTrimmed,
      keybind: requiredTrimmed,
      section: FormValidation.Required,
    },
    initialValues,
  });
}
