# Design

## Context

- Astro 7 with `output: "server"` on the Vercel adapter. `getStaticPaths` in the
  album pages is ignored (there is no `prerender`), so every view runs
  `listPhotos`, which calls the Cloudinary Admin API `resources()`.
- `Layout.astro` mounts `<ClientRouter />` (Astro view transitions).
  `astro.config` sets
  `prefetch: { prefetchAll: true, defaultStrategy: "viewport" }`.
- The grid is `Masonry.tsx` (masonic, `client:only="react"`, virtualized). URLs
  use `Resize.scale().width("auto")`, which falls back to the original width
  without Client Hints.
- Admin API resources already include `width`, `height`, `public_id` and
  `created_at`.
- Album folders:
  `kdphotography/portfolio/static/portfolio/media-private/<Album>` and
  `.../media-private/clients/<clientSlug>` (folders are named by slug, not
  display name). Client names and slugs live in `info.json` →
  `photography.clients`.
- `Layout.astro` hardcodes `og:image`.
- `react-swipeable-views` is used by the home carousel, so it stays.

## Goals / Non-Goals

**Goals:**

- Images start loading straight from the HTML, with no framework runtime on
  gallery pages.
- One page component serves the album, client album and per-photo paths.

**Non-Goals:**

- Pinch-zoom, captions/EXIF, or a download button in the lightbox.
- Changing the album list or the Sidenav.
- Pagination: albums stay one page (the `max_results: 500` cap is unchanged).
- Optimizing the home-page carousel.

## Decisions

### 1. Plain Astro grid with server-assigned columns and a small inline re-layout script

The server sorts photos newest first. For each column count (1–4) it can compute
a greedy "shortest column" assignment from the aspect ratios, since a column's
height is proportional to Σ(h/w). The HTML holds all `<figure>`s in reading
order inside a container. An inline `<script>` placed right after the grid reads
the width, works out the column count, and moves the existing nodes into N flex
column wrappers before first paint. A `matchMedia` listener per breakpoint
re-runs it. Moving nodes keeps the loaded `<img>` elements, so nothing is
fetched again.

- *Without JS:* the container falls back to a CSS grid in reading order with
  natural aspect ratios. The rows are uneven, but every photo shows.
- *Alternatives:*
  - masonic, but rendered on the server: it needs window measurement, ships
    React, and virtualizes, which fights lookahead loading.
  - CSS `columns`: orders photos top-to-bottom per column, which breaks the
    newest-first reading order.
  - CSS `display: grid-lanes` / masonry: browser support isn't reliable yet.

### 2. Image URLs

`listPhotos` returns a slim DTO per photo:
`{ id, publicId, width, height, createdAt }`. URL builders in
`cloudinary.client.ts`:

- **Grid:** `srcset` at widths 400/800/1200/1600, each
  `c_scale,w_<n>,f_auto,q_auto`. `sizes` follows the column breakpoints (e.g.
  `(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw`,
  minus the gutters).
- **Placeholder:** `w_32,e_blur:1000,q_1,f_auto`, set as the figure's CSS
  `background-image`. The figure also gets `aspect-ratio: w/h`, and the `<img>`
  gets `width`/`height` attributes.
- **Lightbox:** `srcset` at 1280/1920/2560/3840 with `sizes="100vw"`.

Raw Cloudinary resource objects stop being sent to the page.

### 3. Eager count

The first 8 photos in reading order get `loading="eager"`, and the first 4 also
get `fetchpriority="high"`. Everything else uses `loading="lazy"`, relying on
the browser's built-in lookahead distance. `decoding="async"` everywhere. An
`IntersectionObserver` with a larger `rootMargin` would only be added if testing
shows the native distance is too short.

### 4. Routing: one page component, optional photo segment

- Routes:
  - `src/pages/photography/[slug]/[...photo].astro` handles
    `/photography/<album>` and `/photography/<album>/<photoId>`.
  - `src/pages/photography/clients/[clientSlug]/[...photo].astro` does the same
    for client albums.
  - The existing `index.astro` files and both `spotlight/` routes are deleted.
- Astro's static routes (`gear`, `clients`, `clients/index`) take precedence
  over these dynamic ones.
- **Album validation:** unknown `slug` returns 404 against an explicit album
  list (the one currently in `getStaticPaths`), which moves to a constant.
- **Photo IDs:** `photoId` is the `public_id` basename. If the ID isn't in the
  album, the page returns `new Response(null, { status: 404 })`.
- **Shared markup:** both pages render a shared `PhotoGallery.astro` with
  `{ photos, basePath, initialPhotoId? }`.
