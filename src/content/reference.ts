// Reference data for the docs. Kept in one place so pages and tests agree.

export type Param = { name: string; type: string; desc: string };
export type Tool = { name: string; summary: string; params: Param[]; group: string };

const target: Param[] = [
  { name: "ref", type: "string", desc: 'Ref from the last snapshot, e.g. "e4" (stable between snapshots)' },
  { name: "testID", type: "string", desc: "The element's testID prop" },
  { name: "text", type: "string", desc: "Visible label or placeholder (exact match first, then contains)" },
];
const after: Param[] = [
  { name: "snapshot", type: "boolean", desc: "Report what changed afterwards (default true)" },
  { name: "full", type: "boolean", desc: "Return the full screen instead of a diff" },
];

export const bridgeTools: Tool[] = [
  { group: "Read", name: "app_status", summary: "Is the phone connected? Device, OS, screen size, SDK.", params: [] },
  { group: "Read", name: "app_snapshot", summary: "Compact outline of the visible screen with stable refs like [e3]. Cheaper than screenshots.", params: [{ name: "maxLines", type: "number", desc: "Default 400" }] },
  { group: "Read", name: "app_screenshot", summary: "JPEG of the visible screen. saveTo writes a file (no image tokens); fullScroll captures a whole page.", params: [
    { name: "maxWidth", type: "number", desc: "Pixels, default 400 (up to the device's real pixels)" },
    { name: "quality", type: "number", desc: "0–1, default 0.6" },
    { name: "saveTo", type: "string", desc: "File path to save instead of returning the image" },
    { name: "area", type: '"auto" | "window"', desc: "Visible screen (default) or whole window" },
    { name: "fullScroll", type: "boolean", desc: "Capture the main scroll view's whole content as one tall image" },
  ] },
  { group: "Read", name: "app_layout", summary: "Element positions (dp) and font sizes, for alignment and overflow checks.", params: [{ name: "limit", type: "number", desc: "Max elements, default 250" }] },
  { group: "Act", name: "app_tap", summary: "Press a button or pressable. Returns only what changed, plus new errors and failed requests.", params: [...target, { name: "long", type: "boolean", desc: "Long-press" }, ...after] },
  { group: "Act", name: "app_type", summary: "Fill an input (replaces by default).", params: [...target, { name: "value", type: "string", desc: "Text to enter" }, { name: "append", type: "boolean", desc: "Keep the existing text" }, { name: "submit", type: "boolean", desc: "Fire onSubmitEditing (enter)" }, ...after] },
  { group: "Act", name: "app_batch", summary: "Several taps / types / scrolls / navigations in one call, one result. The fastest way to fill a form.", params: [{ name: "steps", type: "array", desc: '[{action:"tap"|"type"|"scroll"|"toggle"|"navigate"|"wait"|"dismiss_keyboard", …that tool\'s args}]' }, ...after] },
  { group: "Act", name: "app_scroll", summary: "Scroll a list or ScrollView (the first one on screen if no target).", params: [...target, { name: "direction", type: '"down" | "up" | "left" | "right" | "top" | "bottom"', desc: "Default down" }, { name: "amount", type: "number", desc: "Pixels, default ~70% of the screen" }, ...after] },
  { group: "Act", name: "app_toggle", summary: "Flip a Switch, or set it with value.", params: [...target, { name: "value", type: "boolean", desc: "Desired state" }, ...after] },
  { group: "Act", name: "app_navigate", summary: "Open an expo-router path or a deep link.", params: [{ name: "path", type: "string", desc: 'e.g. "/settings"' }, { name: "replace", type: "boolean", desc: "Replace instead of push (keeps the stack shallow)" }, ...after] },
  { group: "Act", name: "app_wait", summary: "Wait until text or a testID appears (or disappears). Cheaper than polling.", params: [{ name: "text", type: "string", desc: "Text to wait for" }, { name: "testID", type: "string", desc: "testID to wait for" }, { name: "gone", type: "boolean", desc: "Wait for it to disappear" }, { name: "timeout", type: "number", desc: "ms, default 5000, max 30000" }] },
  { group: "Act", name: "app_dismiss_keyboard", summary: "Hide the on-screen keyboard.", params: [] },
  { group: "Debug", name: "app_logs", summary: "Console logs and JS errors captured in the app (cursor-based).", params: [{ name: "level", type: '"log" | "info" | "warn" | "error" | "debug"', desc: '"error" = errors only, "warn" = warnings and errors' }, { name: "search", type: "string", desc: "Substring filter" }, { name: "since", type: "number", desc: "Only entries after this cursor" }, { name: "limit", type: "number", desc: "Default 50" }, { name: "clear", type: "boolean", desc: "Clear the buffer" }] },
  { group: "Debug", name: "app_network", summary: "fetch / XHR requests with status, timing and truncated bodies.", params: [{ name: "failedOnly", type: "boolean", desc: "Only failures" }, { name: "search", type: "string", desc: "Substring of the URL" }, { name: "since", type: "number", desc: "Cursor" }, { name: "limit", type: "number", desc: "Default 30" }, { name: "bodies", type: "boolean", desc: "Include request/response bodies" }] },
  { group: "Debug", name: "app_eval", summary: "Run JavaScript inside the app (dev only). bridge and RN are in scope.", params: [{ name: "code", type: "string", desc: "Expression, or statements with return" }] },
  { group: "Debug", name: "app_reload", summary: "Reload the JS bundle, and say honestly if the app couldn't (e.g. Metro was restarted).", params: [] },
  { group: "Device", name: "device_key", summary: "Hardware keys on Android via adb: volume_up, volume_down, mute, back, home, app_switch, enter, tab, delete, power, menu, escape.", params: [{ name: "key", type: "string", desc: "One of the keys above" }, { name: "repeat", type: "number", desc: "1–20 presses" }] },
];

