# Tasks

## 1. Spike: ClientRouter + dialog view transition

- [x] 1.1 On a throwaway page, wrap an `<a>` in a grid with a click handler that
  calls `preventDefault()` + `pushState(null, …)` + `startViewTransition` into a
  `showModal()` dialog. Verify in Chrome and Safari:
  - the click does not trigger an Astro navigation (no network request for the
    href);

  - Back fires our `popstate` without an Astro navigation;

  - the morph into and out of the top-layer dialog renders with no blank frame.

    Record the results in design.md Decision 6. Apply the documented fallback
    for any assumption that fails.

## 2. Spike: tagged CDN cache purge

- [x] 2.1 Add `@vercel/functions` and verify `bun install` succeeds.
- [x] 2.2 On a Vercel preview, serve a test SSR page with
      `CDN-Cache-Control: public, s-maxage=31536000` and
      `Vercel-Cache-Tag: spike`. Call `dangerouslyDeleteByTag("spike")` from a
      test endpoint. Verify the `x-vercel-cache` header goes HIT → (purge) →
      MISS → HIT. If purge doesn't work, stop and raise the fallback in
      design.md Risks with the user.

## 3. Photo data and URL builders

- [x] 3.1 Change `listPhotos` (`src/actions/index.ts`) to return
      `{ id, publicId, width, height, createdAt }[]`, sorted newest first, with
      `id` = the `public_id` basename. Move the album list (latest, live,
      portraits, samoetikerffa) into a shared constant. Verify by logging one
      album's output in dev.
- [x] 3.2 Add grid, placeholder, lightbox and OG URL builders in
      `src/actions/_utils/cloudinary.client.ts` (`f_auto,q_auto`, explicit
      widths per design Decision 2). Remove `w_auto` usage from the photography
      code. Verify a grid URL in the browser returns an image at most the
      requested width.

## 4. Server-rendered grid

- [x] 4.1 Create `src/components/photography/PhotoGallery.astro`:
  - `<figure>`s in reading order, each with `aspect-ratio`, a blur placeholder
    background, and an `<a href data-astro-prefetch="false">` wrapping an
    `<img>` with `width`/`height`, `srcset`/`sizes`, `decoding="async"`;

  - first 8 eager and first 4 `fetchpriority="high"`, the rest lazy.

    Verify with JS disabled: all photos visible in order, no layout shift.
- [x] 4.2 Add the inline column-layout script (greedy shortest column by Σh/w,
  breakpoints 768/1024/1280 → 1/2/3/4 columns, `matchMedia` re-layout, re-run on
  `astro:page-load`). Extract the assignment as a pure function with a
  `bun test` file asserting:
  - left-to-right order for equal aspect ratios;

  - shortest-column placement for mixed ratios.

    Verify the test passes, and that resizing across breakpoints in DevTools
    re-lays out with no new image requests in the Network tab.
- [x] 4.3 Lighthouse/DevTools check on `/photography/live` with throttled "Fast
      4G": the first row is requested before any JS executes, and no image
      request exceeds ~1600px wide on a 1440px desktop viewport.

## 5. Routes and metadata

- [x] 5.1 Replace `src/pages/photography/[slug]/index.astro` with
  `[slug]/[...photo].astro`.
  - Unknown album → 404; unknown photo ID → 404.

  - Renders `PhotoGallery` with `basePath` and `initialPhotoId`.

    Verify `/photography/live`, `/photography/live/<real-id>`,
    `/photography/live/nope` (404) and `/photography/nope` (404). Also confirm
    `/photography/gear` and `/photography/clients` still route to their own
    pages.
- [x] 5.2 Do the same for `src/pages/photography/clients/[clientSlug]/`
      (breadcrumbs kept). Verify one client album and one client photo path.
- [x] 5.3 Add optional `image`/`description` props to `Layout.astro` for
      OG/Twitter image meta. Photo pages pass the OG URL. Verify via view-source
      on a photo path.