- `Layout.astro` gains optional `image`/`description` props for OG/Twitter meta.
  Photo pages pass a 1200w JPEG URL.

### 5. Lightbox: `<dialog>` + scroll-snap strip + same-document view transitions

- **Markup:** one `<dialog>` per gallery page, rendered by the server.
  - Inside is a horizontal strip
    (`overflow-x: auto; scroll-snap-type: x mandatory`), with one slide per
    photo holding a lazy `<img>`.
  - Plus prev, next and close `<button>`s with `aria-label`s.
  - Native touch scrolling gives swipe with momentum, so there is no gesture
    code.
- **Thumbnails** are `<a href="<basePath>/<id>" data-astro-prefetch="false">`
  wrapping the `<img>`. That works without JS and on middle-click, and stops
  viewport prefetch from fetching 500 photo pages.
- **Open** (click handler on the grid; skipped for modifier or middle clicks):
  1. Cancel the default click (`preventDefault`).
  2. Give the clicked thumbnail `view-transition-name: photo`.
  3. `document.startViewTransition(update)`. Inside `update`:
     - `showModal()`;
     - jump the strip to the slide with `scrollTo({ behavior: "instant" })`;
     - set the slide image's `src` to the thumbnail's `currentSrc` (already
       cached, so the morph's end state isn't blank), then apply the lightbox
       `srcset`;
     - move the `view-transition-name` from the thumbnail to the slide image;
     - `history.pushState(null, "", photoUrl)`.
  4. Without `startViewTransition`, or with `prefers-reduced-motion`, run
    `update` directly.
- **Navigate:**
  - Buttons and arrow keys call
    `strip.scrollBy({ left: ±width, behavior: "smooth" })`.
  - On `scrollend`, compute the index, run
    `history.replaceState(null, "", url)`, update the buttons' disabled state,
    and preload the neighbours with `new Image()` using the lightbox
    `srcset`/`sizes`.