export const videoTools: Tool[] = [
  { group: "Shoot", name: "video_record", summary: "Screen-record the phone (~10–15 fps). Opens the page on camera, holds while it loads, scrolls; or taps mid-take (taps become pop-outs).", params: [
    { name: "route", type: "string", desc: "Page to open; the opening is recorded live" },
    { name: "name", type: "string", desc: "Take name" },
    { name: "seconds", type: "number", desc: "1–15, default 4" },
    { name: "scroll", type: "boolean | number", desc: "Scroll smoothly (true, or distance in dp)" },
    { name: "scrollFrom", type: "number", desc: "When scrolling starts (fraction), default 0.5 with a route" },
    { name: "tap", type: "string", desc: "Visible text of an element to tap mid-take" },
    { name: "tapAt", type: "number", desc: "Second of the tap (default halfway)" },
    { name: "liveLoad", type: "boolean", desc: "Record the page opening (default true with a route)" },
  ] },
  { group: "Shoot", name: "video_capture", summary: "High-res stills + full-page scroll captures, for one or many routes in one call.", params: [{ name: "routes", type: "string[]", desc: 'e.g. ["/dashboard", "/analytics"]' }, { name: "name", type: "string", desc: "Name for the current screen" }, { name: "scroll", type: "boolean", desc: "Capture scroll content (default true)" }] },
  { group: "Shoot", name: "video_capture_tap", summary: "Before / tap / after stills of an interaction.", params: [...target, { name: "name", type: "string", desc: "Name for the screen before the tap" }] },
  { group: "Direct", name: "video_plan", summary: "Auto-plan the whole timeline: intro, one scene per take with timing, zooms, scroll speed-ups, captions, chips and pop-outs, outro.", params: [{ name: "targetSeconds", type: "number", desc: "Desired length" }, { name: "format", type: '"landscape" | "portrait" | "square"', desc: "16:9, 9:16, 1:1" }, { name: "appName", type: "string", desc: "Intro title" }, { name: "tagline", type: "string", desc: "Intro subtitle" }, { name: "cta", type: "string", desc: "Outro button" }] },
  { group: "Direct", name: "video_edit", summary: "Edit anything with a list of ops: update, move, remove, add, drop, settings, plan.", params: [{ name: "ops", type: "array", desc: "See the operations table below" }] },
  { group: "Direct", name: "video_timeline", summary: "The whole plan in a few lines (cheap to read).", params: [] },
  { group: "Studio", name: "video_studio", summary: "Open the studio in the browser.", params: [{ name: "open", type: "boolean", desc: "Open the browser (default true)" }] },
  { group: "Studio", name: "video_wait_for_prompt", summary: "Wait for what the user types in the studio (with the scene they're looking at).", params: [{ name: "timeoutSeconds", type: "number", desc: "Default 600" }] },
  { group: "Studio", name: "video_reply", summary: "Show a short message in the studio chat.", params: [{ name: "text", type: "string", desc: "Message" }] },
  { group: "Deliver", name: "video_render", summary: "Export the MP4 (H.264 + AAC sound) and return its path.", params: [] },
];

export const editOps = [
  { op: "update", fields: "scene, duration, speed, title, subtitle, transition, focus, zoom, zoomTimes, scroll, callouts, popouts", example: '{op:"update", scene:"dashboard", title:"Your prep at a glance", speed:1.5}' },
  { op: "move", fields: "scene, to | before | after", example: '{op:"move", scene:"faq", after:"help"}' },
  { op: "remove", fields: "scene", example: '{op:"remove", scene:3}' },
  { op: "add", fields: "asset, at?", example: '{op:"add", asset:"/pricing"}' },
  { op: "drop", fields: "asset", example: '{op:"drop", asset:"a14"}  // discard a bad take' },
  { op: "settings", fields: "format, appName, tagline, cta, captionSide, theme, sound", example: '{op:"settings", format:"portrait", captionSide:"right", sound:{volume:0.6}}' },
  { op: "plan", fields: "targetSeconds?", example: '{op:"plan", targetSeconds:30}' },
];

