import nodemailer from "nodemailer";

export async function sendFeedbackEmail(feedback) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${feedback.name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "[Portfolio Feedback] New Message",
      text: `Name: ${feedback.name}\nMessage: ${feedback.message}`,
      html: `<p><strong>Name:</strong> ${feedback.name}</p><p><strong>Message:</strong> ${feedback.message}</p>`,
    });
  } catch (err) {
    console.error("Error sending feedback email:", err);
  }
}
