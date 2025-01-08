import { Grid, ActionPanel, Action, LocalStorage, List } from "@raycast/api";
import { handleDelete } from "./utils";
import AddSvgForm from "./AddSvgForm";
import EditSvgForm from "./EditSvgForm";
import { useEffect, useState } from "react";
import type { Storage, SortBy, IconLibrary } from "./types";
import SortByDropdown from "./SortByDropdown";

export default function Command() {
  const [svgLibrary, setSVGLibrary] = useState<IconLibrary>({});
  const [sortBy, setSortBy] = useState<SortBy>("usage");

  useEffect(() => {
    const fetchSVGs = async () => {
      const library = await LocalStorage.allItems<Storage>();
      if (library.sortBy) {
        setSortBy(library.sortBy);
      }
      if (library.iconLibrary) {
        setSVGLibrary(library.iconLibrary);
      }
    };
    fetchSVGs();
  }, []);

  return (
    <Grid
      searchBarAccessory={<SortByDropdown setSortBy={setSortBy} sortBy={sortBy} />}
      columns={8}
      inset={Grid.Inset.Large}
      actions={
        <ActionPanel>
          <Action.Push title="Add New SVG" target={<AddSvgForm />} />
        </ActionPanel>
      }
    >
      <Grid.Item title="egg" content={{ color: "blue" }} />
      {/* {Object.entries(svgLibrary).map(([name, value]) => {
        const { content, keywords } = JSON.parse(value);
        return (
          <Grid.Item
            key={name}
            title={name}
            keywords={keywords}
            actions={
              <ActionPanel>
                <Action.Paste title="Paste SVG Code" content={content} />
                <Action.CopyToClipboard title="Copy SVG Code" content={content} />
                <Action title="Delete SVG" onAction={() => handleDelete(name)} />
                <Action.Push title="Add New SVG" target={<AddSvgForm />} />
                <Action.Push title="Edit SVG" target={<EditSvgForm name={name} content={content} />} />
              </ActionPanel>
            }
            content={{ source: `data:image/svg+xml;base64,${btoa(content)}` }}
          />
        );
      })} */}
    </Grid>
  );
}
