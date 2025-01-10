import { transform } from "@svgr/core";
import { Clipboard, showToast, Toast, closeMainWindow } from "@raycast/api";
import jsxPlugin from "@svgr/plugin-jsx";
import prettierPlugin from "@svgr/plugin-prettier";
import { tmpdir } from "os";
import { join } from "path";
import { writeFile } from "fs/promises";

export async function copyAsJsx(content: string) {
  try {
    const jsxCode = await transform(content, {
      plugins: [jsxPlugin, prettierPlugin],
      prettier: true,
      icon: false,
      template: ({ jsx }) => jsx as any,
    });

    await Clipboard.copy(jsxCode.replace(/\{\.\.\.props\}/g, "").replace(/;\s*$/, ""));
    closeMainWindow();
  } catch (error) {
    showToast({ title: "Failed to parse html to jsx", style: Toast.Style.Failure });
  }
}

export async function copyAsFile(content: string, name: string) {
  // todo: check name is valid to be file other wise: _icon.svg
  try {
    // todo: maybe double check tmpdir takes care of itself
    const tempFilePath = join(tmpdir(), `${name}.svg`);
    await writeFile(tempFilePath, content, "utf-8");
    await Clipboard.copy({ file: tempFilePath });
    closeMainWindow();
  } catch (error) {
    showToast({ title: "Failed to parse html to file", style: Toast.Style.Failure });
  }
}
