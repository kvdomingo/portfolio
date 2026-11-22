import { expect, test } from "bun:test";

import { assignColumns } from "./columns";

test("equal ratios fill left to right", () => {
  expect(assignColumns([1, 1, 1, 1, 1, 1, 1, 1], 4)).toEqual([
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ]);
});

test("mixed ratios go to the shortest column", () => {
  // col0 gets a tall photo (1.5), col1 a wide one (0.5); next goes to col1.
  expect(assignColumns([1.5, 0.5, 1, 1], 2)).toEqual([
    [0, 3],
    [1, 2],
  ]);
});

test("single column keeps order", () => {
  expect(assignColumns([2, 0.5, 1], 1)).toEqual([[0, 1, 2]]);
});
