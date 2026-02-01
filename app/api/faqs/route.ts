import { NextResponse } from "next/server";
import { getDb, type FaqDoc } from "@/lib/mongodb";
import { requireAdminFromRequest } from "@/lib/auth";

const DEFAULT_LIST: FaqDoc[] = [
  {
    question: "What features does the AI Health Assistant offer?",
    answer:
      "Our AI Health Assistant provides personalized wellness plans, health tracking, AI coaching, nutrition guidance, and lifestyle recommendations tailored to your goals.",
  },
  {
    question: "Is the app customizable to my needs?",
    answer:
      "Yes. You can customize goals, routines, reminders, diet preferences, and health priorities to match your lifestyle.",
  },
  {
    question: "How does the free trial work?",
    answer: "You get full access during the trial period. You can cancel anytime before billing starts.",
  },
];

export async function GET() {
  try {
    const db = await getDb();
    const list = await db.collection<FaqDoc>("faqs").find({}).sort({ _id: 1 }).toArray();
    const items = list.length
      ? list.map((d) => ({ _id: String(d._id), question: d.question, answer: d.answer }))
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
    const doc: Omit<FaqDoc, "_id"> = {
      question: body.question ?? "",
      answer: body.answer ?? "",
    };
    const db = await getDb();
    const result = await db.collection("faqs").insertOne(doc as FaqDoc);
    return NextResponse.json({
      _id: String(result.insertedId),
      question: doc.question,
      answer: doc.answer,
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
