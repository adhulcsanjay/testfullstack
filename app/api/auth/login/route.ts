import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth"; 


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
    }
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const token = await createToken(email);
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: true,        // ALWAYS true on Vercel
  sameSite: "none", 
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
