import { List, Color, ActionPanel, Action } from "@raycast/api";

export default function Command() {
  return (
    <List
      actions={
        <ActionPanel>
          <Action title={"toggle"} onAction={() => {}} />
        </ActionPanel>
      }
    >
      <List.Section title="VS Code">
        <List.Item title="Hide / Show Terminal" accessories={[{ tag: { value: "⌃`", color: Color.Green } }]} />
        <List.Item title="Tailwind Fold Classes" accessories={[{ tag: { value: "⌃⌥A", color: Color.Green } }]} />
      </List.Section>

      <List.Section title="Vim">
        {/* Movement */}
        <List.Item
          title="Move Cursor"
          keywords={["vim"]}
          accessories={[{ tag: { value: "h j k l", color: Color.Green } }]}
        />
        <List.Item
          title="Jump Forward by Word"
          keywords={["Jump Forward by Word", "vim"]}
          accessories={[{ tag: { value: "w", color: Color.Green } }]}
        />
        <List.Item title="Jump to End of Word" accessories={[{ tag: { value: "e", color: Color.Green } }]} />
        <List.Item title="Jump Backward by Word" accessories={[{ tag: { value: "b", color: Color.Green } }]} />

        {/* Insert */}
        <List.Item title="Insert at End of Line" accessories={[{ tag: { value: "A", color: Color.Green } }]} />
        <List.Item title="Insert at Start of Line" accessories={[{ tag: { value: "I", color: Color.Green } }]} />
        <List.Item title="New Line Above" accessories={[{ tag: { value: "O", color: Color.Green } }]} />
        <List.Item title="New Line Below" accessories={[{ tag: { value: "o", color: Color.Green } }]} />
        <List.Item
          title="Replace Character"
          subtitle="Replace char under cursor and enter insert mode"
          accessories={[{ tag: { value: "s", color: Color.Green } }]}
        />

        {/* Copy / Paste */}
        <List.Item title="Copy Line" accessories={[{ tag: { value: "yy", color: Color.Green } }]} />
        <List.Item title="Copy Word" accessories={[{ tag: { value: "yiw", color: Color.Green } }]} />
        <List.Item title="Paste Below (linewise)" accessories={[{ tag: { value: "p", color: Color.Green } }]} />
        <List.Item title="Paste Above (linewise)" accessories={[{ tag: { value: "P", color: Color.Green } }]} />

        {/* Delete / Change */}
        <List.Item title="Delete Line" accessories={[{ tag: { value: "dd", color: Color.Green } }]} />
        <List.Item title="Clear Line and Insert" accessories={[{ tag: { value: "cc", color: Color.Green } }]} />
        <List.Item title="Delete to End of Word" accessories={[{ tag: { value: "dw", color: Color.Green } }]} />
        <List.Item title="Delete Inside Word" accessories={[{ tag: { value: "diw", color: Color.Green } }]} />

        {/* Find */}
        <List.Item
          title="Find Character After Cursor"
          accessories={[{ tag: { value: "f + char", color: Color.Green } }]}
        />
        <List.Item
          title="Find Character Before Cursor"
          accessories={[{ tag: { value: "F + char", color: Color.Green } }]}
        />

        {/* Navigation */}
        <List.Item title="Sentence Navigation" accessories={[{ tag: { value: "(  )", color: Color.Green } }]} />
        <List.Item
          title="Paragraph / Block Navigation"
          accessories={[{ tag: { value: "{  }", color: Color.Green } }]}
        />

        {/* Scroll / Undo */}
        <List.Item title="Undo" accessories={[{ tag: { value: "u", color: Color.Green } }]} />
        <List.Item title="Scroll Up Half Page" accessories={[{ tag: { value: "⌃u", color: Color.Green } }]} />
        <List.Item title="Scroll Down Half Page" accessories={[{ tag: { value: "⌃d", color: Color.Green } }]} />
      </List.Section>

      <List.Section title="Misc">
        <List.Item title="Play / Pause Spotify" accessories={[{ tag: { value: "⌥M", color: Color.Green } }]} />
      </List.Section>
    </List>
  );
}
