import AdminNav from "./AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-72 w-[520px] rounded-full bg-blue-600/25 blur-[120px]" />
        <div className="absolute top-32 left-10 h-64 w-64 rounded-full bg-cyan-400/20 blur-[110px]" />
        <div className="absolute top-40 right-10 h-64 w-64 rounded-full bg-amber-300/20 blur-[110px]" />
      </div>
      <AdminNav />
      <main className="relative">{children}</main>
    </div>
  );
}
