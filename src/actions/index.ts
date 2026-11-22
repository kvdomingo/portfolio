import type { ResourceApiResponse } from "cloudinary";

import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import { DEFAULT_OPTIONS, cld2 } from "./_utils/cloudinary.server";
import { PHOTO_ROOT, type Photo, photoIdOf } from "./_utils/photography";

export const server = {
  listPhotos: defineAction({
    input: z.object({
      slug: z.string().nonempty(),
      isClient: z.boolean().optional().default(false),
    }),
    handler: async ({ slug: title, isClient }): Promise<Photo[]> => {
      const { resources } = (await cld2.api.resources({
        ...DEFAULT_OPTIONS,
        prefix: `${PHOTO_ROOT}/${isClient ? "clients/" : ""}${title}`,
      })) as ResourceApiResponse;

      return resources
        .map(r => ({
          id: photoIdOf(r.public_id),
          publicId: r.public_id,
          width: r.width,
          height: r.height,
          createdAt: r.created_at,
        }))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
  }),
};
