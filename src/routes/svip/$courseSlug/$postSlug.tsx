import { svip } from "@content";
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
import info from "@/info.json";

export const Route = createFileRoute("/svip/$courseSlug/$postSlug")({
  loader: ({ params }) => {
    const course = info.svip.courses.find((c) => c.slug === params.courseSlug);
    if (!course) throw notFound();

    const entry = svip.find(
      (s) => s.courseSlug === params.courseSlug && s.slug === params.postSlug,
    );
    if (!entry) throw notFound();

    return { course, entry };
  },
  component: Page,
});

function Page() {
  const { course, entry } = Route.useLoaderData();

  return (
    <div className="container flex flex-col gap-8 py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/svip" className="text-primary">
                Courses
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to="/svip/$courseSlug"
                params={{ courseSlug: course.slug }}
                className="text-primary"
              >
                {course.name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{entry.title}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h3>{entry.title}</h3>
      <p className="font-mono text-muted-foreground uppercase">
        <ClientDate date={new Date(entry.created).toISOString()} />
      </p>

      <div className="max-w-none">
        <Mdx code={entry.content} />
      </div>

      <h4>Keywords</h4>
      <div className="flex flex-wrap gap-2">
        {entry.keywords.map((keyword: string) => (
          <Badge key={keyword} variant="secondary">
            {keyword}
          </Badge>
        ))}
      </div>
    </div>
  );
}
