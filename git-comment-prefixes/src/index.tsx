import { List } from "@raycast/api";

const prefixes = [
  { icon: "✨", title: "Feat\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0", subtitle: "Introduces a new feature." },
  { icon: "🐛", title: "Fix\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0", subtitle: "Fixes a bug." },
  { icon: "🔧", title: "Refactor", subtitle: "Refactors code without changing behavior." },
  { icon: "⚡", title: "Perf\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0", subtitle: "Improves performance." },
  {
    icon: "🎨",
    title: "Style\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0",
    subtitle: "Changes related to code style or formatting (does not affect behavior).",
  },
  {
    icon: "🛠",
    title: "Build\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0",
    subtitle: "Changes that affect the build system or dependencies.",
  },
  {
    icon: "📦",
    title: "Chor\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0",
    subtitle: "Miscellaneous tasks, like configuration changes or non-functional updates.",
  },
  { icon: "📝", title: "Docs\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0", subtitle: "Documentation updates." },
  { icon: "🧪", title: "Test\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0", subtitle: "Adding or updating tests." },
  { icon: "⏪", title: "Revert\u00A0\u00A0\u00A0\u00A0", subtitle: "Reverts a previous commit." },
  {
    icon: "🚀",
    title: "Cli\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0",
    subtitle: "Changes related to continuous integration or deployment.",
  },
];

export default function Command() {
  return (
    <List>
      <List.Section title="These are the most commonly used prefixes based on the Conventional Commits Specification:">
        {prefixes.map(({ title, subtitle, icon }) => (
          <List.Item key={title} title={`${title}  :`} subtitle={subtitle} icon={icon} />
        ))}
      </List.Section>
    </List>
  );
}
