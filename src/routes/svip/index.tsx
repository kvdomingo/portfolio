import { createFileRoute, Link } from "@tanstack/react-router";
import { Tilt } from "@/components/ui/tilt";
import info from "@/info.json";
import { buildCld } from "@/utils/cloudinary.client";

export const Route = createFileRoute("/svip/")({
  component: Page,
});

function Page() {
  const { courses } = info.svip;

  return (
    <div className="container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.slug} course={course} />
      ))}
    </div>
  );
}

function CourseCard({ course }: { course: (typeof info.svip.courses)[number] }) {
  const coverUrl = buildCld(course.cover).backgroundColor("white").toURL();

  return (
    <Link
      key={course.slug}
      to="/svip/$courseSlug"
      params={{ courseSlug: course.slug }}
      className="h-full"
    >
      <Tilt rotationFactor={6} isRevese className="h-full">
        <div className="relative flex h-full flex-col overflow-hidden rounded-xl">
          <div className="absolute top-0 left-0 h-full w-full p-6 backdrop-brightness-20">
            <h2>{course.name}</h2>
            <p>{course.description}</p>
          </div>
          <img
            src={coverUrl}
            alt={course.title}
            className="aspect-square h-auto w-full object-cover transition-transform duration-300"
          />
        </div>
      </Tilt>
    </Link>
  );
}