export const bridgeProps = [
  { name: "router", type: "{ push(path) }", def: "—", desc: "expo-router's router, for exact app_navigate" },
  { name: "host", type: "string", def: "auto (Metro host)", desc: "Computer running the MCP server" },
  { name: "port", type: "number", def: "8347", desc: "Must match EXPO_MCP_PORT" },
  { name: "allowEval", type: "boolean", def: "true (dev)", desc: "Allow app_eval" },
  { name: "enabled", type: "boolean", def: "true (dev)", desc: "Turn the bridge off" },
  { name: "children", type: "ReactNode", def: "—", desc: "Rendered as-is (always, including production)" },
];

export const bridgeCli = [
  { cmd: "npx expo-mcp-bridge init", desc: "In your Expo project: .mcp.json, the expo-app-control skill and an AGENTS.md section" },
  { cmd: "npx expo-mcp-bridge init --cursor", desc: "Also write .cursor/mcp.json" },
  { cmd: "npx expo-mcp-bridge", desc: "Run the MCP server over stdio (your agent launches this)" },
  { cmd: "npx expo-mcp-bridge --help", desc: "Usage" },
];
export const videoCli = [
  { cmd: "npx expo-launch-video init", desc: 'In your Expo project: .mcp.json ("launch-video" server), both skills, AGENTS.md, .gitignore' },
  { cmd: "npx expo-launch-video studio", desc: "Reopen the studio for ./launch-video without an agent" },
  { cmd: "npx expo-launch-video", desc: "Run the MCP server (includes every app_* tool)" },
  { cmd: "npx expo-launch-video --help", desc: "Usage" },
];

export const bridgeEnv = [{ name: "EXPO_MCP_PORT", def: "8347", desc: "WebSocket port the phone connects to (match <AgentBridge port>)" }];
export const videoEnv = [
  { name: "EXPO_MCP_PORT", def: "8347", desc: "Port the phone connects to (shared with expo-mcp-bridge)" },
  { name: "LAUNCH_VIDEO_PORT", def: "8790", desc: "Studio web server (next free port if taken)" },
  { name: "LAUNCH_VIDEO_DIR", def: "./launch-video", desc: "Captures, project.json and renders" },
  { name: "LAUNCH_VIDEO_AI", def: "on", desc: '"off" sends studio prompts to your agent instead of the Claude API' },
  { name: "LAUNCH_VIDEO_MODEL", def: "claude-opus-5-5", desc: "Model for direct studio edits (needs Anthropic credentials)" },
];

export const studioPrompts = [
  "make dashboard 4s", "speed up analytics 2x", "slow down the 3rd scene", "remove pricing", "move faq after help",
  "zoom on Log In in login", "no zoom on dashboard", "scroll mistakes 60%", "title dashboard: Your day at a glance",
  "fade transition on analytics", "portrait", "square", "text on the right", "make it 30 seconds",
  "cta: Get it on Google Play", "color #7c3aed", "mute", "volume 60%",
];

export const bridgeTroubleshooting = [
  { q: "No app connected", a: "Same Wi-Fi for phone and computer, Metro in LAN mode (not --tunnel), Node allowed through the firewall on port 8347, <AgentBridge /> mounted. USB-only Android: adb reverse tcp:8347 tcp:8347 and host=\"localhost\"." },
  { q: "Port 8347 is already in use", a: "Another agent session runs the server. Close it, or set EXPO_MCP_PORT and the port prop." },
  { q: 'Metro: Unable to resolve "expo-mcp-bridge" after reinstalling', a: "Restart Metro with npx expo start --clear." },
  { q: "app_reload says it can't reload", a: "Metro was restarted, so the app lost its dev connection. Shake the phone → Reload once." },
  { q: "Screenshots fail", a: "Install react-native-view-shot (and rebuild the dev client if you use one)." },
  { q: "A native dialog is on screen", a: "System alerts and permission prompts live outside React; ask the user to handle them." },
];
export const videoTroubleshooting = [
  { q: "Render never finishes", a: "Keep the studio tab visible. Export uses the browser's encoder (Chrome or Edge)." },
  { q: "Empty lists in recordings", a: "Your app may need dev env vars (e.g. EXPO_PUBLIC_* that only exist in eas.json). Start Metro with them set." },
  { q: "A panel covers later takes", a: "Close modals between takes — video_record warns you when one is still open." },
  { q: "Studio prompts don't arrive", a: "Refresh the studio tab after the agent session restarts; failed sends now show a message and keep your text." },
];
