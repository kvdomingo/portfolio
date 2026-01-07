import { blog } from "@content";
import { createFileRoute, Link } from "@tanstack/react-router";
import { compareDesc, format } from "date-fns";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
});

function BlogIndex() {
  const entries = blog
    .filter((entry) => (process.env.NODE_ENV === "production" ? !entry.is_draft : true))
    .sort((a, b) => compareDesc(new Date(a.created), new Date(b.created)));

  return (
    <div className="container text-center">
      <div className="flex flex-col gap-4 text-left">
        {entries.map((entry) => (
          <div
            key={entry.slug}
            className="space-y-4 rounded-xl p-4 transition-[border] duration-100 hover:border hover:border-white hover:border-solid"
          >
            <Link to="/blog/$slug" params={{ slug: entry.slug }}>
              <div className="flex items-center gap-2">
                <h3>{entry.title}</h3>
                {entry.is_draft && (
                  <span className="badge badge-neutral badge-lg">Draft</span>
                )}
              </div>
              <p className="text-ctp-subtext0">
                {format(new Date(entry.created), "MMMM dd, yyyy")}
              </p>
              <p>{entry.summary}</p>
            </Link>
            <div>
              {entry.keywords.map((keyword: string) => (
                <span key={keyword} className="badge badge-neutral badge-lg mx-0.5">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
