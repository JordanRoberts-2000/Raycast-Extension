import { Action, ActionPanel, Form, showToast, Toast, useNavigation } from "@raycast/api";
import { useState } from "react";
import { sectionsService } from "../services/sections.service";
import SectionList from "./SectionList";

type Props =
  | {
      mode: "create";
      onDone: () => void;
    }
  | {
      mode: "edit";
      section: string;
      onDone: () => void;
    };

export function SectionForm(props: Props) {
  const { push } = useNavigation();
  const [name, setName] = useState(props.mode === "edit" ? props.section : "");
  const isEdit = props.mode === "edit";

  async function handleSubmit() {
    try {
      if (isEdit) {
        await sectionsService.update(props.section, name);
      } else {
        await sectionsService.create(name);
      }

      await showToast({
        style: Toast.Style.Success,
        title: isEdit ? "Section Updated" : "Section Created",
      });

      props.onDone();
      push(<SectionList />);
    } catch (err) {
      await showToast({
        style: Toast.Style.Failure,
        title: (err as Error).message,
      });
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title={isEdit ? "Rename Section" : "Create Section"} onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" title="Section Name" value={name} onChange={setName} autoFocus />
    </Form>
  );
}
