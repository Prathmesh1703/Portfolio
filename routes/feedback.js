import express from "express";
import Contact from "../models/Contact.js";
import { sendFeedbackEmail } from "../utils/mailer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, message } = req.body;

    // Validate message
    if (!message || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: "Message must be at least 5 characters long"
      });
    }

    if (message.trim().length > 1000) {
      return res.status(400).json({
        success: false,
        error: "Message is too long (max 1000 characters)"
      });
    }

    // Save to database
    const feedback = new Contact({
      name: name && name.trim() ? name.trim() : "Anonymous Visitor",
      email: "anonymous@feedback.com",
      subject: "Portfolio Feedback",
      message: message.trim(),
      type: "feedback"
    });

    await feedback.save();
    console.log(`💡 New feedback from: ${feedback.name}`);

    // Send email notification
    const emailResult = await sendFeedbackEmail({
      name: feedback.name,
      message: feedback.message
    });

    if (!emailResult.success) {
      console.warn("⚠️ Email failed but feedback saved:", emailResult.error);
    }

    res.status(200).json({
      success: true,
      message: "Thank you for your feedback! 🙏",
      id: feedback._id
    });

  } catch (error) {
    console.error("❌ Feedback error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to submit feedback. Please try again."
    });
  }
});

// Get all feedback (admin endpoint)
router.get("/", async (req, res) => {
  try {
    const feedback = await Contact.find({ type: "feedback" })
      .sort({ createdAt: -1 })
      .select("-__v");

    res.json({
      success: true,
      feedback,
      count: feedback.length
    });
  } catch (error) {
    console.error("❌ Error fetching feedback:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch feedback"
    });
  }
});

export default router;