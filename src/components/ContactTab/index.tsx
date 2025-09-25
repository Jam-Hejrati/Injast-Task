"use client";

import { Alert, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import AllContactsSelect from "../ContactList";
import MostVisitedSelect from "../MostVisitedList";

interface TabPanelProps {
  index: number;
  value: number;
  children?: React.ReactNode;
}

const tabStyles: SxProps = {
  borderRadius: "8px",
  margin: 1,
  fontSize: "16px",
  "&.Mui-selected": {
    color: "#fff",
    backgroundColor: "#1565c0",
  },
};

function CustomTab(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tab"
      hidden={value !== index}
      id={`tab-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tab-${index}`,
  };
}

export default function ContactTabs() {
  const [value, setValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleError = (message: string) => {
    setErrorMessage(message);
    setSnackbarOpen(true);
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="content tabs panel"
          slots={{ indicator: () => null }}
        >
          <Tab sx={tabStyles} {...a11yProps(0)} label="صفحه اصلی" />
          <Tab sx={tabStyles} {...a11yProps(1)} label="پر بازدیدها" />
        </Tabs>
      </Box>
      <CustomTab value={value} index={0}>
        <AllContactsSelect onError={handleError} />
      </CustomTab>
      <CustomTab value={value} index={1}>
        <MostVisitedSelect />
      </CustomTab>

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
}
