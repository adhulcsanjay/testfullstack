"use client";

import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";

type FaqItem = { _id: string; question: string; answer: string };

export default function FaqEditor() {
  const [list, setList] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ question: "", answer: "" });

  async function load() {
    try {
      const r = await fetchApi("api/faqs");
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
    if (!form.question.trim() || !form.answer.trim()) return;
    setMessage("");
    setSaving(true);
    try {
      const res = await fetchApi("api/faqs", {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setForm({ question: "", answer: "" });
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
      setMessage("Default items cannot be edited. Add a new FAQ instead.");
      return;
    }
    setMessage("");
    setSaving(true);
    try {
      const item = list.find((f) => f._id === id)!;
      const res = await fetchApi(`api/faqs/${id}`, {
        method: "PUT",
        body: JSON.stringify({ question: item.question, answer: item.answer }),
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
    if (!confirm("Delete this FAQ?")) return;
    setMessage("");
    setSaving(true);
    try {
      const res = await fetchApi(`api/faqs/${id}`, { method: "DELETE" });
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
        <h3 className="font-medium text-white">Add FAQ</h3>
        <input
          type="text"
          placeholder="Question"
          value={form.question}
          onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-700/70 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <textarea
          placeholder="Answer"
          value={form.answer}
          onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
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
        <h3 className="font-medium text-white">Existing FAQs</h3>
        <p className="text-xs text-slate-400">Click Edit to update, or Delete to remove. Default (read-only) items must be replaced by adding new ones.</p>
        {list.map((faq) => (
          <div key={faq._id} className="p-4 border border-slate-700 rounded-xl bg-slate-900/30">
            {editing === faq._id ? (
              <div className="space-y-3">
                <input
                  value={faq.question}
                  onChange={(e) => setList((l) => l.map((x) => (x._id === faq._id ? { ...x, question: e.target.value } : x)))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white placeholder-slate-500"
                  placeholder="Question"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => setList((l) => l.map((x) => (x._id === faq._id ? { ...x, answer: e.target.value } : x)))}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white placeholder-slate-500"
                  placeholder="Answer"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdate(faq._id)}
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
                  <p className="font-medium text-white">{faq.question}</p>
                  <p className="text-sm text-slate-300 line-clamp-2 mt-0.5">{faq.answer}</p>
                </div>
                {!faq._id.startsWith("default-") ? (
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditing(faq._id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-600 bg-slate-700/50 text-slate-200 text-sm font-medium hover:bg-slate-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(faq._id)}
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
