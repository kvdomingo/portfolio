import { svip } from "@content";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tilt } from "@/components/ui/tilt";
import info from "@/info.json";
import { buildCld } from "@/utils/cloudinary.client";

export const Route = createFileRoute("/svip/$courseSlug/")({
  loader: ({ params }) => {
    const course = info.svip.courses.find((c) => c.slug === params.courseSlug);
    if (!course) throw notFound();

    const entries = svip
      .filter((entry) => entry.courseSlug === params.courseSlug)
      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

    return { course, entries };
  },
  component: Page,
});

function Page() {
  const { course, entries } = Route.useLoaderData();

  return (
    <div className="container flex flex-col gap-4 pb-12">
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
          <BreadcrumbItem>{course.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {entries.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <Link
              key={entry.slug}
              to="/svip/$courseSlug/$postSlug"
              params={{ courseSlug: course.slug, postSlug: entry.slug }}
              className="card-body"
            >
              <Tilt rotationFactor={6} isRevese className="h-full">
                <div className="relative flex h-full flex-col overflow-hidden rounded-xl">
                  <div className="absolute top-0 left-0 h-full w-full p-6 backdrop-brightness-30">
                    <h2>{entry.title}</h2>
                  </div>
                  <img
                    src={buildCld(entry.cover).backgroundColor("white").toURL()}
                    alt={entry.title}
                    className="aspect-square h-auto w-full object-cover transition-transform duration-300"
                  />
                </div>
              </Tilt>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-md text-secondary-foreground">
          No posts yet. Come back later!
        </div>
      )}
    </div>
  );
}
