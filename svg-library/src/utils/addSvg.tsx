import parse from "html-react-parser";
import ReactDOMServer from "react-dom/server";
import type { IconContent, IconLibrary, SvgFormValues } from "../types";
import isJsxSvg from "./isJsxSvg";
import { LocalStorage } from "@raycast/api";
import svgFormSchema from "./svgFormSchema";
import { Dispatch, SetStateAction } from "react";

export default async function addSvg(
  formValues: SvgFormValues,
  library: IconLibrary,
  setLibrary: Dispatch<SetStateAction<IconLibrary>>,
) {
  // todo: dynamic import of parse?
  const parsedValues = svgFormSchema.safeParse(formValues);
  if (!parsedValues.success) {
    console.log("Schema Error");
    // todo: handle error
    return;
  }

  const { name, content, keywords } = parsedValues.data;

  if (library[name]) {
    console.log("Already exists");
    // todo: handle error
    return;
  }

  let iconContent: IconContent = {
    content,
    keywords,
  };

  if (isJsxSvg(content)) {
    // todo: unhandled error here?
    const Component = () => <>{parse(content)}</>;
    let htmlSVG = ReactDOMServer.renderToStaticMarkup(<Component />);
    iconContent.content = htmlSVG;
  }

  const updatedLibrary = { ...library, [name]: iconContent };
  await LocalStorage.setItem("iconLibrary", JSON.stringify(updatedLibrary));
  setLibrary(updatedLibrary);
}
