import { useState } from 'react';
import { Mail, MapPin, Send, Linkedin, Github, Twitter, Instagram, Copy, Check } from 'lucide-react';
import { SiHashnode, SiGitlab } from 'react-icons/si';
import ScrollReveal from './ui/ScrollReveal';

const ContactSection = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("prathmesh1703@gmail.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden flex flex-col justify-between min-h-screen bg-gradient-to-t from-slate-100/50 to-transparent">
      {/* Background Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-white via-slate-50 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 w-full flex-grow flex flex-col justify-center">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
            Let's Build the Future
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Have a visionary idea or a complex challenge? I'm ready to apply my expertise in AI and Full-Stack development to bring it to life.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Contact Info */}
          <ScrollReveal className="lg:col-span-2 space-y-10">
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
                      <a href="mailto:prathmesh1703@gmail.com" className="text-slate-800 font-medium hover:text-primary transition-colors">
                        prathmesh1703@gmail.com
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
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal className="lg:col-span-3">
            <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] bg-white/40 border border-white/60 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700 ml-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      className="w-full bg-white/60 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 ml-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      className="w-full bg-white/60 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700 ml-1">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/60 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
                  />
                </div>
                <button className="w-full group relative overflow-hidden rounded-xl bg-slate-900 text-white font-medium py-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>


      {/* Footer */}
      <div className="relative z-10 mt-20 pt-8 border-t border-slate-200/60 text-center">
        <p className="text-slate-500 text-sm flex items-center justify-center gap-1">
          © {new Date().getFullYear()} Prathmesh Bharsakle. Crafted with <span className="text-red-500 animate-pulse">❤</span> and React.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
