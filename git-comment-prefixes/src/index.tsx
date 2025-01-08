import { List, ActionPanel, Action } from "@raycast/api";
import prefixes from "./prefixes";

export default function Command() {
  return (
    <List>
      <List.Section title="These are the most commonly used prefixes based on the Conventional Commits Specification:">
        {prefixes.map(({ title, subtitle, icon }) => (
          <List.Item
            key={title}
            title={`${title}  :`}
            subtitle={subtitle}
            icon={icon}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser url="https://www.conventionalcommits.org/en/v1.0.0/" />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
