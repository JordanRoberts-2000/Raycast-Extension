import { Form, ActionPanel, Action, LocalStorage } from "@raycast/api";

type Props = { name: string; content: string };

export default function EditSvgForm({ name, content }: Props) {
  const handleSubmit = async (values: { name: string; content: string }) => {
    await LocalStorage.setItem(values.name, values.content);
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Edit SVG" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" title="SVG Name" defaultValue={name} />
      <Form.TextArea id="content" title="SVG Content" defaultValue={content} />
    </Form>
  );
}
