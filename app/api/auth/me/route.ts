import { NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  const admin = await requireAdminFromRequest(request);
  if (!admin) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, email: admin.email });
}
