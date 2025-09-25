"use client";

import type { Contact } from "@/lib/mockContacts";
import { addVisitedContact, getVisitedContacts } from "@/utils/visited";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function MostVisitedSelect() {
  const [visited, setVisited] = useState<Contact[]>([]);

  useEffect(() => {
    setVisited(getVisitedContacts());

    const handleStorageChange = () => {
      setVisited(getVisitedContacts());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function handleVisitedClick(contact: Contact) {
    addVisitedContact(contact);
    setVisited(getVisitedContacts());
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="visited-label">Most visited</InputLabel>
      <Select labelId="visited-label" value="" label="Most visited">
        {visited.length === 0 ? (
          <MenuItem disabled>کاربری یافت نشد</MenuItem>
        ) : (
          visited.map((c) => (
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
          ))
        )}
      </Select>
    </FormControl>
  );
}
