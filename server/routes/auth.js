const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env.local") });
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const express = require("express");
const { createToken, COOKIE_NAME } = require("../auth");

const router = express.Router();

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body || {};
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      return res.status(500).json({ error: "Admin not configured" });
    }
    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = createToken(email);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7 * 1000,
      path: "/",
    });
    return res.json({ success: true });
  } catch (e) {
    return res.status(400).json({ error: "Invalid request" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  return res.json({ success: true });
});

router.get("/me", (req, res) => {
  const { verifyToken } = require("../auth");
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ ok: false });
  const admin = verifyToken(token);
  if (!admin) return res.status(401).json({ ok: false });
  const name =
    process.env.ADMIN_NAME ||
    (admin.email && admin.email.split("@")[0]) ||
    "Admin";
  return res.json({ ok: true, email: admin.email, name });
});

module.exports = router;
