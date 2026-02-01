import { NextResponse } from "next/server";
import { getDb, DEFAULT_ABOUT, type AboutContent } from "@/lib/mongodb";
import { requireAdminFromRequest } from "@/lib/auth";

const SECTION = "about";

export async function GET() {
  try {
    const db = await getDb();
    const doc = await db.collection("content").findOne<{ data: AboutContent }>({ section: SECTION });
    const data = doc?.data ?? DEFAULT_ABOUT;
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(DEFAULT_ABOUT);
  }
}

export async function PUT(request: Request) {
  const admin = await requireAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const data: AboutContent = {
      heading: body.heading ?? "",
      paragraph: body.paragraph ?? "",
    };
    const db = await getDb();
    await db.collection("content").updateOne(
      { section: SECTION },
      { $set: { section: SECTION, data, updatedAt: new Date() } },
      { upsert: true }
    );
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
