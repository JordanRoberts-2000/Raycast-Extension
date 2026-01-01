import { Clipboard, Toast, showToast } from "@raycast/api";

export async function copyToClipboard(text: string) {
  await Clipboard.copy(text);
  await showToast({ style: Toast.Style.Success, title: `Copied ${text}` });
}
