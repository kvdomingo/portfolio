import { createFileRoute } from '@tanstack/react-router'
import PhotographyLayout from '@/components/PhotographyLayout'
import Gallery from '@/components/photography/Gallery'
import { listPhotos } from '@/utils/photography'

export const Route = createFileRoute('/photography/$slug')({
  loader: async ({ params }) => {
    const title = params.slug[0].toUpperCase() + params.slug.slice(1)
    const images = await listPhotos({ data: { slug: title } })
    return { title, images }
  },
  component: PhotographySlug,
})

function PhotographySlug() {
  const { images } = Route.useLoaderData()

  return (
    <PhotographyLayout>
      <Gallery images={images} />
    </PhotographyLayout>
  )
}
