import { ArrowBack } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

type NotFoundContactProps = {
  snackbarOpen: boolean;
  errorMessage?: string;
  setSnackbarOpen: (open: boolean) => void;
};

const NotFoundContact = (props: NotFoundContactProps) => {
  const { snackbarOpen, errorMessage, setSnackbarOpen } = props;

  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      gap={3}
      maxWidth={600}
      mx="auto"
    >
      <Button
        component={Link}
        href="/"
        startIcon={<ArrowBack />}
        variant="outlined"
        sx={{ alignSelf: "flex-start" }}
      >
        Back to Home
      </Button>

      <Card>
        <CardContent>
          <Typography variant="h6" color="error" gutterBottom>
            مخاطب یافت نشد
          </Typography>
          <Typography variant="body2" color="text.secondary">
            مخاطبی با این شناسه وجود ندارد یا ممکن است حذف شده باشد.
          </Typography>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NotFoundContact;
