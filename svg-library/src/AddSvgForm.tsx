import { Form, ActionPanel, Action, Toast, showToast, LocalStorage } from "@raycast/api";

export default function AddSvgForm() {
  const handleSubmit = async (values: { name: string; content: string }) => {
    if (!values.name || !values.content) {
      showToast({ title: "Name and SVG content are required", style: Toast.Style.Failure });
      return;
    }
    await LocalStorage.setItem(values.name, values.content);
    console.log("Saved successfully");
  };
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add SVG" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" title="SVG Name" placeholder="Enter a unique name" />
      <Form.TextArea id="content" title="SVG Content" placeholder="<svg>...</svg>" />
    </Form>
  );
}
