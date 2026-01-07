import { createFileRoute, Link } from "@tanstack/react-router";
import PhotographyLayout from "@/components/PhotographyLayout";
import info from "@/info.json";
import { buildCldUrl } from "@/utils/cloudinary.client";

export const Route = createFileRoute("/photography/clients/")({
  component: ClientsIndex,
});

function ClientsIndex() {
  const { clients } = info.photography;

  return (
    <PhotographyLayout>
      <div className="grid grid-cols-1 gap-4 px-6 lg:grid-cols-3 xl:grid-cols-4">
        {clients.map((client) => (
          <div
            key={client.slug}
            className="card image-full group aspect-square w-full overflow-hidden shadow-lg"
          >
            <figure>
              <img
                src={buildCldUrl(client.cover)}
                alt={client.name}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </figure>
            <Link
              to="/photography/clients/$clientSlug"
              params={{ clientSlug: client.slug }}
              className="card-body"
            >
              <h2 className="card-title text-white">{client.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </PhotographyLayout>
  );
}
