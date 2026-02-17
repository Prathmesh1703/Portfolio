// ──────────────────────────────────────────────────────────
// Contact Route — Send email via Nodemailer
// ──────────────────────────────────────────────────────────

const express = require("express");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// 1. Rate Limiter (Max 5 requests per hour per IP)
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: { success: false, error: "Too many requests. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});

// 2. Email Transporter (Gmail)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 3. POST /api/contact
router.post("/", contactLimiter, async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: "All fields are required." });
        }
        if (!email.includes("@")) {
            return res.status(400).json({ success: false, error: "Invalid email address." });
        }
        if (message.length < 10) {
            return res.status(400).json({ success: false, error: "Message must be at least 10 characters." });
        }

        // Send Email
        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`, // Sender address
            to: process.env.EMAIL_USER,                     // Your email
            replyTo: email,                                // Reply to user's email
            subject: `Portfolio Contact: ${name}`,
            text: `
Name: ${name}
Email: ${email}
            
Message:
${message}
            `,
            html: `
<h3>New Contact Message</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
            `,
        });

        console.log(`[Contact] Email sent from ${email}`);
        return res.status(200).json({ success: true, message: "Message sent successfully!" });

    } catch (error) {
        console.error("[Contact] Error:", error);
        return res.status(500).json({ success: false, error: "Failed to send message. Please try again later." });
    }
});

module.exports = router;
