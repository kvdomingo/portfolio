# Proposal

## Why

Photography galleries feel slow: the grid is a `client:only` React island, so no
image request starts until JS hydrates; `w_auto` without Client Hints likely
serves full-resolution originals; and every page view calls the Cloudinary Admin
API. There is also no way to view a photo full-screen — the old spotlight routes
exist but nothing links to them.

## What Changes

- Server-render the gallery grid in left-to-right (newest-first) order with
  intrinsic `width`/`height`, responsive `srcset`, `f_auto,q_auto`, and a blur
  placeholder; above-the-fold photos load eagerly, the rest use native lazy
  loading.
- Add a full-screen lightbox: on-screen prev/next/close buttons, arrow keys,
  Esc, swipe on touch devices, and a view-transition morph from thumbnail to
  full image.
- Each photo gets a real, shareable path: `/photography/<album>/<photoId>` and
  `/photography/clients/<client>/<photoId>`. Opening a shared path renders the
  gallery with the lightbox open on that photo, with per-photo `og:image`.
- Cache gallery HTML on Vercel's CDN, tagged per album, and purge an album's tag
  when Cloudinary reports an upload/delete/rename in its folder, so new photos
  are visible on the next request without a rebuild.
- **BREAKING** (URLs): remove `/photography/<album>/spotlight/<publicId>` and
  `/photography/clients/<client>/spotlight/<publicId>`. Nothing links to them
  internally.
- Remove the `masonic`-based React `Masonry` island; drop now-unused `masonic`,
  `masonry-layout`, and `@react-hook/window-size`.

## Capabilities

### New Capabilities

- `photography/gallery`: how album galleries are laid out, ordered, and loaded
  (sizes, placeholders, eager/lazy loading).
- `photography/lightbox`: full-screen photo viewing, navigation (buttons, keys,
  swipe), per-photo URLs and history behavior, and transitions.
- `photography/content-freshness`: how gallery pages are cached and how
  Cloudinary changes become visible.

### Modified Capabilities

None.

## Impact

- Pages: `src/pages/photography/[slug]/index.astro`,
  `src/pages/photography/clients/[clientSlug]/index.astro`; new per-photo
  routes; spotlight routes deleted.
- Components: `src/components/photography/Gallery.astro` rewritten as plain
  Astro + small inline/client script;
  `src/components/photography/react/Masonry.tsx` deleted.
- Data: `src/actions/index.ts` (`listPhotos`) returns sized URLs, dimensions,
  photo IDs; `src/actions/_utils/cloudinary.client.ts` URL builders.
- New API route: Cloudinary notification webhook (signature-verified).
- Dependencies: add `@vercel/functions`; remove `masonic`, `masonry-layout`,
  `@react-hook/window-size`. `react-swipeable-views` stays (used by the home
  carousel).
- External config: Cloudinary notification URL (upload, delete, rename events)
  pointing at the webhook.
