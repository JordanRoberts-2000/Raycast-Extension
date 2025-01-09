import { Action, ActionPanel } from "@raycast/api";
import AddSvgForm from "./AddSvgForm";
import EditSvgForm from "./EditSvgForm";
import type { IconContent, IconLibrary } from "../types";
import deleteSvg from "../utils/deleteSvg";
import { Dispatch, SetStateAction } from "react";

type props = IconContent & {
  name: string;
  svgLibrary: IconLibrary;
  setSvgLibrary: Dispatch<SetStateAction<IconLibrary>>;
};

const IconItemActions = ({ name, content, keywords, svgLibrary, setSvgLibrary }: props) => {
  return (
    <ActionPanel>
      <Action.Paste title="Paste SVG Code" content={content} />
      <Action.CopyToClipboard title="Copy SVG Code" content={content} />
      <Action title="Delete SVG" onAction={() => deleteSvg(name, svgLibrary, setSvgLibrary)} />
      <Action.Push title="Add New SVG" target={<AddSvgForm library={svgLibrary} setLibrary={setSvgLibrary} />} />
      <Action.Push title="Edit SVG" target={<EditSvgForm name={name} content={content} />} />
    </ActionPanel>
  );
};

export default IconItemActions;
