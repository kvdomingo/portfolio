import { TableCell, TableRow } from "@mui/material";

interface PopulateTableProps {
  patchId: number;
  lab: string;
  lch: string;
}

function PopulateTable({ patchId, lab, lch }: PopulateTableProps) {
  const tabEl = [patchId, lab, lch];

  return (
    <TableRow>
      {tabEl.map((el, i) => (
        <TableCell align="center" key={i}>
          {el}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default PopulateTable;
