import { Grid, ActionPanel, Action, LocalStorage, List } from "@raycast/api";
import { handleDelete } from "./utils";
import AddSvgForm from "./AddSvgForm";
import EditSvgForm from "./EditSvgForm";
import { useEffect, useState } from "react";

export default function Command() {
  const [svgLibrary, setSVGLibrary] = useState({});

  useEffect(() => {
    const fetchSVGs = async () => {
      const library = await LocalStorage.allItems();
      setSVGLibrary(library);
    };
    fetchSVGs();
  }, []);
  // todo: add keywords array for search bar?
  return (
    <List>
      <List.Item title={"React"} />
      <List.Item title={"Astro"} />
    </List>
    // <Grid
    //   columns={8}
    //   inset={Grid.Inset.Large}
    //   actions={
    //     <ActionPanel>
    //       <Action.Push title="Add New SVG" target={<AddSvgForm />} />
    //     </ActionPanel>
    //   }
    // >
    //   {Object.entries(svgLibrary).map(([name, content]) => (
    //     <Grid.Item
    //       key={name}
    //       title={name}
    //       actions={
    //         <ActionPanel>
    //           <Action.Paste title="Paste SVG Code" content={content} />
    //           <Action.CopyToClipboard title="Copy SVG Code" content={content} />
    //           <Action title="Delete SVG" onAction={() => handleDelete(name)} />
    //           <Action.Push title="Add New SVG" target={<AddSvgForm />} />
    //           <Action.Push title="Edit SVG" target={<EditSvgForm name={name} content={content} />} />
    //         </ActionPanel>
    //       }
    //       content={{ source: `data:image/svg+xml;base64,${btoa(content)}` }}
    //     />
    //   ))}
    // </Grid>
  );
}
