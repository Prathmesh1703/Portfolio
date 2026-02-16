// ──────────────────────────────────────────────────────────
// Blogs Route — GET /api/blogs
// ──────────────────────────────────────────────────────────

const express = require("express");
const cache = require("../cache");
const { fetchHashnodeBlogs } = require("../services/hashnodeService");

const router = express.Router();
const CACHE_KEY = "hashnode_blogs";

router.get("/", async (_req, res) => {
    try {
        // 1. Check cache first
        const cached = cache.get(CACHE_KEY);
        if (cached) {
            return res.json({ source: "cache", count: cached.length, blogs: cached });
        }

        const username = process.env.HASHNODE_USERNAME || "Prathmesh3000";
        const blogs = await fetchHashnodeBlogs(username);

        // 3. Store in cache
        cache.set(CACHE_KEY, blogs);

        return res.json({ source: "api", count: blogs.length, blogs });
    } catch (error) {
        console.error("[Blogs] Error:", error.message);
        return res.status(502).json({
            error: "Failed to fetch blogs",
            message: error.message,
        });
    }
});

module.exports = router;
