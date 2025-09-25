"use client";

import NotFoundContact from "@/components/NotFoundContact";
import ProfileLoading from "@/components/ProfileLoading";
import type { Contact } from "@/lib/mockContacts";
import { addVisitedContact } from "@/utils/visited";
import { ArrowBack, Email, Person, Phone } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Snackbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ContactDetailPage() {
  const params = useParams();
  const contactId = params?.id as string;

  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (contactId) {
      fetchContact(contactId);
    }
  }, [contactId]);

  async function fetchContact(id: string) {
    try {
      setLoading(true);
      const numericId = parseInt(id, 10);
      if (isNaN(numericId) || numericId <= 0) {
        throw new Error("Invalid contact ID");
      }
      const page = Math.ceil(numericId / 10);
      const res = await fetch(`/api/contacts?page=${page}&pageSize=10`);
      if (!res.ok) {
        throw new Error(`Failed to fetch contacts: ${res.status}`);
      }
      const contacts: { data: Contact[] } = await res.json();
      const contactData = contacts.data.find((c) => c.id === numericId);
      if (!contactData) {
        throw new Error("Contact not found");
      }
      setContact(contactData);

      addVisitedContact(contactData);
    } catch (err: any) {
      setErrorMessage(err?.message ?? "Failed to load contact");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <ProfileLoading />;

  if (!contact) {
    return (
      <NotFoundContact
        errorMessage={errorMessage ?? ""}
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
    );
  }

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
        بازگشت
      </Button>

      <Card elevation={3}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={3} mb={3}>
            <Avatar
              sx={{ width: 80, height: 80, fontSize: "2rem" }}
              src="/profile.svg"
            >
              {contact?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {contact.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact ID: {contact.id}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Phone color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body1">
                  {contact.phone || "Not provided"}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              <Email color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {contact.email || "Not provided"}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              <Person color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Company
                </Typography>
                <Typography variant="body1">
                  {contact.company || "Not provided"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Metadata
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="body2">
              <strong>Contact ID:</strong> {contact.id}
            </Typography>
            <Typography variant="body2">
              <strong>Created:</strong>{" "}
              {new Date(contact.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              <strong>Viewed:</strong> {new Date().toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Box display="flex" gap={2} flexWrap="wrap">
        {contact.phone && (
          <Button
            variant="contained"
            startIcon={<Phone />}
            href={`tel:${contact.phone}`}
            sx={{ flex: 1, minWidth: 120 }}
          >
            Call
          </Button>
        )}
        {contact.email && (
          <Button
            variant="contained"
            startIcon={<Email />}
            href={`mailto:${contact.email}`}
            sx={{ flex: 1, minWidth: 120 }}
          >
            Email
          </Button>
        )}
      </Box>

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
