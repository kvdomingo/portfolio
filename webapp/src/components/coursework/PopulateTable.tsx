interface PopulateTableProps {
  patchId: number;
  lab: string;
  lch: string;
}

function PopulateTable({ patchId, lab, lch }: PopulateTableProps) {
  const tabEl = [patchId, lab, lch];

  return (
    <tr>
      {tabEl.map((el, i) => (
        <td key={i}>{el}</td>
      ))}
    </tr>
  );
}

export default PopulateTable;
