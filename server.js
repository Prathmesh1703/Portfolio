import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

console.log("🚀 Starting server setup...");

// Middleware
console.log("📝 Setting up middleware...");
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL]
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
console.log("✅ Middleware setup complete");

// MongoDB Connection with better error handling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    
    // Fallback for local development
    if (process.env.NODE_ENV !== 'production') {
      console.log("🔄 Trying local MongoDB...");
      try {
        await mongoose.connect('mongodb://localhost:27017/portfolio');
        console.log("✅ Connected to local MongoDB");
      } catch (localError) {
        console.error("❌ Local MongoDB also failed:", localError.message);
        console.log("💡 Make sure MongoDB is installed and running locally");
        // Don't exit in development if MongoDB fails - continue without it
        console.log("⚠️ Continuing without MongoDB in development mode");
      }
    } else {
      process.exit(1);
    }
  }
};

// Initialize MongoDB connection
connectDB();

// Basic routes first
console.log("📝 Setting up basic routes...");

app.get("/", (req, res) => {
  res.json({
    message: "Portfolio API is running!",
    status: "OK",
    timestamp: new Date().toISOString()
  });
});
console.log("✅ Root route registered");

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    email: process.env.EMAIL_USER ? 'Configured' : 'Not configured'
  });
});
console.log("✅ Health check route registered");

// Test email endpoint (development only)
if (process.env.NODE_ENV !== 'production') {
  app.post("/api/test-email", async (req, res) => {
    try {
      const { sendContactEmail } = await import("./utils/mailer.js");
      const result = await sendContactEmail({
        name: "Test User",
        email: "test@example.com",
        subject: "Test Email from Portfolio",
        message: "This is a test email to verify your email configuration is working correctly."
      });
      
      res.json({
        success: result.success,
        message: result.success ? "Test email sent successfully!" : "Email test failed",
        details: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
  console.log("✅ Test email route registered");
}

// Load contact routes
try {
  console.log("📁 Loading contact routes...");
  const contactRoutes = await import("./routes/contact.js");
  console.log("✅ Contact routes imported successfully");
  console.log("📝 Registering contact routes...");
  app.use("/api/contact", contactRoutes.default);
  console.log("✅ Contact routes registered successfully");
} catch (error) {
  console.error("❌ Error with contact routes:", error.message);
  // Create a fallback route
  app.use("/api/contact", (req, res) => {
    res.status(503).json({
      success: false,
      error: "Contact service temporarily unavailable"
    });
  });
}

// Load feedback routes
try {
  console.log("📁 Loading feedback routes...");
  const feedbackRoutes = await import("./routes/feedback.js");
  console.log("✅ Feedback routes imported successfully");
  console.log("📝 Registering feedback routes...");
  app.use("/api/feedback", feedbackRoutes.default);
  console.log("✅ Feedback routes registered successfully");
} catch (error) {
  console.error("❌ Error with feedback routes:", error.message);
  // Create a fallback route
  app.use("/api/feedback", (req, res) => {
    res.status(503).json({
      success: false,
      error: "Feedback service temporarily unavailable"
    });
  });
}

console.log("📝 Setting up error handlers...");

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? "Internal server error" 
      : err.message
  });
});
console.log("✅ Error handler registered");

// 404 handler for API routes
app.use("/api", (req, res, next) => {
  // Only handle if no other API routes matched
  res.status(404).json({
    success: false,
    error: "API endpoint not found"
  });
});
console.log("✅ API 404 handler registered");

// Production static files (only if production)
if (process.env.NODE_ENV === 'production') {
  console.log("📝 Setting up production static files...");
  const buildDir = path.join(__dirname, "dist");
  app.use(express.static(buildDir));
  console.log("✅ Static files registered");
  
  console.log("📝 Setting up catch-all route...");
  // Catch-all handler for frontend routes (must be last)
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildDir, "index.html"));
  });
  console.log("✅ Catch-all route registered");
} else {
  console.log("⚠️ Development mode - skipping static file serving");
}

console.log("📝 Starting server...");

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 MongoDB: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '⏳ Connecting...'}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});