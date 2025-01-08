import { List } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item title={"Feat:     "} subtitle={"Introduces a new feature."} />
      <List.Item title={"Fix:      "} subtitle={"Fixes a bug."} />
      <List.Item title={"Refactor: "} subtitle={"Refactors code without changing behavior."} />
      <List.Item title={"Perf:     "} subtitle={"Improves performance."} />
      <List.Item
        title={"Style:    "}
        subtitle={"Changes related to code style or formatting (does not affect behavior)."}
      />
      <List.Item title={"Build:    "} subtitle={"Changes that affect the build system or dependencies."} />
      <List.Item
        title={"Chor:     "}
        subtitle={"Miscellaneous tasks, like configuration changes or non-functional updates."}
      />
      <List.Item title={"Docs:     "} subtitle={"Documentation updates."} />
      <List.Item title={"Test:     "} subtitle={"Adding or updating tests."} />
      <List.Item title={"Cli:      "} subtitle={"Changes related to continuous integration or deployment."} />
      <List.Item title={"Revert:   "} subtitle={"Reverts a previous commit."} />
    </List>
  );
}
