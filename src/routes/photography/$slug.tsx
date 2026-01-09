import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/photography/gallery";
import { PhotographyLayout } from "@/components/photography-layout";
import { listPhotos } from "@/utils/photography";

export const Route = createFileRoute("/photography/$slug")({
  loader: async ({ params }) => {
    const title = params.slug[0].toUpperCase() + params.slug.slice(1);
    const images = await listPhotos({ data: { slug: title } });
    return { title, images };
  },
  component: PhotographySlug,
});

function PhotographySlug() {
  const { images } = Route.useLoaderData();

  return (
    <PhotographyLayout>
      <Gallery images={images} />
    </PhotographyLayout>
  );
}
