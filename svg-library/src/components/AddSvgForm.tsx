import { Form, ActionPanel, Action, Toast, showToast, LocalStorage } from "@raycast/api";
import type { IconContent } from "../types";

export default function AddSvgForm() {
  const handleSubmit = async (values: { name: string; content: string; keywords: string }) => {
    if (!values.name || !values.content) {
      showToast({ title: "Name and SVG content are required", style: Toast.Style.Failure });
      return;
    }

    const iconContent: IconContent = {
      content: values.content.trim(),
      keywords: values.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean), // Remove empty keywords
    };

    // todo: unique constraint
    // todo: zod parse
    // todo: 'added successfullt' message
    // todo: go back to home page
    const currentLibrary = await LocalStorage.getItem<string>("iconLibrary");
    const updatedLibrary = currentLibrary
      ? { ...JSON.parse(currentLibrary), [values.name.trim()]: iconContent }
      : { [values.name.trim()]: iconContent };

    await LocalStorage.setItem("iconLibrary", JSON.stringify(updatedLibrary));
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
      <Form.TextField
        id="keywords"
        title="Keywords"
        placeholder="Enter comma-separated keywords (e.g., icon, logo, graphic)"
      />
    </Form>
  );
}
