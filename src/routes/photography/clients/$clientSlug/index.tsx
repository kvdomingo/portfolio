import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import info from '@/info.json'
import PhotographyLayout from '@/components/PhotographyLayout'
import Masonry from '@/components/photography/react/Masonry'
import { listPhotos } from '@/utils/photography'

export const Route = createFileRoute('/photography/clients/$clientSlug/')({
  loader: async ({ params }) => {
    const client = info.photography.clients.find(c => c.slug === params.clientSlug)
    if (!client) throw notFound()
    
    const images = await listPhotos({ data: { slug: client.name, isClient: true } })
    return { client, images }
  },
  component: ClientGallery,
})

function ClientIndex() {
  const { client, images } = Route.useLoaderData()

  return (
    <PhotographyLayout>
      <div className="breadcrumbs px-6">
        <ul>
          <li>
            <Link to="/photography/clients">Clients</Link>
          </li>
          <li>{client.name}</li>
        </ul>
      </div>

      <div className="w-full px-4">
        <Masonry images={images} />
      </div>
    </PhotographyLayout>
  )
}

function ClientGallery() {
  return <ClientIndex />
}
