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
    let usingToken = false;
    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
        usingToken = true;
    }

    console.log(`[GitHub] Fetching repos for ${username} (Token: ${usingToken ? "YES" : "NO"})...`);

    let response = await fetch(url, { headers });

    // Retry without token if 401 (Bad credentials)
    if (response.status === 401 && usingToken) {
        console.warn("[GitHub] Token rejected (401). Retrying without token...");
        delete headers.Authorization;
        response = await fetch(url, { headers });
    }

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`GitHub API ${response.status}: ${text}`);
    }

    const repos = await response.json();

    // 1. Filter & Sort first to minimize API calls
    const relevantRepos = repos
        .filter(repo =>
            !repo.fork &&
            repo.topics.includes("featured")
        )
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    // 2. Process each repo to find preview image
    const projectPromises = relevantRepos.map(async (repo) => {
        let previewImage = null;

        // A. Check homepage for direct image URL
        if (repo.homepage && /\.(png|jpg|jpeg|webp|gif)$/i.test(repo.homepage)) {
            previewImage = repo.homepage;
        }

        // B. Fetch README if no homepage image
        if (!previewImage) {
            try {
                const readmeUrl = `https://api.github.com/repos/${username}/${repo.name}/readme`;
                const readmeRes = await fetch(readmeUrl, { headers });

                if (readmeRes.ok) {
                    const readmeData = await readmeRes.json();

                    // Decode Base64 content
                    const content = Buffer.from(readmeData.content, "base64").toString("utf-8");

                    // Regex to find FIRST image (Markdown or HTML)
                    // Matches ![alt](url) or <img src="url" />
                    const imgRegex = /!\[.*?\]\((.*?)\)|<img[^>]+src=["'](.*?)["']/;
                    const match = content.match(imgRegex);

                    if (match) {
                        // match[1] is markdown url, match[2] is html src
                        let extractedUrl = match[1] || match[2];

                        // Handle relative paths (e.g. "preview.png")
                        if (extractedUrl && !extractedUrl.startsWith("http") && !extractedUrl.startsWith("data:")) {
                            const cleanPath = extractedUrl.replace(/^\.\//, "");
                            const branch = repo.default_branch || "main";
                            extractedUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/${branch}/${cleanPath}`;
                        }

                        if (extractedUrl && extractedUrl.startsWith("http")) {
                            previewImage = extractedUrl;
                        }
                    }
                }
            } catch (err) {
                console.warn(`[GitHub] Failed to fetch README for ${repo.name}: ${err.message}`);
                // Continue to fallback
            }
        }

        // C. Fallback to OpenGraph
        if (!previewImage) {
            previewImage = `https://opengraph.githubassets.com/1/${username}/${repo.name}`;
        }

        return {
            title: repo.name.replace(/[-_]/g, " "),
            description: repo.description || "No description provided.",
            github: repo.html_url,
            live: repo.homepage || null,
            tech: repo.topics || [],
            language: repo.language || null,
            stars: repo.stargazers_count,
            updated: repo.updated_at,
            previewImage: previewImage
        };
    });

    // Resolve all promises
    const projects = await Promise.all(projectPromises);
    return projects;
}

module.exports = { fetchGitHubProjects };
