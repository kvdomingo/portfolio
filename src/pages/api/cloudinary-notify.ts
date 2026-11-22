import type { APIRoute } from "astro";

import { dangerouslyDeleteByTag } from "@vercel/functions";

import { cld2 } from "@/actions/_utils/cloudinary.server";
import { publicIdsOf, tagsForPublicIds } from "@/actions/_utils/photography";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.text();
  const timestamp = Number(request.headers.get("x-cld-timestamp"));
  const signature = request.headers.get("x-cld-signature");

  if (
    !timestamp ||
    !signature ||
    !cld2.utils.verifyNotificationSignature(body, timestamp, signature, 7200)
  ) {
    return new Response(null, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(body);
  } catch {
    return new Response(null, { status: 400 });
  }

  const tags = tagsForPublicIds(publicIdsOf(payload));
  if (tags.length) await dangerouslyDeleteByTag(tags);

  return Response.json({ purged: tags });
};
