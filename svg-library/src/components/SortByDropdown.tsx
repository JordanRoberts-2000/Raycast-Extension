import { List, LocalStorage } from "@raycast/api";
import { SortBy } from "../types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
};

const SortByDropdown = ({ sortBy, setSortBy }: Props) => {
  const handleSortChange = async (newValue: SortBy) => {
    setSortBy(newValue);
    await LocalStorage.setItem("sortBy", newValue);
  };
  return (
    <List.Dropdown tooltip="Sort By" value={sortBy} onChange={(newValue) => handleSortChange(newValue as SortBy)}>
      <List.Dropdown.Section>
        <List.Dropdown.Item title="Copy Html by default" value="date" />
        <List.Dropdown.Item title="Copy Jsx by default" value="alphabetical" />
        <List.Dropdown.Item title="Copy File by default" value="to" />
        <List.Dropdown.Item title="Copy Png by default" value="usage" />
      </List.Dropdown.Section>
      <List.Dropdown.Section>
        <List.Dropdown.Item title="Paste Html by default" value="ee" />
        <List.Dropdown.Item title="Paste Jsx by default" value="aa" />
      </List.Dropdown.Section>
    </List.Dropdown>
  );
};

export default SortByDropdown;
