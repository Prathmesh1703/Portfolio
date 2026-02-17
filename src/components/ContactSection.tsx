import { useState } from 'react';
import { Mail, MapPin, Send, Linkedin, Github, Twitter, Instagram, Copy, Check } from 'lucide-react';
import { SiHashnode, SiGitlab } from 'react-icons/si';
import { motion } from 'framer-motion';
import API_BASE_URL from '@/config/api';

const ContactSection = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const copyEmail = () => {
    navigator.clipboard.writeText("prathameshpb2004@gmail.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error("Contact Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden flex flex-col justify-between min-h-screen bg-gradient-to-t from-slate-100/50 to-transparent">
      {/* Background Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-white via-slate-50 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 w-full flex-grow flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
            Let's Build the Future
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Have a visionary idea or a complex challenge? I'm ready to apply my expertise in AI and Full-Stack development to bring it to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-10"
          >
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-6">Contact Details</h3>
              <div className="space-y-6">
                <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-transparent hover:border-slate-200 transition-all duration-300">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 font-medium mb-1">Email</p>
                    <div className="flex items-center gap-2">
                      <a href="mailto:prathameshpb2004@gmail.com" className="text-slate-800 font-medium hover:text-primary transition-colors">
                        prathameshpb2004@gmail.com
                      </a>
                      <button onClick={copyEmail} className="text-slate-400 hover:text-slate-600 transition-colors" title="Copy Email">
                        {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-transparent hover:border-slate-200 transition-all duration-300">
                  <div className="p-3 rounded-full bg-secondary/10 text-secondary group-hover:scale-110 transition-transform">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">Location</p>
                    <p className="text-slate-800 font-medium">Pune, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-6">Social Profiles</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Github, href: "https://github.com/Prathmesh1703", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/prathamesh-bharsakale-bb3452257/", label: "LinkedIn" },
                  { icon: Twitter, href: "https://x.com/prathmesh3000", label: "X / Twitter" },
                  { icon: Instagram, href: "https://instagram.com/prathmesh_bharsakle", label: "Instagram" },
                  { icon: SiHashnode, href: "https://prathmeshbharsakle.hashnode.dev/", label: "Hashnode" },
                  { icon: SiGitlab, href: "https://gitlab.com/Prathmesh1703", label: "GitLab" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                    title={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] bg-white/40 border border-white/60 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
              {!isSuccess ? (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-700 ml-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isLoading}
                        placeholder="John Doe"
                        className="w-full bg-white/60 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-700 ml-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isLoading}
                        placeholder="john@example.com"
                        className="w-full bg-white/60 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700 ml-1">Message</label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={isLoading}
                      placeholder="Tell me about your project..."
                      className="w-full bg-white/60 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none disabled:opacity-50"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500 font-medium px-1 animate-pulse">
                      ⚠ {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full group relative overflow-hidden rounded-xl bg-slate-900 text-white font-medium py-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </span>
                    {!isLoading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2 shadow-sm">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Message Sent!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="mt-6 text-sm font-medium text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>


      {/* Footer */}
      <div className="relative z-10 mt-20 pt-8 border-t border-slate-200/60 flex justify-start">
        <motion.div
          className="relative inline-block overflow-hidden cursor-default"
          initial="initial"
          whileHover="hover"
        >
          {/* Invisible Spacer to set width/height based on longest text */}
          <span className="invisible block text-sm font-medium px-1">
            Optimizing loss, minimizing regret.
          </span>

          <motion.span
            className="absolute top-0 left-0 block text-slate-500 text-sm w-full"
            variants={{
              initial: { y: 0, opacity: 1 },
              hover: { y: -24, opacity: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            © {new Date().getFullYear()} Prathmesh Bharsakle.
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 block text-slate-700 text-sm font-medium w-full"
            variants={{
              initial: { y: 24, opacity: 0 },
              hover: { y: 0, opacity: 1 }
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Optimizing loss, minimizing regret.
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
