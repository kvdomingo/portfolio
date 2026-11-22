# photography/content-freshness Specification

## Purpose

Defines how photography gallery pages are cached and how changes to photos in
Cloudinary become visible on the site without a rebuild.

## Requirements

### Requirement: Gallery pages served from cache

Gallery pages and per-photo pages SHALL be served from the CDN cache when a
cached copy exists, without contacting Cloudinary for that request.

#### Scenario: Repeat visit

- **GIVEN** an album page was rendered once since the last change to that album
- **WHEN** another visitor requests the same page
- **THEN** it is served from cache and no Cloudinary API call is made

### Requirement: Changes visible without a rebuild

When a photo is uploaded to, deleted from, or renamed within an album's
Cloudinary folder, the next request for that album's gallery or any of its
per-photo pages SHALL reflect the change, without a site rebuild or redeploy.

#### Scenario: New upload

- **GIVEN** the `live` album page is cached
- **WHEN** a photo is uploaded to the `live` folder and Cloudinary's
  notification is delivered
- **THEN** the next request to `/photography/live` includes the new photo

#### Scenario: Deletion

- **WHEN** a photo is deleted from the `portraits` folder and the notification
  is delivered
- **THEN** the next request to `/photography/portraits` no longer shows it, and
  its per-photo path returns 404

#### Scenario: Other albums unaffected

- **WHEN** a photo is uploaded to the `live` folder
- **THEN** cached pages for other albums remain cached

### Requirement: Authenticated change notifications

The endpoint receiving Cloudinary change notifications SHALL accept only
requests carrying a valid, recent Cloudinary signature, and SHALL reject all
others without purging anything.

#### Scenario: Forged request

- **WHEN** a request without a valid Cloudinary signature is sent to the
  notification endpoint
- **THEN** it is rejected with a 401 and no cache is purged

#### Scenario: Replayed request

- **WHEN** a correctly signed notification older than the allowed window is
  re-sent
- **THEN** it is rejected and no cache is purged

### Requirement: Notifications for unrelated folders are ignored

Notifications for Cloudinary assets outside the photography portfolio folders
SHALL be acknowledged without purging any cache.

#### Scenario: Unrelated asset

- **WHEN** a signed notification arrives for an asset outside the portfolio
  folders
- **THEN** the endpoint responds successfully and purges nothing
