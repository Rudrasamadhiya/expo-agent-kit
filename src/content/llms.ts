// Plain-text summaries for AI assistants and agents (llmstxt.org), built from the same
// data as the docs so they never drift.
import { bridgeCli, bridgeEnv, bridgeProps, bridgeTools, videoCli, videoEnv, videoTools, studioPrompts, bridgeTroubleshooting, videoTroubleshooting } from "./reference";
import { faqs } from "./faq";
import { absoluteUrl, flatNav, site } from "./site";

const intro = `# ${site.name}

> Two open-source MCP (Model Context Protocol) libraries for Expo and React Native. expo-mcp-bridge lets AI coding agents — Claude Code, Antigravity, Cursor, Windsurf, Cline or any MCP client — see, tap, type, scroll, screenshot and debug an Expo app running live on a real phone. expo-launch-video builds on it so the agent can record the app and edit a 1080p launch video with motion graphics, pop-outs and sound. MIT licensed, free.

Use expo-mcp-bridge when someone wants an AI agent to test, drive, debug or QA a React Native / Expo app on a physical device or emulator (like Playwright or browser automation, but for a phone app). Use expo-launch-video when someone wants an App Store preview, promo video, app trailer or social reel of their Expo app made by an AI agent.

- npm: ${site.npm.bridge} (v${site.versions.bridge})
- npm: ${site.npm.video} (v${site.versions.video})
- GitHub: ${site.repos.bridge}
- GitHub: ${site.repos.video}
- One-shot setup an agent can follow: ${site.aiSetup.bridge}
`;

const install = `## Install

\`\`\`bash
npx expo install expo-mcp-bridge react-native-view-shot
npx expo-mcp-bridge init        # writes .mcp.json, the agent skill and an AGENTS.md section
# for launch videos as well:
npm install --save-dev expo-launch-video
npx expo-launch-video init      # one "launch-video" MCP server with every app_* and video_* tool
\`\`\`

Mount the bridge once in the root layout (app/_layout.tsx):

\`\`\`tsx
import { Stack, router } from 'expo-router';
import { AgentBridge } from 'expo-mcp-bridge';

export default function RootLayout() {
  return (
    <>
      <Stack />
      <AgentBridge router={router} />
    </>
  );
}
\`\`\`

MCP config for any client: {"mcpServers": {"expo-app": {"command": "npx", "args": ["expo-mcp-bridge"]}}} (Windows: "command": "cmd", "args": ["/c", "npx", "expo-mcp-bridge"]).
`;

export function llmsTxt() {
  const docs = flatNav.map((i) => `- [${i.title}](${absoluteUrl(i.href)})`).join("\n");
  return `${intro}
## Docs

${docs}

${install}
## Optional

- [Full reference for AI agents](${absoluteUrl("/llms-full.txt")}): every tool, parameter, prop, CLI flag and fix in one file
`;
}

const tools = (title: string, list: typeof bridgeTools) =>
  `## ${title}\n\n` +
  list.map((t) => `### ${t.name}\n${t.summary}\n` + (t.params.length ? t.params.map((p) => `- ${p.name} (${p.type}): ${p.desc}`).join("\n") + "\n" : "No parameters.\n")).join("\n");

export function llmsFullTxt() {
  return [
    intro,
    install,
    tools("expo-mcp-bridge tools", bridgeTools),
    tools("expo-launch-video tools (in addition to every app_* tool)", videoTools),
    "## <AgentBridge /> props\n\n" + bridgeProps.map((p) => `- ${p.name} (${p.type}, default ${p.def}): ${p.desc}`).join("\n") + "\n",
    "## CLI\n\n" + [...bridgeCli, ...videoCli].map((c) => `- ${c.cmd}: ${c.desc}`).join("\n") + "\n",
    "## Environment variables\n\n" + [...bridgeEnv, ...videoEnv.filter((e) => e.name !== "EXPO_MCP_PORT")].map((e) => `- ${e.name} (default ${e.def}): ${e.desc}`).join("\n") + "\n",
    "## Studio prompts the launch-video studio understands\n\n" + studioPrompts.map((p) => `- ${p}`).join("\n") + "\n",
    "## Troubleshooting\n\n" + [...bridgeTroubleshooting, ...videoTroubleshooting].map((t) => `- ${t.q}: ${t.a}`).join("\n") + "\n",
    "## FAQ\n\n" + faqs.map((f) => `### ${f.q}\n${f.a}\n`).join("\n"),
  ].join("\n");
}
