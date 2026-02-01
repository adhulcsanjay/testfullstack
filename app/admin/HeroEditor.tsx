"use client";

import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";

type HeroData = { title: string; subtitle: string; image: string };

export default function HeroEditor() {
  const [data, setData] = useState<HeroData>({ title: "", subtitle: "", image: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const r = await fetchApi("api/content/hero");
        const d = await r.json();
        setData(d);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setSaving(true);
    try {
      const res = await fetchApi("api/content/hero", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");
      setMessage("Saved. Refresh the landing page to see changes.");
    } catch {
      setMessage("Error saving.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-slate-300">Loading…</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-700/70 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Subtitle</label>
        <textarea
          value={data.subtitle}
          onChange={(e) => setData((d) => ({ ...d, subtitle: e.target.value }))}
          rows={2}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-700/70 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Hero image URL</label>
        <input
          type="text"
          value={data.image}
          onChange={(e) => setData((d) => ({ ...d, image: e.target.value }))}
          placeholder="/images/Group 1171275467.png"
          className="w-full px-4 py-2.5 rounded-lg bg-slate-700/70 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-slate-400 mt-1">Tip: use `/images/your-image.png` for files in `public/images`.</p>
      </div>
      {message && (
        <p className={`text-sm ${message.startsWith("Error") ? "text-red-400" : "text-emerald-400"}`}>{message}</p>
      )}
      <button
        type="submit"
        disabled={saving}
        className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
      >
        {saving ? "Saving…" : "Save hero"}
      </button>
    </form>
  );
}
