import type { IconLibrary, SvgFormValues } from "../types";
import { LocalStorage, showToast, Toast } from "@raycast/api";
import { svgFormSchema } from "./svgFormSchema";
import { Dispatch, SetStateAction } from "react";

export default async function addSvg(
  formValues: SvgFormValues,
  library: IconLibrary,
  setLibrary: Dispatch<SetStateAction<IconLibrary>>,
  pop: () => void,
) {
  const parsedValues = await svgFormSchema.safeParseAsync(formValues);
  if (!parsedValues.success) {
    const errorMessage = parsedValues.error.errors[0]?.message || "Invalid input";
    showToast({ title: `Validation Failed`, message: errorMessage, style: Toast.Style.Failure });
    return;
  }

  const { name, content, keywords, isFavorited } = parsedValues.data;

  if (library[name]) {
    showToast({ title: "Validation Failed", message: `'${name}' already exists`, style: Toast.Style.Failure });
    return;
  }

  const updatedLibrary = { ...library, [name]: { content, keywords, isFavorited } };

  await LocalStorage.setItem("iconLibrary", JSON.stringify(updatedLibrary));
  setLibrary(updatedLibrary);
  showToast({ title: `'${name}' added`, style: Toast.Style.Success });
  pop();
}
