import { blog } from "@content";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ClientDate from "@/components/common/ClientDate";
import Mdx from "@/components/common/Mdx";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const entry = blog.find((b) => b.slug === params.slug);
    if (!entry) throw notFound();
    return entry;
  },
  component: BlogPost,
});

function BlogPost() {
  const entry = Route.useLoaderData();

  return (
    <div className="container flex flex-col gap-8 py-6">
      <div className="breadcrumbs">
        <ul>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>{entry.title}</li>
        </ul>
      </div>

      <div>
        <h1 className="text-3xl">{entry.title}</h1>
        <p className="text-neutral-400">
          <ClientDate date={new Date(entry.created).toISOString()} />
        </p>
      </div>

      <Mdx code={entry.content} />

      <div>
        <h4>Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {entry.keywords.map((keyword: string) => (
            <div key={keyword} className="badge badge-neutral badge-lg">
              {keyword}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
