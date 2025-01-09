import { Action, ActionPanel, Icon } from "@raycast/api";
import AddSvgForm from "./AddSvgForm";
import EditSvgForm from "./EditSvgForm";
import type { IconContent, IconLibrary } from "../types";
import deleteSvg from "../utils/deleteSvg";
import { Dispatch, SetStateAction } from "react";
import { addSvgHotkey, deleteSvgHotkey, editSvgHotkey } from "../constants";

type props = IconContent & {
  name: string;
  svgLibrary: IconLibrary;
  setSvgLibrary: Dispatch<SetStateAction<IconLibrary>>;
};

const IconItemActions = ({ name, content, keywords, svgLibrary, setSvgLibrary }: props) => {
  return (
    <ActionPanel>
      <Action.CopyToClipboard title="Copy Svg" content={content} />
      <Action.Paste icon={Icon.Upload} title="Paste Svg" content={content} />
      <Action.Push
        icon={Icon.Plus}
        shortcut={addSvgHotkey}
        title="Add New Svg"
        target={<AddSvgForm library={svgLibrary} setLibrary={setSvgLibrary} />}
      />
      <Action.Push
        icon={Icon.Pencil}
        shortcut={editSvgHotkey}
        title="Edit Svg"
        target={<EditSvgForm name={name} content={content} />}
      />
      <Action
        icon={Icon.Trash}
        shortcut={deleteSvgHotkey}
        title="Delete Svg"
        onAction={() => deleteSvg(name, svgLibrary, setSvgLibrary)}
      />
      <Action
        icon={Icon.RotateAntiClockwise}
        title="Reset svg usage counters"
        onAction={() => deleteSvg(name, svgLibrary, setSvgLibrary)}
      />
      <Action
        icon={Icon.ExclamationMark}
        title="Delete All Svg's"
        onAction={() => deleteSvg(name, svgLibrary, setSvgLibrary)}
      />
    </ActionPanel>
  );
};

export default IconItemActions;
