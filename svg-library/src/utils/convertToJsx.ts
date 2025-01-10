import { transform } from "@svgr/core";
import { Clipboard, showToast, Toast, closeMainWindow } from "@raycast/api";
import jsxPlugin from "@svgr/plugin-jsx";
import prettierPlugin from "@svgr/plugin-prettier";

export async function copyJsx(content: string) {
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
    console.log(error);
    showToast({ title: "Failed to parse html to jsx", style: Toast.Style.Failure });
  }
}
