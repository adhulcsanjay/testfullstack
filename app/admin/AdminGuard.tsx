"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function check() {
      try {
        const res = await fetchApi("api/auth/me");
        if (res.ok) setAllowed(true);
        else router.replace("/admin/login");
      } catch {
        router.replace("/admin/login");
      }
    }
    check();
  }, [router]);

  if (!allowed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/70 backdrop-blur px-4 py-3 text-slate-200">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
          Checking session…
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
