"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/admin/login") return null;

  async function handleLogout() {
    await fetchApi("api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/70 backdrop-blur px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/admin" className="text-white font-semibold tracking-wide">
            Admin Panel
          </Link>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-white text-sm"
        >
          View site →
        </Link>
      </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800 transition"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
