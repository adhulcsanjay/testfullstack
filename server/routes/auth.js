const express = require("express");
const { createToken, verifyToken, COOKIE_NAME } = require("../auth");

const router = express.Router();

// Cookie options: must match exactly when setting and clearing (required for cross-origin)
const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
};

// LOGIN
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
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true });
  } catch (e) {
    return res.status(400).json({ error: "Invalid request" });
  }
});

// LOGOUT – same path/secure/sameSite as login so browser clears the cookie (cross-origin)
router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: 0 });
  return res.json({ success: true });
});

// CURRENT ADMIN
router.get("/me", (req, res) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ ok: false });

  const admin = verifyToken(token);
  if (!admin) return res.status(401).json({ ok: false });

  const name =
    process.env.ADMIN_NAME ||
    admin.email.split("@")[0];

  return res.json({ ok: true, email: admin.email, name });
});

module.exports = router;
