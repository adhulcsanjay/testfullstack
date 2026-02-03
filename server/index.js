const path = require("path");
const dotenv = require("dotenv");

// dotenv.config({
//   path:
//     process.env.NODE_ENV === "production"
//       ? undefined
//       : path.join(__dirname, "..", ".env.local"),
// });
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const contentRoutes = require("./routes/content");
const testimonialsRoutes = require("./routes/testimonials");
const faqsRoutes = require("./routes/faqs");

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/faqs", faqsRoutes);

app.listen(PORT, () => {
  console.log("Express server running on port " + PORT);
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});