- **Close:**
  - The close button and Esc (the dialog's `cancel` event, default prevented)
    call `history.back()` if we pushed the entry. Otherwise (direct visit) they
    run `replaceState(null, "", basePath)` and close.
  - The `popstate` handler closes the dialog through the same reverse view
    transition: the name moves back to the thumbnail of the current photo, which
    is scrolled into view (`scrollIntoView({ block: "nearest" })`) before the
    snapshot. Focus goes to that thumbnail's `<a>`.
  - Forward (`popstate` to a photo URL while closed) reopens on the photo in the
    URL.
- **Direct visit:** the server does not render `<dialog open>`, because the
  `open` attribute doesn't put the dialog in the top layer or make the page
  inert. Instead the server sets `data-initial="<id>"`, and an inline script
  calls `showModal()` and jumps the strip before first paint (no animation).
  History is not pushed, so Esc and close use the `replaceState` branch.
- **Alternatives:**
  - Separate route plus `ClientRouter` cross-document `transition:name` (the old
    spotlight approach): each next/prev becomes a page fetch, the gallery isn't
    behind the lightbox, and swipe feels laggy.
  - `@radix-ui/react-dialog`: would bring React back to the page.

### 6. Coexisting with `ClientRouter`

- **Clicks:** Astro's link handler skips clicks that are already
  default-prevented. Our grid listener calls `preventDefault()` on the anchor
  click. Astro's listener is on `document`, ours is closer to the anchor, so
  ours runs first.
- **History:** Astro's `popstate` handler returns early when `history.state` is
  `null` (state it didn't create). So we always pass `null` and handle
  `popstate` ourselves.
- **Re-initialisation:** scripts run on `astro:page-load`, so the gallery script
  re-initialises after ClientRouter navigations between albums.
- Task 1 verifies all of this before the rest is built.
- **Results (Chromium, verified on the real gallery):**
  - Clicks: confirmed — no router fetch for the thumbnail href.
  - History: **assumption failed.** Back from our pushed entry lands on the
    album entry, which carries ClientRouter's state, so its `popstate` handler
    re-fetched the album. A `capture: true` listener did not preempt it: at the
    window target, Chromium ran ClientRouter's earlier-registered listener
    first. Applied fix: `Layout.astro` registers an inline `popstate` listener
    in `<head>`, before `<ClientRouter />`, that forwards to
    `window.__lightboxPopState`; the gallery handler calls
    `stopImmediatePropagation()` for entries it owns. Replacing the URL uses
    `history.replaceState(history.state, …)` so the router's state on a directly
    visited entry survives.
  - Re-initialisation: in dev the gallery module ran after the initial
    `astro:page-load`, so it also initialises immediately (idempotent via
    `data-ready`).
  - Not yet verified: Safari, and the no-blank-frame morph (visual check).

### 7. Freshness: tagged CDN cache + purge on Cloudinary notification

- **Page responses** set:
  - `Cache-Control: public, max-age=0, must-revalidate` (browsers always
    revalidate);
  - `CDN-Cache-Control: public, s-maxage=31536000` (Vercel's CDN keeps the page
    until it's purged);
  - `Vercel-Cache-Tag: photos-<album>` (client albums:
    `photos-client-<clientSlug>`).
- **Webhook:** `src/pages/api/cloudinary-notify.ts` (POST, `prerender = false`):
  1. Verify `X-Cld-Signature`/`X-Cld-Timestamp` with
    `cloudinary.utils.verifyNotificationSignature(body, timestamp, signature, validFor=7200)`
    against the raw body. Return 401 on failure.
  2. Parse the payload. Upload, delete and rename notifications carry
    `public_id`/`public_ids`/`from_public_id`/`to_public_id`, depending on
    type.
  3. Map each folder under `media-private/` to a tag: an `Album` folder
    (case-insensitive match against the album list) or `clients/<clientSlug>`
    (matched against `info.json` slugs).
  4. `dangerouslyDeleteByTag([...tags])` from `@vercel/functions`. Return 200
    even if nothing matched.
- **Why delete and not invalidate:** `invalidateByTag` serves stale content once
  while revalidating, which breaks the "next request is fresh" requirement.
  Deleting means the next request misses the cache: one Admin API call per
  change.
- **Alternatives:**
  - Prerender + deploy hook: minutes of latency (rejected).
  - Plain SSR with no cache: Admin API rate limits and slow TTFB.
  - Short `s-maxage` + SWR: not immediate.
  - Astro Vercel `isr` with `bypassToken`: revalidation is per path, so 500+
    photo paths per album would each need a purge request. Tags cover them in
    one call.
- **Cloudinary setup** (manual, documented in tasks): set the notification URL
  to `https://kvd.studio/api/cloudinary-notify` for the upload, delete and
  rename event types.

### 8. Dependencies

- **Add:** `@vercel/functions`.
- **Remove:** `masonic`, `masonry-layout` (already unused),
  `@react-hook/window-size`.
- **Delete:** `Masonry.tsx` and the `react/` folder under
  `components/photography` if empty.

## Risks / Trade-offs

- **CDN cache tags don't purge as expected.** There are community reports of tag
  purges not working, and `CDN-Cache-Control` must actually be honoured. → Task
  2 deploys a preview and verifies hit → purge → miss before the rest relies on
  it. Fallback: drop to `s-maxage=60, stale-while-revalidate`, and record that
  in the spec as a deviation for the user to approve.
- **`ClientRouter` assumptions are wrong** (cancelled-click skip, null-state
  `popstate`). → Task 1 spike. Fallback: `data-astro-reload` on thumbnails plus
  a `popstate` listener added with `capture: true` that stops propagation when
  we own the entry.
- **The dialog morph misbehaves in Safari** (top-layer snapshot). → Test in the
  spike. Fallback: skip the transition when the dialog snapshot fails (feature
  flag in code), or morph without the dialog's backdrop.
- **The inline re-layout script runs after the browser has already laid out a
  large DOM** (up to 500 figures). → Moving nodes is O(n) with one reflow, well
  below a frame budget for 500 nodes. The lightbox strip's 500 slides stay
  `loading="lazy"` inside a non-displayed dialog, so they cost no network until
  opened.
- **Lightbox strip markup doubles the page's `<img>` count.** → It's acceptable
  as HTML weight (~a few KB gzipped). An alternative is a 3-slide window that's
  re-rendered on navigation. Revisit if HTML size becomes noticeable.
- **`scrollend` support:** Safari added it late. → Fall back to a debounced
  `scroll` listener when `onscrollend` isn't in `window`.
- **Photo ID collisions:** two files in one album with the same basename and
  different extensions. → Very unlikely in this folder layout. On collision, the
  newest wins.
- **A webhook outage means a missed purge, so the album stays stale
  indefinitely** (one-year `s-maxage`). → Cloudinary retries failed
  notifications. The manual escape hatch is purging the tag from the Vercel
  dashboard or CLI (`vercel cache invalidate --tag`).

## Migration Plan

1. Deploy to a preview, verify the spikes, the cache headers and a webhook purge
  (with the Cloudinary notification temporarily pointed at the preview URL).
2. Merge. Set the production Cloudinary notification URL.
3. Old `/spotlight/` URLs return 404. They had no internal links, so no
  redirects are needed.
4. Rollback: revert the merge. Leaving the notification URL in place afterwards
  is harmless (404s).
