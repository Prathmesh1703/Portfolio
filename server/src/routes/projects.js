// ──────────────────────────────────────────────────────────
// Projects Route — GET /api/projects
// ──────────────────────────────────────────────────────────

const express = require("express");
const cache = require("../cache");
const { fetchGitHubProjects } = require("../services/githubService");

const router = express.Router();
const CACHE_KEY = "github_projects";

router.get("/", async (_req, res) => {
    try {
        // 1. Check cache first
        const cached = cache.get(CACHE_KEY);
        if (cached) {
            return res.json({ source: "cache", count: cached.length, projects: cached });
        }

        // 2. Fetch fresh data from GitHub
        const username = process.env.GITHUB_USERNAME || "Prathmesh1703";
        const projects = await fetchGitHubProjects(username);

        // 3. Store in cache
        cache.set(CACHE_KEY, projects);

        return res.json({ source: "api", count: projects.length, projects });
    } catch (error) {
        console.error("[Projects] Error:", error.message);
        return res.status(502).json({
            error: "Failed to fetch projects",
            message: error.message,
        });
    }
});

module.exports = router;
