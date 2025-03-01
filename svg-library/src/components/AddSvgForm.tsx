import { Form, ActionPanel, Action, useNavigation } from "@raycast/api";
import type { IconLibrary, SvgFormValues } from "../types";
import addSvg from "../utils/addSvg";
import { Dispatch, SetStateAction } from "react";

type Props = {
  library: IconLibrary;
  setLibrary: Dispatch<SetStateAction<IconLibrary>>;
};

export default function AddSvgForm({ library, setLibrary }: Props) {
  const { pop } = useNavigation();
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Add SVG"
            onSubmit={(formValues: SvgFormValues) => addSvg(formValues, library, setLibrary, pop)}
          />
        </ActionPanel>
      }
    >
      <Form.TextField autoFocus id="name" title="SVG Name" placeholder="Enter a unique name" />
      <Form.TextArea id="content" title="SVG Content" placeholder="<svg>...</svg>" />
      <Form.TextField id="keywords" title="Search Keywords" placeholder="Comma-separated (e.g., auth, form, input)" />
      <Form.Checkbox id="isFavorited" label="Add as favorited?" defaultValue={false} />
    </Form>
  );
}
