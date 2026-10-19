import type { Tool } from "@/content/reference";

/** One section per tool group; each tool gets an anchor (#app_tap) and a params table. */
export function ToolReference({ tools }: { tools: Tool[] }) {
  const groups = [...new Set(tools.map((t) => t.group))];
  return (
    <>
      <p>Jump to: {tools.map((t, i) => (<span key={t.name}>{i > 0 && " · "}<a href={`#${t.name}`}><code>{t.name}</code></a></span>))}</p>
      {groups.map((g) => (
        <section key={g}>
          <h2>{g}</h2>
          {tools.filter((t) => t.group === g).map((t) => (
            <div key={t.name} id={t.name} className="scroll-mt-24">
              <h3><a href={`#${t.name}`} className="!no-underline !text-text"><code>{t.name}</code></a></h3>
              <p>{t.summary}</p>
              {t.params.length > 0 ? (
                <table>
                  <thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead>
                  <tbody>{t.params.map((p) => (<tr key={p.name}><td><code>{p.name}</code></td><td><code>{p.type}</code></td><td>{p.desc}</td></tr>))}</tbody>
                </table>
              ) : <p className="text-muted">No parameters.</p>}
            </div>
          ))}
        </section>
      ))}
    </>
  );
}

export function KeyValueTable({ head, rows }: { head: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <table>
      <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>)}</tbody>
    </table>
  );
}

export function Callout({ children, tone = "info" }: { children: React.ReactNode; tone?: "info" | "warn" }) {
  return (
    <div className={`my-5 rounded-xl border px-4 py-3 text-[0.95rem] ${tone === "warn" ? "border-[#f5a524]/50 bg-[#f5a524]/10" : "border-accent/40 bg-accent/10"}`}>
      {children}
    </div>
  );
}
