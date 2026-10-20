// Centralized API Base URL configuration
const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

// In local dev, use port 5002. In production on Vercel, use relative '/api'
const API_BASE_URL =
  process.env.REACT_APP_API_URL || (isLocalhost ? "http://localhost:5002" : "/api");

export default API_BASE_URL;
