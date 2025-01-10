import { Action, Icon } from "@raycast/api";
import type { DefaultAction as DefaultActionType } from "../types";
import { copyAsFile, copyAsJsx, copyAsPng, pasteAsJsx } from "../utils/copyOptions";

type Props = {
  content: string;
  name: string;
  defaultAction: DefaultActionType;
};

const DefaultAction = ({ defaultAction, content, name }: Props) => {
  switch (defaultAction) {
    case "copySvg":
      return <Action.CopyToClipboard title="Copy Html" content={content} />;
    case "copyJsx":
      return <Action icon={Icon.Clipboard} title="Copy Jsx" onAction={() => copyAsJsx(content)} />;
    case "copyFile":
      return <Action icon={Icon.Clipboard} title="Copy File" onAction={() => copyAsFile(content, name)} />;
    case "copyPng":
      return <Action icon={Icon.Clipboard} title="Copy Png" onAction={() => copyAsPng(content, name)} />;
    case "pasteSvg":
      return <Action.Paste icon={Icon.Clipboard} title="Paste Html" content={content} />;
    case "pasteJsx":
      return <Action icon={Icon.Clipboard} title="Paste Jsx" onAction={() => pasteAsJsx(content)} />;
  }
};

export default DefaultAction;
