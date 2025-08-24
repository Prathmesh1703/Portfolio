"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

/**
 * FeedbackButton.tsx
 * - Submits to Netlify Forms (no backend needed)
 * - Form name: "feedback" (only message is required)
 */

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const FeedbackButton: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    message: "",
    "bot-field": "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only message is required as per your spec
    if (!formData.message || !formData.message.trim()) {
      alert("Please write your message before sending.");
      return;
    }

    // If honeypot is filled, likely a bot; silently ignore
    if (formData["bot-field"] && formData["bot-field"].trim() !== "") {
      // Optionally you could log this somewhere, but for now just return.
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        "form-name": "feedback",
        name: formData.name || "",
        message: formData.message || "",
        "bot-field": formData["bot-field"] || "",
      };

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });

      if (res.ok) {
        // Netlify returns 200 on success; show friendly message
        alert("Thanks — feedback submitted!");
        setFormData({ name: "", message: "", "bot-field": "" });
        setIsPopupOpen(false);
      } else {
        // Try to parse body, but fall back to generic message
        let text: string;
        try {
          const j = await res.json();
          text = j?.error || j?.message || "Failed to submit feedback.";
        } catch {
          text = "Failed to submit feedback.";
        }
        alert(text);
      }
    } catch (err) {
      console.error("Feedback submit error:", err);
      alert("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Feedback Button */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#3FA7D6] to-[#E846AB] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all z-50"
        aria-label="Open feedback popup"
      >
        💬
      </button>

      {/* Feedback Popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-title"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsPopupOpen(false)}
          />

          {/* Popup */}
          <div className="relative bg-surface/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-red-500/20"
              aria-label="Close feedback"
            >
              <X size={20} />
            </button>

            <h2 id="feedback-title" className="text-white text-xl font-bold mb-4 text-center">
              Share Your Feedback
            </h2>

            <p className="text-text-secondary text-sm mb-6 text-center">
              I’m open to design suggestions. Feel free to share any thoughts or suggestions!
            </p>

            {/* Netlify form */}
            <form
              name="feedback"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmitFeedback}
              className="space-y-4"
            >
              {/* Required for Netlify to identify the form when JS posts */}
              <input type="hidden" name="form-name" value="feedback" />

              {/* Honeypot field (should be left empty by humans) */}
              {/* Hide visually but keep in DOM so bots may fill it */}
              <div style={{ position: "absolute", left: "-10000px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }} aria-hidden="true">
                <label>
                  Don’t fill this out if you're human: <input name="bot-field" value={formData["bot-field"]} onChange={handleChange} />
                </label>
              </div>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name (optional)"
                className="w-full p-3 rounded-xl bg-black/20 text-white placeholder-gray-400 border border-white/20"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={4}
                className="w-full p-3 rounded-xl bg-black/20 text-white placeholder-gray-400 border border-white/20"
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;
