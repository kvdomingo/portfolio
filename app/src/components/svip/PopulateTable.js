function PopulateTable({ patchId, lab, lch }) {
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
