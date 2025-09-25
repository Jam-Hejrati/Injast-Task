"use client";

import type { Contact } from "@/lib/mockContacts";
import { addVisitedContact } from "@/utils/visited";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 10;

interface AllContactsSelectProps {
  onError: (message: string) => void;
}

export default function AllContactsSelect({ onError }: AllContactsSelectProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchedPagesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    fetchInitial();
  }, []);

  async function fetchInitial() {
    try {
      setIsFetching(true);
      const res = await fetch(`/api/contacts?page=1&pageSize=${PAGE_SIZE}`);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setContacts(data.data);
      setHasNextPage(data.hasNextPage);
      fetchedPagesRef.current.add(1);
      setPage(1);
    } catch (err: any) {
      onError(err?.message ?? "Failed to fetch contacts");
    } finally {
      setIsFetching(false);
    }
  }

  async function fetchPage(p: number) {
    if (isFetching) return;
    if (fetchedPagesRef.current.has(p)) return;
    if (!hasNextPage && p !== 1) return;

    setIsFetching(true);
    try {
      const res = await fetch(`/api/contacts?page=${p}&pageSize=${PAGE_SIZE}`);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();

      setContacts((prev) => {
        const ids = new Set(prev.map((c) => c.id));
        const newItems = (data.data as Contact[]).filter((c) => !ids.has(c.id));
        return [...prev, ...newItems];
      });

      setHasNextPage(data.hasNextPage);
      fetchedPagesRef.current.add(p);
      setPage(p);
    } catch (err: any) {
      onError(err?.message ?? "Failed to fetch contacts");
    } finally {
      setIsFetching(false);
    }
  }

  function handleMenuScroll(event: React.UIEvent<HTMLDivElement>) {
    const target = event.currentTarget;
    const threshold = 10;

    if (
      target.scrollTop + target.clientHeight >=
        target.scrollHeight - threshold &&
      !isFetching &&
      hasNextPage
    ) {
      fetchPage(page + 1);
    }
  }

  function handleVisitedClick(contact: Contact) {
    addVisitedContact(contact);
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="all-contacts-label">All contacts</InputLabel>
      <Select
        labelId="all-contacts-label"
        value=""
        label="All contacts"
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
              overflowY: "auto",
            },
            onScroll: handleMenuScroll,
          },
        }}
      >
        {contacts.length === 0 && !isFetching && (
          <MenuItem disabled>کاربری یافت نشد</MenuItem>
        )}

        {contacts.map((c) => (
          <MenuItem key={c.id} onClick={() => handleVisitedClick(c)}>
            <Link
              href={`/contact/${c.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              {c.name}
            </Link>
          </MenuItem>
        ))}

        {isFetching && (
          <MenuItem disabled>
            <CircularProgress size={18} style={{ marginRight: 8 }} />
            در حال بارگیری...
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
