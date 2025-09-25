import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const ProfileLoading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
      flexDirection="column"
      gap={2}
    >
      <CircularProgress size={40} />
      <Typography variant="body2" color="text.secondary">
        در حال بارگیری اطلاعات مخاطب...
      </Typography>
    </Box>
  );
};

export default ProfileLoading;
