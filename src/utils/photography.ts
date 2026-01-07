import { Resize } from "@cloudinary/url-gen/actions";
import { createServerFn } from "@tanstack/react-start";
import type { ResourceApiResponse } from "cloudinary";
import z from "zod";
import cld from "./cloudinary.client";
import { cld2, DEFAULT_OPTIONS } from "./cloudinary.server";

export const listPhotos = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      slug: z.string(),
      isClient: z.boolean().optional().default(false),
    }),
  )
  .handler(async ({ data }) => {
    const { slug: title, isClient } = data;
    const body = (await cld2.api.resources({
      ...DEFAULT_OPTIONS,
      prefix: `kdphotography/portfolio/static/portfolio/media-private/${isClient ? "clients/" : ""}${title}`,
    })) as ResourceApiResponse;

    const { resources = [] } = body;

    const images = resources.map<ResourceApiResponse["resources"][number]>(
      (resource) => ({
        ...resource,
        secure_url: cld
          .image(resource.public_id)
          .resize(Resize.scale().width("auto"))
          .toURL(),
      }),
    );

    images.sort((a, b) => b.created_at.localeCompare(a.created_at));

    return images;
  });
