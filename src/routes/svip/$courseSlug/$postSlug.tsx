import { svip } from "@content";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ClientDate from "@/components/common/ClientDate";
import Mdx from "@/components/common/Mdx";
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
  component: SvipPost,
});

function SvipPost() {
  const { course, entry } = Route.useLoaderData();

  return (
    <div className="container flex flex-col gap-8 py-8">
      <div className="breadcrumbs">
        <ul>
          <li>
            <Link to="/svip">Courses</Link>
          </li>
          <li>
            <Link to="/svip/$courseSlug" params={{ courseSlug: course.slug }}>
              {course.name}
            </Link>
          </li>
          <li>{entry.title}</li>
        </ul>
      </div>

      <h3>{entry.title}</h3>
      <p className="text-neutral-400">
        <ClientDate date={new Date(entry.created).toISOString()} />
      </p>

      <div className="prose prose-invert max-w-none">
        <Mdx code={entry.content} />
      </div>

      <h4>Keywords</h4>
      <div className="flex flex-wrap gap-2">
        {entry.keywords.map((keyword: string) => (
          <div key={keyword} className="badge badge-neutral badge-lg">
            {keyword}
          </div>
        ))}
      </div>
    </div>
  );
}
