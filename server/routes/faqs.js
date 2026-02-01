const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../db");
const { requireAdmin } = require("../auth");

const router = express.Router();

const DEFAULT_LIST = [
  {
    question: "What features does the AI Health Assistant offer?",
    answer:
      "Our AI Health Assistant provides personalized wellness plans, health tracking, AI coaching, nutrition guidance, and lifestyle recommendations tailored to your goals.",
  },
  {
    question: "Is the app customizable to my needs?",
    answer:
      "Yes. You can customize goals, routines, reminders, diet preferences, and health priorities to match your lifestyle.",
  },
  {
    question: "How does the free trial work?",
    answer: "You get full access during the trial period. You can cancel anytime before billing starts.",
  },
];

router.get("/", async (req, res) => {
  try {
    const db = await getDb();
    const list = await db.collection("faqs").find({}).sort({ _id: 1 }).toArray();
    const items =
      list.length > 0
        ? list.map((d) => ({ _id: String(d._id), question: d.question, answer: d.answer }))
        : DEFAULT_LIST.map((d, i) => ({ _id: `default-${i}`, ...d }));
    return res.json(items);
  } catch (e) {
    return res.json(DEFAULT_LIST.map((d, i) => ({ _id: `default-${i}`, ...d })));
  }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const { question = "", answer = "" } = req.body || {};
    const db = await getDb();
    const result = await db.collection("faqs").insertOne({ question, answer });
    return res.json({
      _id: String(result.insertedId),
      question,
      answer,
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
    const { question, answer } = req.body || {};
    const update = {};
    if (question !== undefined) update.question = question;
    if (answer !== undefined) update.answer = answer;
    const db = await getDb();
    const result = await db.collection("faqs").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );
    if (!result) return res.status(404).json({ error: "Not found" });
    return res.json({
      _id: String(result._id),
      question: result.question,
      answer: result.answer,
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
    const result = await db.collection("faqs").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: "Failed to delete" });
  }
});

module.exports = router;