- [x] 5.4 Delete both `spotlight/[...publicId].astro` routes, `Gallery.astro`,
      and `react/Masonry.tsx`. Verify `/photography/live/spotlight/x` returns
      404 and `bunx astro check` (or `astro build`) passes.

## 6. Lightbox

- [x] 6.1 Add the `<dialog>` to `PhotoGallery.astro`:
  - scroll-snap strip with lazy lightbox-`srcset` slides;

  - prev, next and close buttons with `aria-label`s;

  - `object-fit: contain`, full-viewport styling via daisyUI/Tailwind.

    Verify by opening it from the console with `showModal()`: photos are
    uncropped, and swiping on a touch-emulated device snaps per photo.
- [x] 6.2 Open behaviour per design Decision 5:
  - grid click handler (ignoring modifier and middle clicks);

  - thumbnail `currentSrc` as the initial slide src;

  - `view-transition-name` hand-off;

  - `pushState`;

  - reduced-motion and unsupported-browser path without the transition.

    Verify the URL becomes `/photography/<album>/<id>`, the morph has no blank
    frame, and Ctrl/middle-click opens a new tab instead.
- [x] 6.3 Navigation: buttons and arrow keys scroll the strip; on `scrollend` (with
  a debounced-`scroll` fallback), `replaceState`, update the boundary-button
  disabled state, and preload the neighbours. Verify:
  - Right/Left/swipe update the URL;
  - Back after several moves closes in one step;
  - the first and last photos disable prev and next;
  - the neighbours appear in the Network tab before navigating.
- [x] 6.4 Close behaviour: the close button and Esc call `history.back()` when
      we pushed the entry, else `replaceState(basePath)`. The `popstate` handler
      closes with the reverse morph after scrolling the current thumbnail into
      view, then focuses it. Forward reopens on the photo in the URL. Verify
      each of these, plus that focus returns to the thumbnail.
- [x] 6.5 Direct visit: an inline script opens the dialog on `data-initial`
      before first paint, without animation or pushState. Verify that loading a
      photo path shows the lightbox immediately, that Esc lands on the album
      path, and that Back leaves the site/previous page.

## 7. Content freshness

- [x] 7.1 Set `Cache-Control`, `CDN-Cache-Control` and `Vercel-Cache-Tag`
      (`photos-<album>` / `photos-client-<clientSlug>`) on album and photo page
      responses. Verify the headers on a preview deployment.
- [x] 7.2 Add `src/pages/api/cloudinary-notify.ts`:
  - verify the signature against the raw body (`validFor` 7200s); return 401 on
    failure;

  - map public IDs from upload, delete and rename payloads to tags;

  - `dangerouslyDeleteByTag`; return 200.

    Extract the folder→tag mapping as a pure function with `bun test` cases for:
    album folder (case-insensitive), client folder, rename across albums (both
    tags), and an unrelated folder (no tags). Verify the tests pass, and that an
    unsigned `curl` POST returns 401.
- [x] 7.3 End to end on a preview: point the Cloudinary notification URL at the
      preview, upload a test photo to an album, and confirm the next page load
      shows it. Then delete it, confirm it disappears and its photo path 404s.
      Restore the notification URL afterwards.
- [x] 7.4 Add a short section to the README covering the Cloudinary notification
      setup (URL, event types) and the manual purge escape hatch
      (`vercel cache invalidate --tag photos-<album>`). Verify the documented
      command runs.

## 8. Cleanup and integration

- [x] 8.1 Remove `masonic`, `masonry-layout` and `@react-hook/window-size` from
      package.json. Verify `bun install` and `astro build` succeed and nothing
      else imports them.
- [x] 8.2 Run `bunx oxlint --fix`, `bunx oxfmt`, then
      `bunx oxlint --deny-warnings --format=agent`; verify the final lint is
      clean.
- [x] 8.3 Final pass on production after merge:
  - set the production Cloudinary notification URL;
  - smoke-test an album, a client album, a shared photo link (incl. a link
    preview via a card validator), swipe on a phone, and arrow keys plus Esc on
    desktop.

## Workflow follow-up

- Archive the change after review and production verification.
