import ContactTabs from "@/components/ContactTab";
import { Box } from "@mui/material";

export default function HomePage() {
  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      gap={3}
      maxWidth={720}
      mx="auto"
    >
      <ContactTabs />
    </Box>
  );
}
