import type { Contact } from "@/lib/mockContacts";

const STORAGE_KEY = "visitedContacts";

export function addVisitedContact(contact: Contact) {
  let visited: Contact[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

  visited = visited.filter((c) => c.id !== contact.id);
  visited.unshift(contact);
  visited = visited.slice(0, 5);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
}

export function getVisitedContacts(): Contact[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}
