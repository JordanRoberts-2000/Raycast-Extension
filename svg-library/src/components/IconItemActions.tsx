import { Action, ActionPanel, Icon } from "@raycast/api";
import AddSvgForm from "./AddSvgForm";
import EditSvgForm from "./EditSvgForm";
import type { IconContent, IconLibrary } from "../types";
import deleteSvg from "../utils/deleteSvg";
import { Dispatch, SetStateAction, useState } from "react";
import { addSvgHotkey, deleteSvgHotkey, editSvgHotkey } from "../constants";
import { copyAsFile, copyAsJsx, copyAsPng } from "../utils/copyOptions";
import DefaultAction from "./DefaultAction";
import type { DefaultAction as DefaultActionType } from "../types";
import { deleteLibraryData, exportLibraryData } from "../utils/manageLibraryData";
import ImportLibraryDataForm from "./ImportLibraryDataForm";

type props = IconContent & {
  defaultAction: DefaultActionType;
  name: string;
  svgLibrary: IconLibrary;
  setSvgLibrary: Dispatch<SetStateAction<IconLibrary>>;
};

const IconItemActions = ({ name, content, keywords, svgLibrary, setSvgLibrary, defaultAction }: props) => {
  return (
    <ActionPanel>
      <ActionPanel.Section>
        <DefaultAction name={name} content={content} defaultAction={defaultAction} />
        <ActionPanel.Submenu title="Copy to clipboard" icon={Icon.Clipboard}>
          <Action.CopyToClipboard title="Copy Html" content={content} />
          <Action icon={Icon.Clipboard} title="Copy Jsx" onAction={() => copyAsJsx(content)} />
          <Action icon={Icon.Clipboard} title="Copy File" onAction={() => copyAsFile(content, name)} />
          <Action icon={Icon.Clipboard} title="Copy Png" onAction={() => copyAsPng(content, name)} />
        </ActionPanel.Submenu>
      </ActionPanel.Section>
      <ActionPanel.Section>
        <Action.Push
          icon={Icon.Heart}
          shortcut={addSvgHotkey}
          title="Add To Favourites"
          target={<AddSvgForm library={svgLibrary} setLibrary={setSvgLibrary} />}
        />
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
        <Action icon={Icon.NewDocument} title="Export Library JSON" onAction={() => exportLibraryData()} />
        <Action.Push
          target={<ImportLibraryDataForm setSvgLibrary={setSvgLibrary} svgLibrary={svgLibrary} />}
          icon={Icon.SaveDocument}
          title="Import Library JSON"
        />
        <Action
          icon={Icon.ExclamationMark}
          title="Delete All Svg's"
          onAction={() => deleteLibraryData(setSvgLibrary)}
        />
      </ActionPanel.Section>
    </ActionPanel>
  );
};

export default IconItemActions;
