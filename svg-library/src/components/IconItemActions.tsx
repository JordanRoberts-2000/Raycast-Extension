import { Action, ActionPanel, Icon } from "@raycast/api";
import AddSvgForm from "./AddSvgForm";
import EditSvgForm from "./EditSvgForm";
import type { IconContent, IconLibrary } from "../types";
import deleteSvg from "../utils/deleteSvg";
import { Dispatch, SetStateAction, useState } from "react";
import { addSvgHotkey, deleteSvgHotkey, editSvgHotkey } from "../constants";
import { copyAsFile, copyAsJsx } from "../utils/convertToJsx";

type props = IconContent & {
  name: string;
  svgLibrary: IconLibrary;
  setSvgLibrary: Dispatch<SetStateAction<IconLibrary>>;
};

const IconItemActions = ({ name, content, keywords, svgLibrary, setSvgLibrary }: props) => {
  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action title="Copy Html" onAction={() => console.log("hmm")} />
        <ActionPanel.Submenu title="Copy to clipboard" icon={Icon.Clipboard}>
          <Action.CopyToClipboard title="Copy Html" content={content} />
          <Action icon={Icon.Clipboard} title="Copy Jsx" onAction={() => copyAsJsx(content)} />
          <Action icon={Icon.Clipboard} title="Copy File" onAction={() => copyAsFile(content, name)} />
          <Action title="Copy Png" onAction={() => console.log("Add bug label")} />
        </ActionPanel.Submenu>
      </ActionPanel.Section>
      <ActionPanel.Section>
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
          target={
            <EditSvgForm
              name={name}
              content={content}
              keywords={keywords}
              library={svgLibrary}
              setLibrary={setSvgLibrary}
            />
          }
        />
        <Action
          icon={Icon.Trash}
          shortcut={deleteSvgHotkey}
          title="Delete Svg"
          onAction={() => deleteSvg(name, svgLibrary, setSvgLibrary)}
        />
      </ActionPanel.Section>
      <ActionPanel.Section>
        <Action icon={Icon.Gear} title="Parse Settings" onAction={() => deleteSvg(name, svgLibrary, setSvgLibrary)} />
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
      </ActionPanel.Section>
    </ActionPanel>
  );
};

export default IconItemActions;
