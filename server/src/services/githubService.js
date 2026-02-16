// ──────────────────────────────────────────────────────────
// GitHub Service — Fetches & formats public repositories
// ──────────────────────────────────────────────────────────

const fetch = require("node-fetch");

const GITHUB_API = "https://api.github.com/users";

/**
 * Fetches public repos for the configured GitHub user.
 *
 * Logic:
 *  1. Exclude forks
 *  2. Exclude repos without a description
 *  3. Sort by updated_at (most recent first)
 *  4. Map into a clean, minimal JSON structure
 *
 * If GITHUB_TOKEN is set in the environment it will be sent
 * as a Bearer token — this raises the rate limit from 60 → 5 000 req/h.
 */
async function fetchGitHubProjects(username) {
    const url = `${GITHUB_API}/${username}/repos?per_page=100&sort=updated&direction=desc`;

    // Build headers — token is optional
    const headers = { Accept: "application/vnd.github.v3+json" };
    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`GitHub API ${response.status}: ${text}`);
    }

    const repos = await response.json();

    // Filter, sort, and map
    const projects = repos
        .filter((repo) => !repo.fork)                     // no forks
        // .filter((repo) => repo.description)                // must have description
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .map((repo) => ({
            title: repo.name.replace(/[-_]/g, " "),          // human-readable title
            description: repo.description || "No description provided.",
            github: repo.html_url,
            live: repo.homepage || null,                     // homepage = live demo
            tech: repo.topics || [],                         // GitHub topics as tech tags
            language: repo.language || null,                 // primary language
            stars: repo.stargazers_count,
            updated: repo.updated_at,
        }));

    return projects;
}

module.exports = { fetchGitHubProjects };
