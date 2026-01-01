import { Action, ActionPanel, Form, useNavigation } from "@raycast/api";
import { importLibraryData } from "../utils/manageLibraryData";
import { Dispatch, SetStateAction } from "react";
import { IconLibrary } from "../types";

type Props = {
  svgLibrary: IconLibrary;
  setSvgLibrary: Dispatch<SetStateAction<IconLibrary>>;
};

const ImportLibraryDataForm = ({ setSvgLibrary, svgLibrary }: Props) => {
  const { pop } = useNavigation();
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Import Library Data"
            onSubmit={({ content }) => importLibraryData(content as string, svgLibrary, setSvgLibrary, pop)}
          />
        </ActionPanel>
      }
    >
      <Form.TextArea id="content" title="SVG Content" />
    </Form>
  );
};

export default ImportLibraryDataForm;
