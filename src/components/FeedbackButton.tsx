"use client";
import React, { useState} from "react";
import { X } from "lucide-react";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A floating button that opens a popup to submit feedback.
 *
 * The form includes a name field (optional) and a message field (required).
 * The form is submitted to `/api/feedback` as a JSON payload.
 *
 * The component uses `useState` to store the form data, and tracks whether the
 * form is currently submitting. The component also uses `useCallback` to memoize
 * the `handleChange` and `handleSubmit` functions.
 *
 * @return {JSX.Element} The feedback button component.
 */
/*******  16a1172a-f728-458f-b577-52cf10b31d19  *******/const FeedbackButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.message.trim()) return alert("Message required");

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Feedback sent! Thank you.");
        setFormData({ name: "", message: "" });
        setIsPopupOpen(false);
      }
    } catch (err) {
      alert("Failed to send feedback.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#3FA7D6] to-[#E846AB] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all"
      >
        💬
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsPopupOpen(false)} />
          <div className="relative bg-white/20 backdrop-blur-md rounded-3xl p-8 max-w-md w-full z-50">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-red-500/20"
            >
              <X size={20} />
            </button>
            <h2 className="text-white text-xl font-bold mb-4 text-center">Share Your Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name (optional)"
                className="w-full p-3 rounded-xl bg-black/20 text-white placeholder-gray-400"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={4}
                className="w-full p-3 rounded-xl bg-black/20 text-white placeholder-gray-400"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3FA7D6] text-black py-3 rounded-xl font-semibold hover:scale-105 transition-all"
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
