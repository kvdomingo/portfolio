import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import { Resize } from "@cloudinary/url-gen/actions";
import type { ResourceApiResponse } from "cloudinary";

import cld from "./_utils/cloudinary.client";
import { DEFAULT_OPTIONS, cld2 } from "./_utils/cloudinary.server";

export const server = {
  listPhotos: defineAction({
    input: z.object({
      slug: z.string().nonempty(),
      isClient: z.boolean().optional().default(false),
    }),
    handler: async ({ slug: title, isClient }) => {
      const body = (await cld2.api.resources({
        ...DEFAULT_OPTIONS,
        prefix: `kdphotography/portfolio/static/portfolio/media-private/${isClient ? "clients/" : ""}${title}`,
      })) as ResourceApiResponse;

      const { resources = [] } = body;

      const images = resources.map<ResourceApiResponse["resources"][number]>(
        resource => ({
          ...resource,
          secure_url: cld
            .image(resource.public_id)
            .resize(Resize.scale().width("auto"))
            .toURL(),
        }),
      );

      images.sort((a, b) => b.created_at.localeCompare(a.created_at));

      return images;
    },
  }),
};
