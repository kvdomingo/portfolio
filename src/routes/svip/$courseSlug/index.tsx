import { svip } from "@content";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import info from "@/info.json";
import { buildCldUrl } from "@/utils/cloudinary.client";

export const Route = createFileRoute("/svip/$courseSlug/")({
  loader: ({ params }) => {
    const course = info.svip.courses.find((c) => c.slug === params.courseSlug);
    if (!course) throw notFound();

    const entries = svip
      .filter((entry) => entry.courseSlug === params.courseSlug)
      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

    return { course, entries };
  },
  component: CourseIndex,
});

function CourseIndex() {
  const { course, entries } = Route.useLoaderData();

  return (
    <div className="container flex flex-col gap-4 pb-12">
      <div className="breadcrumbs">
        <ul>
          <li>
            <Link to="/svip">Courses</Link>
          </li>
          <li>{course.name}</li>
        </ul>
      </div>

      {entries.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <div
              key={entry.slug}
              className="card image-full group aspect-square overflow-hidden bg-base-300 shadow-xl"
            >
              <figure>
                <img
                  src={buildCldUrl(entry.cover)}
                  alt={entry.title}
                  className="aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </figure>
              <Link
                to="/svip/$courseSlug/$postSlug"
                params={{ courseSlug: course.slug, postSlug: entry.slug }}
                className="card-body"
              >
                <h2 className="card-title text-white">{entry.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-gray-400 text-md">
          No posts yet. Come back later!
        </div>
      )}
    </div>
  );
}
