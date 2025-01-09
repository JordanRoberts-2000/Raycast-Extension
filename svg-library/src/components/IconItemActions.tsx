import { Action, ActionPanel } from "@raycast/api";
import AddSvgForm from "./AddSvgForm";
import EditSvgForm from "./EditSvgForm";
import { handleDelete } from "../utils";
import type { IconContent, IconLibrary } from "../types";

type props = IconContent & {
  name: string;
  svgLibrary: IconLibrary;
};

const IconItemActions = ({ name, content, keywords, svgLibrary }: props) => {
  return (
    <ActionPanel>
      <Action.Paste title="Paste SVG Code" content={content} />
      <Action.CopyToClipboard title="Copy SVG Code" content={content} />
      <Action title="Delete SVG" onAction={() => handleDelete(name, svgLibrary)} />
      <Action.Push title="Add New SVG" target={<AddSvgForm />} />
      <Action.Push title="Edit SVG" target={<EditSvgForm name={name} content={content} />} />
    </ActionPanel>
  );
};

export default IconItemActions;
