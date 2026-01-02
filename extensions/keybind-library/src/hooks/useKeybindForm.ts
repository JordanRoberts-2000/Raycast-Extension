import { FormValidation, useForm } from "@raycast/utils";
import { Keybind, KeybindValues } from "../types";

const requiredTrimmed = (value?: string) => {
  if (!value || !value.trim()) return "This field is required";
};

type UseKeybindFormArgs = {
  onSubmit: (values: KeybindValues) => void | Promise<void>;
  initialValues?: Partial<KeybindValues>;
};

export default function useKeybindForm({ onSubmit, initialValues }: UseKeybindFormArgs) {
  return useForm<KeybindValues>({
    onSubmit,
    validation: {
      title: requiredTrimmed,
      keybind: requiredTrimmed,
      section: FormValidation.Required,
    },
    initialValues,
  });
}
