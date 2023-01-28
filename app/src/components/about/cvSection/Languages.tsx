import { Code } from "@mui/icons-material";
import { Box } from "@mui/material";
import TimelineSection from "../TimelineSection";

function Languages() {
  return (
    <TimelineSection name="Top Languages" icon={<Code fontSize="inherit" sx={{ mr: "1em" }} />}>
      <Box component="div" sx={{ textAlign: "center" }}>
        <figure>
          <embed src="https://wakatime.com/share/@kvdomingo/ff872954-6966-4bac-a00b-6894446d4b99.svg" />
        </figure>
      </Box>
    </TimelineSection>
  );
}

export default Languages;
