// ──────────────────────────────────────────────────────────
// Hashnode Service — Fetches & formats blog posts via RSS feed
//
// NOTE: Hashnode's GraphQL API became paid-only on 2026-05-13.
// We now use the free public RSS feed instead:
//   https://{host}/rss.xml
// ──────────────────────────────────────────────────────────

const fetch = require("node-fetch");
const { XMLParser } = require("fast-xml-parser");

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

/**
 * Estimates reading time from plain text (avg 200 wpm).
 */
function estimateReadTime(text = "") {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Strips HTML tags from a string.
 */
function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Fetches the latest blog posts from a Hashnode publication RSS feed.
 *
 * @param {string} host  - Publication host, e.g. "prathmeshbharsakal.hashnode.dev"
 * @param {number} count - Max number of posts to return
 *
 * Returns a clean array of blog objects ready for frontend consumption.
 */
async function fetchHashnodeBlogs(host, count = 20) {
  const rssUrl = `https://${host}/rss.xml`;

  const response = await fetch(rssUrl, {
    headers: { "Accept": "application/rss+xml, application/xml, text/xml" },
  });

  if (!response.ok) {
    throw new Error(`RSS feed fetch failed: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const parsed = parser.parse(xml);

  const items = parsed?.rss?.channel?.item;

  if (!items) return [];

  // Normalise: single item comes as object, multiple as array
  const rawItems = Array.isArray(items) ? items : [items];

  const blogs = rawItems.slice(0, count).map((item) => {
    const description = stripHtml(item.description || item["content:encoded"] || "");
    const cover =
      item["media:content"]?.["@_url"] ||
      item.enclosure?.["@_url"] ||
      null;

    return {
      title:       item.title || "Untitled",
      description: description.slice(0, 300) || "",
      slug:        (item.link || "").split("/").pop() || "",
      cover,
      readTime:    estimateReadTime(description),
      date:        item.pubDate || new Date().toISOString(),
      url:         item.link || "",
    };
  });

  return blogs;
}

module.exports = { fetchHashnodeBlogs };