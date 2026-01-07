import { createFileRoute, Link } from "@tanstack/react-router";
import info from "@/info.json";
import { buildCldUrl } from "@/utils/cloudinary.client";

export const Route = createFileRoute("/svip/")({
  component: SvipIndex,
});

function SvipIndex() {
  const { courses } = info.svip;

  return (
    <div className="container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <div
          key={course.slug}
          className="card image-full bg-base-300 shadow-xl overflow-hidden group"
        >
          <figure>
            <img
              src={buildCldUrl(course.cover)}
              alt={course.title}
              className="aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </figure>
          <Link
            to="/svip/$courseSlug"
            params={{ courseSlug: course.slug }}
            className="card-body"
          >
            <h2 className="card-title text-white">{course.name}</h2>
            <p className="text-gray-200">{course.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
