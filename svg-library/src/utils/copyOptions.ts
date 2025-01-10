import { transform } from "@svgr/core";
import { Clipboard, showToast, Toast, closeMainWindow } from "@raycast/api";
import jsxPlugin from "@svgr/plugin-jsx";
import prettierPlugin from "@svgr/plugin-prettier";
import { tmpdir } from "os";
import { join } from "path";
import { writeFile } from "fs/promises";
import sharp from "sharp";
import { pngSize } from "../constants";

export async function copyAsJsx(content: string) {
  try {
    const jsxCode = await transform(content, {
      plugins: [jsxPlugin, prettierPlugin],
      prettier: true,
      icon: true,
      expandProps: false,
      template: ({ jsx }) => jsx as any,
    });

    await Clipboard.copy(jsxCode.replace(/;\s*$/, ""));
    closeMainWindow();
  } catch (error) {
    showToast({ title: "Failed to parse html to jsx", style: Toast.Style.Failure });
  }
}

export async function pasteAsJsx(content: string) {
  try {
    const jsxCode = await transform(content, {
      plugins: [jsxPlugin, prettierPlugin],
      prettier: true,
      icon: true,
      expandProps: false,
      template: ({ jsx }) => jsx as any,
    });

    await Clipboard.paste(jsxCode.replace(/;\s*$/, ""));
    closeMainWindow();
  } catch (error) {
    showToast({ title: "Failed to parse html to jsx", style: Toast.Style.Failure });
  }
}

export async function copyAsFile(content: string, name: string) {
  const safeName = name.replace(/[^a-zA-Z0-9_\-]/g, "_") || "_icon";
  try {
    const tempFilePath = join(tmpdir(), `${safeName}.svg`);
    await writeFile(tempFilePath, content, "utf-8");
    await Clipboard.copy({ file: tempFilePath });
    closeMainWindow();
  } catch (error) {
    showToast({ title: "Failed to parse html to file", style: Toast.Style.Failure });
  }
}

export async function copyAsPng(content: string, name: string) {
  const safeName = name.replace(/[^a-zA-Z0-9_\-]/g, "_") || "_icon";
  try {
    const tempFilePath = join(tmpdir(), `${safeName}.png`);
    const pngBuffer = await sharp(Buffer.from(content)).resize(pngSize, pngSize).png().toBuffer();

    await writeFile(tempFilePath, pngBuffer);

    await Clipboard.copy({ file: tempFilePath });
    closeMainWindow();
  } catch (error) {
    showToast({ title: "Failed to parse html to file", style: Toast.Style.Failure });
  }
}
