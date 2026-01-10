import { Action, ActionPanel, Form } from "@raycast/api";
import { useState } from "react";

type Props = {
  onSubmit: (name: string) => Promise<void>;
  initialValue?: string;
};

export function SectionForm({ onSubmit, initialValue = "" }: Props) {
  const [name, setName] = useState(initialValue);

  async function handleSubmit() {
    await onSubmit(name);
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" title="Section Name" value={name} onChange={setName} autoFocus />
    </Form>
  );
}
