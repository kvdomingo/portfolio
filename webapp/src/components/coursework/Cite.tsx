import HTMLReactParser from "html-react-parser";
import { Box, Tooltip } from "@mui/material";

interface CiteProps {
  target: string;
  number: number;
  reference: string;
}

function Cite({ target, number, reference }: CiteProps) {
  return (
    <div style={{ display: "inline" }}>
      <Tooltip title={HTMLReactParser(reference)}>
        <span>
          [
          <Box
            component="a"
            href={target}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "primary.main", textDecoration: "none" }}
          >
            {number}
          </Box>
          ]
        </span>
      </Tooltip>
    </div>
  );
}

export default Cite;
