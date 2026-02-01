import AdminGuard from "./AdminGuard";
import HeroEditor from "./HeroEditor";
import AboutEditor from "./AboutEditor";
import TestimonialsEditor from "./TestimonialsEditor";
import FaqEditor from "./FaqEditor";

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin dashboard</h1>
          <p className="text-slate-300 text-sm">
            Update content and it will reflect on the landing page without redeploy. Refresh the landing page to see changes.
          </p>
        </div>

        <section className="bg-slate-800/70 backdrop-blur rounded-2xl border border-slate-700 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Hero</h2>
            <span className="text-xs text-slate-400">Title • Subtitle • Image</span>
          </div>
          <HeroEditor />
        </section>

        <section className="bg-slate-800/70 backdrop-blur rounded-2xl border border-slate-700 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">About</h2>
            <span className="text-xs text-slate-400">Heading • Paragraph</span>
          </div>
          <AboutEditor />
        </section>

        <section className="bg-slate-800/70 backdrop-blur rounded-2xl border border-slate-700 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Testimonials</h2>
            <span className="text-xs text-slate-400">Name • Role • Text</span>
          </div>
          <TestimonialsEditor />
        </section>

        <section className="bg-slate-800/70 backdrop-blur rounded-2xl border border-slate-700 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">FAQ</h2>
            <span className="text-xs text-slate-400">Questions • Answers</span>
          </div>
          <FaqEditor />
        </section>
      </div>
    </AdminGuard>
  );
}
