// ──────────────────────────────────────────────────────────
// API Configuration
// ──────────────────────────────────────────────────────────
//
// In development : http://localhost:5000
// In production  : Your deployed Render URL
// ──────────────────────────────────────────────────────────

const API_BASE_URL =
    import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000" : "");

export default API_BASE_URL;
