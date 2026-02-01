const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../db");
const { requireAdmin } = require("../auth");

const router = express.Router();

const DEFAULT_LIST = [
  { name: "Ava L.", role: "Marketing Executive", message: "I've tried countless health apps, but none come close to this." },
  { name: "Namo Serlina", role: "CEO Delego", message: "This platform transformed my routine." },
  { name: "John Carter", role: "Fitness Trainer", message: "Best wellness AI ever." },
];

router.get("/", async (req, res) => {
  try {
    const db = await getDb();
    const list = await db.collection("testimonials").find({}).sort({ _id: 1 }).toArray();
    const items =
      list.length > 0
        ? list.map((d) => ({ _id: String(d._id), name: d.name, role: d.role, message: d.message }))
        : DEFAULT_LIST.map((d, i) => ({ _id: `default-${i}`, ...d }));
    return res.json(items);
  } catch (e) {
    return res.json(DEFAULT_LIST.map((d, i) => ({ _id: `default-${i}`, ...d })));
  }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const { name = "", role = "", message = "" } = req.body || {};
    const db = await getDb();
    const result = await db.collection("testimonials").insertOne({ name, role, message });
    return res.json({
      _id: String(result.insertedId),
      name,
      role,
      message,
    });
  } catch (e) {
    return res.status(500).json({ error: "Failed to create" });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.startsWith("default-")) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const { name, role, message } = req.body || {};
    const update = {};
    if (name !== undefined) update.name = name;
    if (role !== undefined) update.role = role;
    if (message !== undefined) update.message = message;
    const db = await getDb();
    const result = await db.collection("testimonials").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );
    if (!result) return res.status(404).json({ error: "Not found" });
    return res.json({
      _id: String(result._id),
      name: result.name,
      role: result.role,
      message: result.message,
    });
  } catch (e) {
    return res.status(500).json({ error: "Failed to update" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.startsWith("default-")) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const db = await getDb();
    const result = await db.collection("testimonials").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: "Failed to delete" });
  }
});

module.exports = router;
