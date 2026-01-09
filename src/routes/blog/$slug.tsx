import { blog } from "@content";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ClientDate } from "@/components/common/client-date";
import { Mdx } from "@/components/common/mdx";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="text-primary">
              <Link to="/blog">Blog</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{entry.title}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-3xl">{entry.title}</h1>
        <p className="font-mono text-muted-foreground uppercase">
          <ClientDate date={new Date(entry.created).toISOString()} />
        </p>
      </div>

      <Mdx code={entry.content} />

      <div>
        <h4>Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {entry.keywords.map((keyword: string) => (
            <Badge key={keyword} variant="secondary">
              {keyword}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
