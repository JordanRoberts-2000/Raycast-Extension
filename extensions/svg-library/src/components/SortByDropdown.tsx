import { List, LocalStorage } from "@raycast/api";
import { DefaultAction } from "../types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  defaultAction: DefaultAction;
  setDefaultAction: Dispatch<SetStateAction<DefaultAction>>;
};

const SortByDropdown = ({ defaultAction, setDefaultAction }: Props) => {
  const handleSortChange = async (newValue: DefaultAction) => {
    await LocalStorage.setItem("defaultAction", newValue);
    setDefaultAction(newValue);
  };

  return (
    <List.Dropdown
      tooltip="Default Action"
      value={defaultAction}
      onChange={(newValue) => handleSortChange(newValue as DefaultAction)}
    >
      <List.Dropdown.Section>
        <List.Dropdown.Item title="Copy Html by default" value={"copySvg"} />
        <List.Dropdown.Item title="Copy Jsx by default" value="copyJsx" />
        <List.Dropdown.Item title="Copy File by default" value="copyFile" />
        <List.Dropdown.Item title="Copy Png by default" value="copyPng" />
      </List.Dropdown.Section>
      <List.Dropdown.Section>
        <List.Dropdown.Item title="Paste Html by default" value="pasteSvg" />
        <List.Dropdown.Item title="Paste Jsx by default" value="pasteJsx" />
      </List.Dropdown.Section>
    </List.Dropdown>
  );
};

export default SortByDropdown;
