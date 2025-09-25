// app/api/contacts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MOCK_CONTACTS } from "@/lib/mockContacts";

export const dynamic = "force-dynamic";

function parsePositiveInt(value: string | null, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const page = parsePositiveInt(searchParams.get("page"), 1);
  const pageSize = parsePositiveInt(searchParams.get("pageSize"), 20);

  const total = MOCK_CONTACTS.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const clampedPage = Math.min(Math.max(1, page), totalPages);

  const start = (clampedPage - 1) * pageSize;
  const end = Math.min(start + pageSize, total);

  const data = MOCK_CONTACTS.slice(start, end);

  return NextResponse.json({
    page: clampedPage,
    pageSize,
    total,
    totalPages,
    hasNextPage: clampedPage < totalPages,
    hasPrevPage: clampedPage > 1,
    data,
  });
}
