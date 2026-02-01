import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "fallback-secret-change-me";

export async function createToken(email: string): Promise<string> {
  return jwt.sign({ email }, SECRET, { expiresIn: "7d" });
}

export async function verifyToken(token: string): Promise<{ email: string } | null> {
  try {
    const payload = jwt.verify(token, SECRET) as { email?: string };
    return payload?.email ? { email: payload.email } : null;
  } catch {
    return null;
  }
}

const COOKIE_NAME = "admin_token";

export function getAdminTokenFromRequest(request: Request): string | undefined {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match ? match[1].trim() : undefined;
}

export async function getAdminToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function requireAdmin(): Promise<{ email: string } | null> {
  const token = await getAdminToken();
  if (!token) return null;
  return verifyToken(token);
}

export async function requireAdminFromRequest(request: Request): Promise<{ email: string } | null> {
  const token = getAdminTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}
