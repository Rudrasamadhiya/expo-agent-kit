import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { PrevNext } from "@/components/docs/PrevNext";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
      <DocsSidebar />
      <article className="prose min-w-0 pb-8">
        {children}
        <PrevNext />
      </article>
    </div>
  );
}
