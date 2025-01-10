import { Grid, ActionPanel, Action, LocalStorage, List, Icon } from "@raycast/api";
import AddSvgForm from "./components/AddSvgForm";
import { useEffect, useState } from "react";
import type { Storage, DefaultAction, IconLibrary } from "./types";
import SortByDropdown from "./components/SortByDropdown";
import IconItemActions from "./components/IconItemActions";
import { addSvgHotkey } from "./constants";
import ImportLibraryDataForm from "./components/ImportLibraryDataForm";

export default function Command() {
  const [svgLibrary, setSvgLibrary] = useState<IconLibrary>({});
  const [defaultAction, setDefaultAction] = useState<DefaultAction>("copyFile");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSVGs = async () => {
      const library = await LocalStorage.allItems<Storage>();

      if (library.defaultAction) {
        setDefaultAction(library.defaultAction);
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
      searchBarPlaceholder="Search Svg..."
      searchBarAccessory={<SortByDropdown setDefaultAction={setDefaultAction} defaultAction={defaultAction} />}
      columns={8}
      inset={Grid.Inset.Large}
      actions={
        <ActionPanel>
          <Action.Push
            icon={Icon.Plus}
            shortcut={addSvgHotkey}
            title="Add New SVG"
            target={<AddSvgForm library={svgLibrary} setLibrary={setSvgLibrary} />}
          />
          <Action.Push
            target={<ImportLibraryDataForm setSvgLibrary={setSvgLibrary} svgLibrary={svgLibrary} />}
            icon={Icon.SaveDocument}
            title="Import Library JSON"
          />
        </ActionPanel>
      }
    >
      <Grid.EmptyView icon={"."} />
      {Object.entries(svgLibrary).map(([name, { content, keywords }]) => (
        <Grid.Item
          key={name}
          title={`♥︎ ${name.charAt(0).toUpperCase() + name.slice(1)}`}
          keywords={keywords}
          actions={
            <IconItemActions
              defaultAction={defaultAction}
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
