# Spec Delta

## Purpose

Defines full-screen viewing of a single photo from a gallery: opening and
closing it, moving between photos, its shareable per-photo URL, and its
transitions.

## ADDED Requirements

### Requirement: Open a photo full-screen

Activating a gallery photo SHALL open a full-screen lightbox showing that photo,
fit to the viewport without cropping, over the gallery page.

#### Scenario: Click a thumbnail

- **WHEN** the user clicks a photo in the gallery
- **THEN** a full-screen lightbox opens showing that photo uncropped, without a
  full page load

#### Scenario: Keyboard activation

- **WHEN** a gallery photo has keyboard focus and the user presses Enter
- **THEN** the lightbox opens on that photo

### Requirement: Per-photo URL

Each photo SHALL have a shareable path: `/photography/<album>/<photoId>` for
albums and `/photography/clients/<client>/<photoId>` for client albums, where
`<photoId>` is the photo's file name without folder or extension. The address
bar SHALL show this path while the lightbox is open on that photo.

#### Scenario: URL on open

- **WHEN** the user opens photo `KVD-0835` from `/photography/live`
- **THEN** the address bar shows `/photography/live/KVD-0835`

#### Scenario: Unknown photo

- **WHEN** a request is made for a photo path whose photo is not in that album
- **THEN** the server responds with HTTP status 404

### Requirement: Direct visit to a photo path

Loading a per-photo path directly SHALL render the album's gallery with the
lightbox already open on that photo, and the page SHALL expose that photo as its
social preview image.

#### Scenario: Shared link

- **WHEN** someone opens a shared link `/photography/live/KVD-0835`
- **THEN** they see the lightbox open on that photo, with the live gallery
  behind it

#### Scenario: Link preview

- **WHEN** a social platform fetches `/photography/live/KVD-0835`
- **THEN** the page's preview image metadata references that photo

### Requirement: Navigate between photos

While open, the lightbox SHALL move to the previous/next photo in gallery order
via on-screen buttons, the Left/Right arrow keys, and horizontal swipe on touch
devices. Navigation SHALL stop at the first and last photo.

#### Scenario: Arrow keys

- **GIVEN** the lightbox is open on the 3rd photo
- **WHEN** the user presses the Right arrow key
- **THEN** the 4th photo is shown and the URL changes to the 4th photo's path

#### Scenario: Swipe

- **GIVEN** the lightbox is open on a touch device
- **WHEN** the user swipes left
- **THEN** the next photo is shown and the URL updates

#### Scenario: Boundary

- **GIVEN** the lightbox is open on the last photo
- **WHEN** the user presses Right or swipes left
- **THEN** the last photo stays shown and the "next" button is disabled or
  hidden

### Requirement: Adjacent photos preloaded

When a photo is shown in the lightbox, its previous and next photos SHALL be
fetched at lightbox resolution so navigation shows them without a visible load.

#### Scenario: Next is ready

- **GIVEN** the lightbox has been open on a photo for a moment
- **WHEN** the user moves to the next photo
- **THEN** it displays at full lightbox resolution without a loading state

### Requirement: Close the lightbox

The lightbox SHALL close via an on-screen close button, the Escape key, or the
browser Back button, returning to the gallery with the last-shown photo in view
and the address bar showing the album path.

#### Scenario: Back button after browsing

- **GIVEN** the user opened photo 3 from the album page and navigated to photo 7
- **WHEN** the user presses the browser Back button once
- **THEN** the lightbox closes and the address bar shows the album path

#### Scenario: Escape after direct visit

- **GIVEN** the user landed directly on a photo path
- **WHEN** the user presses Escape
- **THEN** the lightbox closes and the address bar shows the album path

### Requirement: History entries

Opening the lightbox from the gallery SHALL add one browser history entry;
moving between photos SHALL replace that entry rather than add new ones.

#### Scenario: Forward after close

- **GIVEN** the user opened a photo and then pressed Back to close it
- **WHEN** the user presses Forward
- **THEN** the lightbox reopens on the photo that was showing when it closed

### Requirement: Animated open and close

In browsers that support view transitions, opening SHALL animate the clicked
thumbnail growing into the full-screen photo, and closing SHALL animate it back
into its gallery position. Browsers without support SHALL open and close without
animation but otherwise behave the same. Users who prefer reduced motion SHALL
get no morph animation.

#### Scenario: Supported browser

- **WHEN** the user opens a photo in a browser with view transitions
- **THEN** the thumbnail visibly morphs into the full-screen photo without a
  blank frame

#### Scenario: Reduced motion

- **GIVEN** the OS "reduce motion" setting is on
- **WHEN** the user opens a photo
- **THEN** the lightbox appears without the morph animation

### Requirement: Accessible lightbox

The lightbox SHALL behave as a modal dialog: focus moves into it on open and
returns to the originating photo on close, background content is inert while
open, and all controls have accessible names.

#### Scenario: Focus return

- **GIVEN** the user opened a photo with the keyboard
- **WHEN** they close the lightbox with Escape
- **THEN** keyboard focus is back on the photo they opened (or the photo last
  shown, if they navigated)
