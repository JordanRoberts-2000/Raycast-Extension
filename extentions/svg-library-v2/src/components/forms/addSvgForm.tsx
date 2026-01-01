import { Action, ActionPanel, Form } from "@raycast/api";

export default function AddSvgForm({}) {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Add SVG"
            onSubmit={() => {
              console.log("submit form");
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField autoFocus id="title" title="SVG Title" placeholder="Enter a unique title" />
      <Form.TextArea id="content" title="SVG Content" placeholder="<svg>...</svg>" />
      <Form.TextField id="keywords" title="Search Keywords" placeholder="Comma-separated eg: 'auth, form, input'" />
    </Form>
  );
}
