"use client";
import React, { useState } from "react";
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

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Feedback submitted successfully!");
        setFormData({ name: "", message: "" });
        setIsPopupOpen(false);
      } else {
        alert(data.error || "Failed to submit feedback.");
      }
    } catch (err) {
      console.error("Error:", err);
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
      >
        💬
      </button>

      {/* Feedback Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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
            >
              <X size={20} />
            </button>
            <h2 className="text-white text-xl font-bold mb-4 text-center">
              Share Your Feedback
            </h2>
            <h3>
              <p className="text-text-secondary text-sm mb-6 text-center">
                I’m open to design suggestions. Feel free to share any thoughts or suggestions!
              </p>
            </h3>
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
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
                className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all"
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
