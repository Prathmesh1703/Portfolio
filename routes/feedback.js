import express from "express";
import Feedback from "../models/feedback_db.js";
import { sendFeedbackEmail } from "../utils/mailer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, message } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: "Message is required" });
  }

  try {
    // Save to MongoDB
    const feedback = await Feedback.create({
      name: name || "Anonymous",
      message,
    });

    // Send Email
    await sendFeedbackEmail(feedback);

    res.status(200).json({ success: true, message: "Feedback submitted" });
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ success: false, error: "Failed to submit feedback" });
  }
});

export default router;
