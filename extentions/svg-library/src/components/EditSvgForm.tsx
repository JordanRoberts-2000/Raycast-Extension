import { Form, ActionPanel, Action, useNavigation, showToast, Toast, LocalStorage } from "@raycast/api";
import { IconLibrary, SvgFormValues } from "../types";
import { Dispatch, SetStateAction } from "react";
import { contentSchema, keywordsSchema, svgFormSchema } from "../utils/svgFormSchema";

type Props = {
  name: string;
  content: string;
  keywords: string[];
  library: IconLibrary;
  setLibrary: Dispatch<SetStateAction<IconLibrary>>;
};

export default function EditSvgForm({ name, content, keywords, library, setLibrary }: Props) {
  const { pop } = useNavigation();

  const handleSubmit = async (formValues: SvgFormValues) => {
    const isUnchanged =
      formValues.name.trim() === name &&
      formValues.content.trim() === content &&
      formValues.keywords === keywords.join(",");
    if (isUnchanged) {
      pop();
      return;
    }

    const updatedLibrary = { ...library };

    let editedContent = content;
    if (formValues.content.trim() !== content) {
      const { success, error, data } = await contentSchema.safeParseAsync(formValues.content);
      if (!success) {
        const errorMessage = error.errors[0]?.message || "Invalid input";
        showToast({ title: `Validation Failed`, message: errorMessage, style: Toast.Style.Failure });
        return;
      }
      editedContent = data;
    }

    let editedKeywords = keywords;
    if (formValues.keywords !== keywords.join(",")) {
      const { success, error, data } = keywordsSchema.safeParse(formValues.keywords);
      if (!success) {
        const errorMessage = error.errors[0]?.message || "Invalid input";
        showToast({ title: `Validation Failed`, message: errorMessage, style: Toast.Style.Failure });
        return;
      }
      editedKeywords = data;
    }

    let editedName = name;
    if (formValues.name.trim() !== name) {
      const { success, error, data } = svgFormSchema.shape.name.safeParse(formValues.name);
      if (!success) {
        const errorMessage = error.errors[0]?.message || "Invalid input";
        showToast({ title: `Validation Failed`, message: errorMessage, style: Toast.Style.Failure });
        return;
      }

      if (library[data]) {
        showToast({ title: "Validation Failed", message: `'${data}' already exists`, style: Toast.Style.Failure });
        return;
      }
      editedName = data;
      delete updatedLibrary[name];
    }

    updatedLibrary[editedName] = {
      ...updatedLibrary[editedName],
      content: editedContent,
      keywords: editedKeywords,
    };

    await LocalStorage.setItem("iconLibrary", JSON.stringify(updatedLibrary));
    setLibrary(updatedLibrary);
    showToast({ title: `'${name}' edited`, style: Toast.Style.Success });
    pop();
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Edit Svg" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" title="Svg Name" defaultValue={name} />
      <Form.TextArea id="content" title="Svg Content" defaultValue={content} />
      <Form.TextField
        id="keywords"
        title="Search Keywords"
        defaultValue={keywords.join(", ")}
        placeholder="Comma-separated (e.g., auth, form, input)"
      />
    </Form>
  );
}
