import { Grid, ActionPanel, Action, LocalStorage, List } from "@raycast/api";
import AddSvgForm from "./components/AddSvgForm";
import { useEffect, useState } from "react";
import type { Storage, SortBy, IconLibrary } from "./types";
import SortByDropdown from "./components/SortByDropdown";
import IconItemActions from "./components/IconItemActions";

export default function Command() {
  const [svgLibrary, setSvgLibrary] = useState<IconLibrary>({});
  const [sortBy, setSortBy] = useState<SortBy>("usage");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSVGs = async () => {
      const library = await LocalStorage.allItems<Storage>();

      if (library.sortBy) {
        setSortBy(library.sortBy);
      }
      if (library.iconLibrary) {
        try {
          const iconLibrary: IconLibrary = JSON.parse(library.iconLibrary);
          setSvgLibrary(iconLibrary);
        } catch (err) {
          console.error(`Failed to parse Icon-Library into JSON ${err}`);
        }
      }
      setIsLoading(false);
    };
    fetchSVGs();
  }, []);

  if (isLoading) return <List isLoading={true} />;
  return (
    <Grid
      searchBarAccessory={<SortByDropdown setSortBy={setSortBy} sortBy={sortBy} />}
      columns={8}
      inset={Grid.Inset.Large}
      actions={
        <ActionPanel>
          <Action.Push title="Add New SVG" target={<AddSvgForm library={svgLibrary} setLibrary={setSvgLibrary} />} />
        </ActionPanel>
      }
    >
      <Grid.EmptyView icon={"."} />
      {Object.entries(svgLibrary).map(([name, { content, keywords }]) => (
        <Grid.Item
          key={name}
          title={name}
          keywords={keywords}
          actions={
            <IconItemActions
              name={name}
              content={content}
              keywords={keywords}
              svgLibrary={svgLibrary}
              setSvgLibrary={setSvgLibrary}
            />
          }
          content={{ source: `data:image/svg+xml;base64,${btoa(content)}` }}
        />
      ))}
    </Grid>
  );
}
