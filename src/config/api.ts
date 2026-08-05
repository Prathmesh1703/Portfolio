// ──────────────────────────────────────────────────────────
// API Configuration
// ──────────────────────────────────────────────────────────
//
// VITE_API_URL must be set in your hosting platform's environment
// variables (Vercel / Netlify / Render dashboard).
//
// Example: VITE_API_URL=https://portfolio-2a9w.onrender.com
// ──────────────────────────────────────────────────────────

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export default API_BASE_URL;
