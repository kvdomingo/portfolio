import info from "@/info.json";

export const PHOTO_ROOT =
  "kdphotography/portfolio/static/portfolio/media-private";

export const ALBUMS = ["latest", "live", "portraits", "samoetikerffa"] as const;

export interface Photo {
  id: string;
  publicId: string;
  width: number;
  height: number;
  createdAt: string;
}

export const albumFolder = (slug: string) =>
  slug[0].toUpperCase() + slug.slice(1);

export const photoIdOf = (publicId: string) => publicId.split("/").pop()!;

export const albumTag = (slug: string) => `photos-${slug}`;

export const clientTag = (clientSlug: string) => `photos-client-${clientSlug}`;

export function tagsForPublicIds(publicIds: string[]): string[] {
  const tags = new Set<string>();
  for (const publicId of publicIds) {
    if (!publicId.startsWith(`${PHOTO_ROOT}/`)) continue;
    const [first, second] = publicId.slice(PHOTO_ROOT.length + 1).split("/");
    if (first === "clients") {
      const client = info.photography.clients.find(c => c.slug === second);
      if (client) tags.add(clientTag(client.slug));
      continue;
    }
    const album = ALBUMS.find(a => a === first.toLowerCase());
    if (album) tags.add(albumTag(album));
  }
  return [...tags];
}

// Browsers always revalidate; the CDN keeps pages until the tag is purged.
export function setCacheHeaders(headers: Headers, tag: string) {
  headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  headers.set("CDN-Cache-Control", "public, s-maxage=31536000");
  headers.set("Vercel-Cache-Tag", tag);
}

export function publicIdsOf(payload: Record<string, unknown>): string[] {
  const ids = [
    payload.public_id,
    payload.from_public_id,
    payload.to_public_id,
    ...(Array.isArray(payload.public_ids) ? payload.public_ids : []),
    ...(Array.isArray(payload.resources)
      ? payload.resources.map(r => r?.public_id)
      : []),
  ];
  return ids.filter((id): id is string => typeof id === "string");
}
