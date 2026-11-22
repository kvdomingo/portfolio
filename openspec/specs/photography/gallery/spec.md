# photography/gallery Specification

## Purpose

Defines how photography album galleries (public albums and client albums) are
laid out, ordered, and loaded so photos appear quickly without layout shift.

## Requirements

### Requirement: Newest-first, left-to-right order

Gallery photos SHALL be ordered newest first by upload time, and the visual
reading order SHALL be left-to-right, then top-to-bottom, at every column count.

#### Scenario: Multi-column reading order

- **GIVEN** an album with photos P1 (newest) through P8 and a 4-column layout
- **WHEN** the gallery renders
- **THEN** P1–P4 appear across the top row from left to right, and P5–P8 start
  the following row

#### Scenario: Single column

- **WHEN** the viewport is narrow enough for one column
- **THEN** photos appear top to bottom in newest-first order

### Requirement: Responsive column count

The gallery SHALL use 1 column below 768px, 2 below 1024px, 3 below 1280px, and
4 otherwise, re-laying out when the viewport crosses a breakpoint without
re-downloading images already loaded.

#### Scenario: Resize across a breakpoint

- **GIVEN** a gallery rendered at 1300px wide (4 columns)
- **WHEN** the window is resized to 900px
- **THEN** the gallery shows 2 columns, keeps reading order, and issues no new
  requests for already-loaded images

### Requirement: Gallery markup is server-rendered

The gallery's photo elements SHALL be present in the initial HTML response so
the browser can start fetching images before any script runs.

#### Scenario: JavaScript disabled

- **WHEN** a gallery page is loaded with JavaScript disabled
- **THEN** all photos are present and visible in newest-first order

### Requirement: No layout shift while images load

Each photo SHALL occupy its final aspect-ratio box before its image data
arrives, showing a low-resolution blurred preview of that photo in the meantime.

#### Scenario: Slow network

- **WHEN** a gallery loads on a throttled connection
- **THEN** every photo slot has its final size immediately, shows a blurred
  preview, and nothing below it moves when the full image arrives

### Requirement: Appropriately sized, optimized images

Gallery images SHALL be served at a width appropriate to the rendered column
width and device pixel ratio, in a modern format and automatic quality chosen by
the image CDN, never as the original upload.

#### Scenario: Mobile viewport

- **GIVEN** a 390px-wide viewport at 3x DPR
- **WHEN** the gallery loads
- **THEN** each image request is for a width no larger than roughly 1200px, not
  the original resolution

### Requirement: Above-the-fold priority and lookahead loading

The first photos in reading order (enough to fill the first screen at any column
count) SHALL load eagerly with high priority; the remaining photos SHALL load
lazily, starting before they scroll into view.

#### Scenario: Initial load

- **WHEN** a gallery page loads
- **THEN** the first photos in reading order are requested immediately, and
  photos far below the fold are not requested until the user scrolls toward them

#### Scenario: Scrolling

- **WHEN** the user scrolls down at a normal pace
- **THEN** photos entering the viewport are already loaded or loading
