import { NextResponse } from "next/server";
import { getDb, DEFAULT_HERO, type HeroContent } from "@/lib/mongodb";
import { requireAdminFromRequest } from "@/lib/auth";

const SECTION = "hero";

export async function GET() {
  try {
    const db = await getDb();
    const doc = await db.collection("content").findOne<{ data: HeroContent }>({ section: SECTION });
    const data = doc?.data ?? DEFAULT_HERO;
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(DEFAULT_HERO);
  }
}

export async function PUT(request: Request) {
  const admin = await requireAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const data: HeroContent = {
      title: body.title ?? "",
      subtitle: body.subtitle ?? "",
      image: body.image ?? "/images/Group 1171275467.png",
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
