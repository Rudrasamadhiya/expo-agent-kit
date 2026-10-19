import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

/** Syntax-highlighted at build time (no JS shipped), light + dark themes, with a copy button. */
export async function CodeBlock({ code, lang = "bash", title }: { code: string; lang?: string; title?: string }) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: "light",
  });
  return (
    <figure className="group relative my-5 overflow-hidden rounded-xl border border-line bg-code">
      {title && <figcaption className="border-b border-line px-4 py-2 font-mono text-xs text-muted">{title}</figcaption>}
      <div className="relative">
        <div className="overflow-x-auto py-3.5 pl-4 pr-20 font-mono [&_pre]:!m-0" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-code from-70% to-transparent pl-6 pr-2.5 pt-2.5">
          <CopyButton text={code.trim()} />
        </div>
      </div>
    </figure>
  );
}
