"use client";

import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";

type Testimonial = { _id: string; name: string; role: string; message: string };

export default function TestimonialsEditor() {
  const [list, setList] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", role: "", message: "" });

  async function load() {
    try {
      const r = await fetchApi("api/testimonials");
      const data = await r.json();
      setList(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setMessage("");
    setSaving(true);
    try {
      const res = await fetchApi("api/testimonials", {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setForm({ name: "", role: "", message: "" });
      setMessage("Added.");
      load();
    } catch {
      setMessage("Error adding.");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(id: string) {
    if (id.startsWith("default-")) {
      setMessage("Default items cannot be edited. Add a new testimonial instead.");
      return;
    }
    setMessage("");
    setSaving(true);
    try {
      const item = list.find((t) => t._id === id)!;
      const res = await fetchApi(`api/testimonials/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name: item.name, role: item.role, message: item.message }),
      });
      if (!res.ok) throw new Error("Failed");
      setEditing(null);
      setMessage("Saved.");
      load();
    } catch {
      setMessage("Error saving.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (id.startsWith("default-")) return;
    if (!confirm("Delete this testimonial?")) return;
    setMessage("");
    setSaving(true);
    try {
      const res = await fetchApi(`api/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setMessage("Deleted.");
      load();
    } catch {
      setMessage("Error deleting.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-slate-300">Loading…</p>;

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="p-4 bg-slate-900/40 rounded-xl border border-slate-700 space-y-3">
        <h3 className="font-medium text-white">Add testimonial</h3>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-700/70 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-700/70 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <textarea
          placeholder="Testimonial text"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          rows={2}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-700/70 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
        >
          Add
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="font-medium text-white">Existing testimonials</h3>
        <p className="text-xs text-slate-400">Click Edit to update, or Delete to remove. Default (read-only) items must be replaced by adding new ones.</p>
        {list.map((t) => (
          <div key={t._id} className="p-4 border border-slate-700 rounded-xl bg-slate-900/30">
            {editing === t._id ? (
              <div className="space-y-3">
                <input
                  value={t.name}
                  onChange={(e) => setList((l) => l.map((x) => (x._id === t._id ? { ...x, name: e.target.value } : x)))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white placeholder-slate-500"
                  placeholder="Name"
                />
                <input
                  value={t.role}
                  onChange={(e) => setList((l) => l.map((x) => (x._id === t._id ? { ...x, role: e.target.value } : x)))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white placeholder-slate-500"
                  placeholder="Role"
                />
                <textarea
                  value={t.message}
                  onChange={(e) => setList((l) => l.map((x) => (x._id === t._id ? { ...x, message: e.target.value } : x)))}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white placeholder-slate-500"
                  placeholder="Message"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdate(t._id)}
                    disabled={saving}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {saving ? "Saving…" : "Update"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="px-3 py-1.5 rounded-lg border border-slate-600 text-slate-300 text-sm hover:bg-slate-700/50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white">{t.name}{t.role ? `, ${t.role}` : ""}</p>
                  <p className="text-sm text-slate-300 line-clamp-2 mt-0.5">{t.message}</p>
                </div>
                {!t._id.startsWith("default-") ? (
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditing(t._id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-600 bg-slate-700/50 text-slate-200 text-sm font-medium hover:bg-slate-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(t._id)}
                      className="px-3 py-1.5 rounded-lg border border-red-900/50 bg-red-900/30 text-red-300 text-sm font-medium hover:bg-red-900/50"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 shrink-0">Read-only</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {message && (
        <p className={`text-sm ${message.startsWith("Error") ? "text-red-400" : "text-emerald-400"}`}>{message}</p>
      )}
    </div>
  );
}
