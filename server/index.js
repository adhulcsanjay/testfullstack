const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const contentRoutes = require("./routes/content");
const testimonialsRoutes = require("./routes/testimonials");
const faqsRoutes = require("./routes/faqs");

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/faqs", faqsRoutes);

app.listen(PORT, () => {
  console.log("Express server running at http://localhost:" + PORT);
});
