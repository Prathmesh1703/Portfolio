// ──────────────────────────────────────────────────────────
// Cache — In-memory cache with configurable TTL
// ──────────────────────────────────────────────────────────
//
// Uses node-cache with a default TTL of 600 seconds (10 minutes).
// Structured so that swapping to Redis in the future only requires
// replacing this single file.
// ──────────────────────────────────────────────────────────

const NodeCache = require("node-cache");

const TTL = parseInt(process.env.CACHE_TTL, 10) || 600; // seconds

const cache = new NodeCache({
    stdTTL: TTL,
    checkperiod: TTL * 0.2,   // cleanup interval
    useClones: false,          // performance: skip cloning
});

module.exports = cache;
