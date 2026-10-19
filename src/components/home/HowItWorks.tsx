/** Agent ⇄ MCP server ⇄ app on the phone, with packets flowing along the links. */
export function HowItWorks() {
  const box = "fill-[var(--panel)] stroke-[var(--line)]";
  return (
    <figure className="overflow-x-auto rounded-2xl border border-line bg-bg-2 p-4 sm:p-8">
      <svg viewBox="0 0 900 240" className="mx-auto min-w-[640px] max-w-4xl" role="img" aria-labelledby="hiw-title hiw-desc">
        <title id="hiw-title">How it works</title>
        <desc id="hiw-desc">Your AI agent talks MCP over stdio to the expo-mcp-bridge server on your computer, which talks over a WebSocket on port 8347 to the AgentBridge component inside your app on the phone.</desc>
        <style>{`
          .flow{stroke-dasharray:6 10;animation:dash 1.1s linear infinite}
          .flow-r{stroke-dasharray:6 10;animation:dash 1.1s linear infinite reverse}
          @keyframes dash{to{stroke-dashoffset:-32}}
          @media (prefers-reduced-motion: reduce){.flow,.flow-r{animation:none}}
          .t{font:600 15px var(--font-sans);fill:var(--text)} .s{font:12.5px var(--font-sans);fill:var(--muted)} .m{font:12px var(--font-mono);fill:var(--muted)}
        `}</style>
        {/* agent */}
        <rect x="10" y="60" width="210" height="120" rx="16" className={box} strokeWidth="1.5" />
        <text x="115" y="105" textAnchor="middle" className="t">AI agent</text>
        <text x="115" y="128" textAnchor="middle" className="s">Claude Code · Antigravity</text>
        <text x="115" y="147" textAnchor="middle" className="s">Cursor · any MCP client</text>
        {/* server */}
        <rect x="345" y="60" width="210" height="120" rx="16" className={box} strokeWidth="1.5" />
        <text x="450" y="105" textAnchor="middle" className="t">MCP server</text>
        <text x="450" y="128" textAnchor="middle" className="m">npx expo-mcp-bridge</text>
        <text x="450" y="147" textAnchor="middle" className="s">on your computer</text>
        {/* phone */}
        <rect x="690" y="20" width="120" height="200" rx="22" className={box} strokeWidth="1.5" />
        <rect x="700" y="40" width="100" height="160" rx="10" fill="var(--bg-2)" />
        <text x="750" y="105" textAnchor="middle" className="t" style={{ fontSize: 13 }}>Your app</text>
        <text x="750" y="125" textAnchor="middle" className="m" style={{ fontSize: 10.5 }}>&lt;AgentBridge /&gt;</text>
        <text x="750" y="145" textAnchor="middle" className="s" style={{ fontSize: 11 }}>Expo Go · dev build</text>
        {/* links */}
        <path d="M222 105 H343" stroke="var(--accent)" strokeWidth="2.5" className="flow" />
        <path d="M222 135 H343" stroke="var(--accent-2)" strokeWidth="2.5" className="flow-r" />
        <text x="282" y="92" textAnchor="middle" className="m">MCP · stdio</text>
        <path d="M557 105 H688" stroke="var(--accent-3)" strokeWidth="2.5" className="flow" />
        <path d="M557 135 H688" stroke="var(--accent-2)" strokeWidth="2.5" className="flow-r" />
        <text x="622" y="92" textAnchor="middle" className="m">WebSocket :8347</text>
        <text x="282" y="165" textAnchor="middle" className="s">tool calls ⇄ results</text>
        <text x="622" y="165" textAnchor="middle" className="s">Wi-Fi (or USB)</text>
      </svg>
    </figure>
  );
}
