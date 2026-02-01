"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";

type AdminUser = { ok: true; email: string; name: string } | null;

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      try {
        const res = await fetchApi("api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    check();
  }, []);

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

        {loading ? (
          <div className="h-10 w-28 rounded-lg bg-slate-800 animate-pulse" />
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full overflow-hidden border-2 border-amber-200/50 bg-slate-700">
                <Image
                  src="/images/Ellipse 4.png"
                  alt={user?.name ?? "Admin"}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-sm font-semibold text-white truncate max-w-[100px] sm:max-w-[140px]">
                  {user?.name ?? "Admin"}
                </p>
                <p className="text-xs text-slate-400 truncate max-w-[100px] sm:max-w-[140px]">
                  {user?.email ?? ""}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border-2 border-slate-600 bg-slate-800/60 text-slate-200 text-sm font-semibold hover:bg-slate-800 hover:border-slate-500 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
