import ReactDOMServer from "react-dom/server";
import type { IconContent, IconLibrary, SvgFormValues } from "../types";
import isJsxSvg from "./isJsxSvg";
import { LocalStorage, showToast, Toast } from "@raycast/api";
import svgFormSchema from "./svgFormSchema";
import { Dispatch, SetStateAction } from "react";

export default async function addSvg(
  formValues: SvgFormValues,
  library: IconLibrary,
  setLibrary: Dispatch<SetStateAction<IconLibrary>>,
  pop: () => void,
) {
  // todo: dynamic import of parse?
  const parsedValues = svgFormSchema.safeParse(formValues);
  if (!parsedValues.success) {
    const errorMessage = parsedValues.error.errors[0]?.message || "Invalid input";
    showToast({ title: `Validation Failed`, message: errorMessage, style: Toast.Style.Failure });
    return;
  }

  const { name, content, keywords } = parsedValues.data;

  if (library[name]) {
    showToast({ title: "Validation Failed", message: `'${name}' already exists`, style: Toast.Style.Failure });
    return;
  }

  let iconContent: IconContent = {
    content,
    keywords,
  };

  if (isJsxSvg(content)) {
    try {
      const parse = (await import("html-react-parser")).default;
      const Component = () => <>{parse(content)}</>;
      let htmlSVG = ReactDOMServer.renderToStaticMarkup(<Component />);
      iconContent.content = htmlSVG;
    } catch (error) {
      showToast({ title: `Detected jsx: Failed parse to html`, style: Toast.Style.Failure });
    }
  }

  const updatedLibrary = { ...library, [name]: iconContent };
  await LocalStorage.setItem("iconLibrary", JSON.stringify(updatedLibrary));
  setLibrary(updatedLibrary);
  showToast({ title: `'${name}' added`, style: Toast.Style.Success });
  pop();
}
