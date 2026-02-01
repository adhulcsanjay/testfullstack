"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchApi } from "@/lib/api";

type AdminUser = { ok: true; email: string; name: string } | null;

export default function Header() {
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

  async function handleLogout() {
    await fetchApi("api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F9F9F9]">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 py-4 md:py-6 border-b-2 border-[#EDEDED]">
     
        <div className="flex items-center gap-2">
          <Image
            src="/images/Logo.png"
            alt="Reppoo Logo"
            width={1000}
            height={1000}
            className="w-[100px] sm:w-[120px] md:w-[130px] h-auto"
          />
        </div>

       
        {loading ? (
          <div className="h-10 w-24 rounded-full bg-gray-200 animate-pulse" />
        ) : user ? (
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="relative h-9 w-9 sm:h-11 sm:w-11 shrink-0 rounded-full overflow-hidden border-2 border-white bg-gray-100">
                <Image
                  src="/images/Ellipse 4.png"
                  alt={user.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-sm sm:text-[1rem] font-bold text-gray-800 truncate max-w-[120px] sm:max-w-[180px]">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-[180px]">
                  {user.email}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="shrink-0 px-4 py-2 rounded-full border-2 border-blue-500 bg-white text-blue-500 text-sm font-semibold hover:bg-blue-50 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/admin/login"
            className="px-4 sm:px-6 py-2 sm:py-3 text-[0.9rem] sm:text-[1.1rem] md:text-[1.2rem] font-bold rounded-full bg-white text-gray-800 hover:bg-gray-200 transition border border-gray-200"
          >
            Admin login
          </Link>
        )}
      </div>
    </header>
  );
}
