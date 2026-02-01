const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "fallback-secret-change-me";
const COOKIE_NAME = "admin_token";

function createToken(email) {
  return jwt.sign({ email }, SECRET, { expiresIn: "7d" });
}

function verifyToken(token) {
  try {
    const payload = jwt.verify(token, SECRET);
    return { email: payload.email };
  } catch {
    return null;
  }
}

function requireAdmin(req, res, next) {
  const token = req.cookies && req.cookies[COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const admin = verifyToken(token);
  if (!admin) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.admin = admin;
  next();
}

module.exports = { createToken, verifyToken, requireAdmin, COOKIE_NAME };
