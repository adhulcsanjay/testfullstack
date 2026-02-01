const express = require("express");
const { getDb, DEFAULT_HERO, DEFAULT_ABOUT } = require("../db");
const { requireAdmin } = require("../auth");

const router = express.Router();

router.get("/hero", async (req, res) => {
  try {
    const db = await getDb();
    const doc = await db.collection("content").findOne({ section: "hero" });
    const data = doc && doc.data ? doc.data : DEFAULT_HERO;
    return res.json(data);
  } catch (e) {
    return res.json(DEFAULT_HERO);
  }
});

router.put("/hero", requireAdmin, async (req, res) => {
  try {
    const body = req.body || {};
    const data = {
      title: body.title ?? "",
      subtitle: body.subtitle ?? "",
      image: body.image ?? "/images/Group 1171275467.png",
    };
    const db = await getDb();
    await db.collection("content").updateOne(
      { section: "hero" },
      { $set: { section: "hero", data, updatedAt: new Date() } },
      { upsert: true }
    );
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ error: "Failed to update" });
  }
});

router.get("/about", async (req, res) => {
  try {
    const db = await getDb();
    const doc = await db.collection("content").findOne({ section: "about" });
    const data = doc && doc.data ? doc.data : DEFAULT_ABOUT;
    return res.json(data);
  } catch (e) {
    return res.json(DEFAULT_ABOUT);
  }
});

router.put("/about", requireAdmin, async (req, res) => {
  try {
    const body = req.body || {};
    const data = {
      heading: body.heading ?? "",
      paragraph: body.paragraph ?? "",
    };
    const db = await getDb();
    await db.collection("content").updateOne(
      { section: "about" },
      { $set: { section: "about", data, updatedAt: new Date() } },
      { upsert: true }
    );
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ error: "Failed to update" });
  }
});

module.exports = router;
