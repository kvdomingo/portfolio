import HTMLReactParser from "html-react-parser";
import { Box, Tooltip } from "@mui/material";

interface CiteProps {
  data: {
    target: string;
    number: number;
    reference: string;
  }[];
}

function Cite({ data }: CiteProps) {
  return (
    <div style={{ display: "inline" }}>
      [
      {data.map((d, i) => (
        <Tooltip title={HTMLReactParser(d.reference)} key={i}>
          <Box
            component="a"
            href={d.target}
            sx={{ color: "primary.main", textDecoration: "none" }}
          >
            {d.number}
            {i < data.length - 1 && ", "}
          </Box>
        </Tooltip>
      ))}
      ]
    </div>
  );
}

export default Cite;
