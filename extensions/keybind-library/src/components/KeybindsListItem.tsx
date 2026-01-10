import { Color, List } from "@raycast/api";
import { Keybind } from "../types";
import { ListItemActions } from "./actions/ListItemActions";

type Props = {
  keybind: Keybind;
  revalidate: () => Promise<Keybind[]>;
};

const KeybindsListItem = ({ keybind: k, revalidate }: Props) => {
  return (
    <List.Item
      title={k.title}
      subtitle={k.description}
      accessories={[{ tag: { value: k.keybind, color: Color.Green } }]}
      actions={<ListItemActions keybind={k} revalidate={revalidate} />}
    />
  );
};

export default KeybindsListItem;
