import { NextResponse } from "next/server";
import { getDb, type TestimonialDoc } from "@/lib/mongodb";
import { requireAdminFromRequest } from "@/lib/auth";
import { ObjectId } from "mongodb";

const DEFAULT_LIST: TestimonialDoc[] = [
  {
    name: "Ava L.",
    role: "Marketing Executive",
    message:
      "I've tried countless health apps, but none come close to this. The AI truly understands my needs—it suggested daily routines and nutrition tips that actually fit my lifestyle.",
  },
  { name: "Namo Serlina", role: "CEO Delego", message: "This platform transformed my routine." },
  { name: "John Carter", role: "Fitness Trainer", message: "Best wellness AI ever." },
];

export async function GET() {
  try {
    const db = await getDb();
    const list = await db.collection<TestimonialDoc>("testimonials").find({}).sort({ _id: 1 }).toArray();
    const items = list.length
      ? list.map((d) => ({ _id: String(d._id), name: d.name, role: d.role, message: d.message }))
      : DEFAULT_LIST.map((d, i) => ({ _id: `default-${i}`, ...d }));
    return NextResponse.json(items);
  } catch (e) {
    return NextResponse.json(DEFAULT_LIST.map((d, i) => ({ _id: `default-${i}`, ...d })));
  }
}

export async function POST(request: Request) {
  const admin = await requireAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const doc = {
      name: body.name ?? "",
      role: body.role ?? "",
      message: body.message ?? "",
    };
    const db = await getDb();
    const result = await db.collection("testimonials").insertOne(doc);
    return NextResponse.json({
      _id: String(result.insertedId),
      name: doc.name,
      role: doc.role,
      message: doc.message,
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
