// ──────────────────────────────────────────────────────────
// Express Server — Portfolio API
// ──────────────────────────────────────────────────────────
//
// Endpoints:
//   GET /api/projects   — GitHub repositories
//   GET /api/blogs      — Hashnode blog posts
//   GET /health         — Health check (for Render monitoring)
//
// ──────────────────────────────────────────────────────────

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const projectsRoute = require("./routes/projects");
const blogsRoute = require("./routes/blogs");

const contactRoute = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ───────────────────────────────────────────
app.use(cors());                      // Allow all origins (fine for portfolio)
app.use(express.json());

// ── Routes ──────────────────────────────────────────────
app.use("/api/projects", projectsRoute);
app.use("/api/blogs", blogsRoute);
app.use("/api/contact", contactRoute);

// Health check for Render / uptime monitors
app.get("/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
});

// Root
app.get("/", (_req, res) => {
    res.json({
        name: "Portfolio API",
        endpoints: ["/api/projects", "/api/blogs", "/health"],
    });
});

// ── Start ───────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 Portfolio API running on port ${PORT}`);
    console.log(`   GitHub user  : ${process.env.GITHUB_USERNAME || "Prathmesh1703"}`);
    console.log(`   Hashnode user: ${process.env.HASHNODE_USERNAME || "Prathmesh3000"}`);
    console.log(`   Token        : ${process.env.GITHUB_TOKEN ? "✔ set" : "✘ not set (using public rate limit)"}`);
    console.log();
});
