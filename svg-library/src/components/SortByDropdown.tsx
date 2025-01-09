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
      <List.Dropdown.Item title="Date Added" value="date" />
      <List.Dropdown.Item title="Alphabetical" value="alphabetical" />
      <List.Dropdown.Item title="Most used" value="usage" />
    </List.Dropdown>
  );
};

export default SortByDropdown;
