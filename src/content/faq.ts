// Shared by the home page, its FAQ structured data and llms.txt.
export const faqs: { q: string; a: string }[] = [
  { q: "Does it work with Expo Go?", a: "Yes. Both libraries are pure JavaScript in your app; screenshots use react-native-view-shot, which ships with Expo Go. In a custom dev build, rebuild once after installing it." },
  { q: "Which agents are supported?", a: "Any MCP client: Claude Code, Antigravity, Cursor, Windsurf, Cline and more. `init` writes the config for Claude Code and an AGENTS.md guide that other agents read." },
  { q: "Is anything shipped to production?", a: "No. <AgentBridge /> only runs in development (__DEV__) and only connects to your own computer." },
  { q: "Does it type my passwords?", a: "No. The skills tell agents never to enter real passwords, payment or ID details — you type real credentials on the phone yourself." },
  { q: "What does it cost?", a: "Nothing. Both libraries are MIT-licensed and free. Studio edits by Claude are optional and use your own Anthropic credentials if you set them." },
];
