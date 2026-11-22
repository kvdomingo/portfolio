// Inlined into the page via Function#toString, so it must stay self-contained.
export function assignColumns(ratios: number[], count: number): number[][] {
  const cols: number[][] = Array.from({ length: count }, () => []);
  const heights: number[] = Array.from({ length: count }, () => 0);
  ratios.forEach((ratio, i) => {
    let min = 0;
    for (let c = 1; c < count; c++) if (heights[c] < heights[min]) min = c;
    cols[min].push(i);
    heights[min] += ratio;
  });
  return cols;
}
