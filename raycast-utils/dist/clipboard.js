import { Clipboard, Toast, showToast } from "@raycast/api";
export async function copyToClipboard(text) {
    await Clipboard.copy(text);
    await showToast({ style: Toast.Style.Success, title: `Copied ${text}` });
}
//# sourceMappingURL=clipboard.js.map