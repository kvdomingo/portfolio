import { blog } from "@content";
import { createFileRoute, Link } from "@tanstack/react-router";
import { compareDesc, format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
});

function BlogIndex() {
  const entries = blog
    .filter((entry) => (process.env.NODE_ENV === "production" ? !entry.is_draft : true))
    .sort((a, b) => compareDesc(new Date(a.created), new Date(b.created)));

  return (
    <div className="container py-6 text-center">
      <div className="flex flex-col gap-4 text-left">
        {entries.map((entry) => (
          <div
            key={entry.slug}
            className="space-y-4 rounded-xl p-4 transition-[border] duration-100 hover:border hover:border-white hover:border-solid"
          >
            <Link to="/blog/$slug" params={{ slug: entry.slug }}>
              <div className="flex items-center gap-2">
                <h3>{entry.title}</h3>
                {entry.is_draft && <Badge variant="secondary">Draft</Badge>}
              </div>
              <p className="font-mono text-secondary text-xs uppercase">
                {format(new Date(entry.created), "dd MMMM yyyy")}
              </p>
              <p className="text-secondary">{entry.summary}</p>
            </Link>
            <div className="mt-2">
              {entry.keywords.map((keyword: string) => (
                <Badge key={keyword} className="mx-0.5">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
