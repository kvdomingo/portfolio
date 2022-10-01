import { ReactElement } from "react";
import { Box, Container, Typography } from "@mui/material";

interface TimelineSectionProps {
  name: string;
  icon: ReactElement;
  children: ReactElement;
}

function TimelineSection({ name, icon, children }: TimelineSectionProps) {
  return (
    <Box component="div" data-aos="fade-up" sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ display: "flex", alignItems: "center" }}>
        {icon}
        {name}
      </Typography>
      <Container maxWidth="xl">{children}</Container>
    </Box>
  );
}

export default TimelineSection;
