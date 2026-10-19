import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "License & credits" };

export default function Page() {
  return (
    <>
      <h1>License &amp; credits</h1>
      <h2>MIT License</h2>
      <p><code>expo-mcp-bridge</code>, <code>expo-launch-video</code> and this website are released under the MIT License — free to use, modify and distribute, including commercially. See the LICENSE file in each repository: <a href={`${site.repos.bridge}/blob/main/LICENSE`}>bridge</a> · <a href={`${site.repos.video}/blob/main/LICENSE`}>launch-video</a> · <a href={`${site.repos.site}/blob/main/LICENSE`}>website</a>.</p>
      <h2>Built with</h2>
      <table>
        <thead><tr><th>Project</th><th>Used for</th><th>License</th></tr></thead>
        <tbody>
          <tr><td>Model Context Protocol SDK</td><td>MCP servers</td><td>MIT</td></tr>
          <tr><td>ws</td><td>Phone ⇄ computer connection</td><td>MIT</td></tr>
          <tr><td>zod</td><td>Tool schemas</td><td>MIT</td></tr>
          <tr><td>Mediabunny</td><td>MP4 muxing in the browser</td><td>MPL-2.0</td></tr>
          <tr><td>Anthropic TypeScript SDK</td><td>Optional studio edits</td><td>MIT</td></tr>
          <tr><td>react-native-view-shot (peer)</td><td>Screenshots and recordings</td><td>MIT</td></tr>
          <tr><td>Next.js, React, Tailwind CSS, Motion, Shiki</td><td>This website</td><td>MIT</td></tr>
          <tr><td>Inter, JetBrains Mono</td><td>Website fonts</td><td>SIL Open Font License 1.1</td></tr>
        </tbody>
      </table>
      <h2>Trademarks</h2>
      <p>Expo, React Native, Claude, Antigravity, Cursor and other names are trademarks of their respective owners and are used here only to describe compatibility. This project is independent and not affiliated with or endorsed by them.</p>
      <h2>Privacy</h2>
      <p>The libraries run on your computer and phone. Nothing is sent anywhere except to your own MCP server — and, only if you configure Anthropic credentials, studio prompts to the Claude API. This website uses no analytics or cookies.</p>
    </>
  );
}
