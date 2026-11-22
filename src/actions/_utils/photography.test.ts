import { expect, test } from "bun:test";

import { PHOTO_ROOT, tagsForPublicIds } from "./photography";

test("album folder, case-insensitive", () => {
  expect(tagsForPublicIds([`${PHOTO_ROOT}/Live/KVD-0835`])).toEqual([
    "photos-live",
  ]);
  expect(tagsForPublicIds([`${PHOTO_ROOT}/live/KVD-0835`])).toEqual([
    "photos-live",
  ]);
});

test("client folder", () => {
  expect(tagsForPublicIds([`${PHOTO_ROOT}/clients/upcc/x`])).toEqual([
    "photos-client-upcc",
  ]);
});

test("rename across albums yields both tags", () => {
  expect(
    tagsForPublicIds([`${PHOTO_ROOT}/Live/a`, `${PHOTO_ROOT}/Portraits/a`]),
  ).toEqual(["photos-live", "photos-portraits"]);
});

test("unrelated folders yield no tags", () => {
  expect(
    tagsForPublicIds(["svip/186/x", `${PHOTO_ROOT}/clients-landing/x`]),
  ).toEqual([]);
});
