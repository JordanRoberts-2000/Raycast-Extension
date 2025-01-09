import { Form, ActionPanel, Action } from "@raycast/api";
import type { IconLibrary, SvgFormValues } from "../types";
import addSvg from "../utils/addSvg";
import { Dispatch, SetStateAction } from "react";

type Props = {
  library: IconLibrary;
  setLibrary: Dispatch<SetStateAction<IconLibrary>>;
};

export default function AddSvgForm({ library, setLibrary }: Props) {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Add SVG"
            onSubmit={(formValues: SvgFormValues) => addSvg(formValues, library, setLibrary)}
          />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" title="SVG Name" placeholder="Enter a unique name" />
      <Form.TextArea id="content" title="SVG Content" placeholder="<svg>...</svg>" />
      <Form.TextField
        id="keywords"
        title="Keywords"
        placeholder="Enter comma-separated keywords (e.g., icon, logo, graphic)"
      />
    </Form>
  );
}
