import { Code } from "@mui/icons-material";

import TimelineSection from "../TimelineSection";

function CodingStats() {
  return (
    <TimelineSection
      name="Coding Stats"
      icon={<Code fontSize="inherit" className="mr-[1em]" />}
    >
      <div className="text-center">
        <figure className="my-6">
          <embed src="https://wakatime.com/share/@kvdomingo/c19861c3-3b97-49c3-8152-56dbc3b074b2.svg"></embed>
        </figure>
        <figure className="my-6 md:w-3/4">
          <embed src="https://wakatime.com/share/@kvdomingo/1e4dbd96-9c14-40e8-b252-0191c6306845.svg"></embed>
        </figure>
      </div>
    </TimelineSection>
  );
}

export default CodingStats;
