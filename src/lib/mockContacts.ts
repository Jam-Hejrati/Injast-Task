// lib/mockContacts.ts
export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  createdAt: string; // ISO date
};

const firstNames = [
  "Liam",
  "Emma",
  "Noah",
  "Olivia",
  "Ava",
  "Isabella",
  "Sophia",
  "Mia",
  "Charlotte",
  "Amelia",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
];
const companies = [
  "Injast",
  "Acme Co",
  "Globex",
  "Umbrella",
  "Soylent",
  "Hooli",
  "Vehement",
  "Stark Industries",
  "Wayne Enterprises",
  "Wonka",
];

function makeEmail(name: string, i: number) {
  return `${name.toLowerCase().replace(/\s+/g, ".")}.${i}@example.com`;
}
function makePhone(i: number) {
  const n = (1000000 + (i % 9000000)).toString().padStart(7, "0");
  return `+1-415-${n.slice(0, 3)}-${n.slice(3)}`;
}

export const MOCK_CONTACTS: Contact[] = Array.from({ length: 200 }, (_, i) => {
  const f = firstNames[i % firstNames.length];
  const l = lastNames[(i * 7) % lastNames.length];
  const name = `${f} ${l}`;
  const company = companies[(i * 3) % companies.length];
  const daysAgo = 300 - (i % 300);
  const createdAt = new Date(
    Date.now() - daysAgo * 24 * 60 * 60 * 1000
  ).toISOString();
  return {
    id: i + 1,
    name,
    email: makeEmail(name, i + 1),
    phone: makePhone(i + 1),
    company,
    createdAt,
  };
});
