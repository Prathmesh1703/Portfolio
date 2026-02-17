
import { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Github, Linkedin, Instagram, Gitlab, Download } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import { SiHashnode } from "react-icons/si";


const HeroSection = () => {
  const ref = useRef(null);

  // Mouse interaction for organic shape distortion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-0 px-6"
    >
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 h-full">

        {/* Left Column: Text Content */}
        <div className="order-2 lg:order-1 flex flex-col justify-center space-y-8 text-center lg:text-left pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              AI/ML Engineer, <br className="hidden md:block" />
              MERN Developer & <br className="hidden md:block" />
              Technical Writer
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              I'm <span className="font-bold text-foreground">Prathmesh Bharsakle</span>, building machine learning systems and full-stack applications optimized for real-world performance and scalability.
            </p>
          </motion.div>

          {/* Resume Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start -mt-2"
          >
            <a
              href={(() => {
                const url = import.meta.env.VITE_RESUME_URL || "";
                // specific fix for file/d/ links to convert to direct download
                const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
                if (match && match[1]) {
                  return `https://drive.google.com/uc?export=download&id=${match[1]}`;
                }
                return url;
              })()}
              target="_blank"
              rel="noopener noreferrer"
              title="Download Resume"
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/50 border border-slate-200 text-slate-600 text-sm font-medium hover:bg-white hover:text-primary hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
            >
              <span>Download Resume</span>
              <Download size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
            </a>
          </motion.div>

          {/* Social Media Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-x-6 gap-y-4 justify-center lg:justify-start pt-2"
          >
            {[
              { icon: Github, label: "GitHub", href: "https://github.com/Prathmesh1703" },
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/prathamesh-bharsakale-bb3452257/" },
              { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/prathmesh3000_?igsh=MW83eDh2aDlkYzR2dQ==" },
              { icon: FaXTwitter, label: "X", href: "https://x.com/prathmesh3000" },
              { icon: Gitlab, label: "GitLab", href: "https://gitlab.com/prathameshpb2004" },
              { icon: SiHashnode, label: "Hashnode", href: "https://hashnode.com/@Prathmesh3000" }
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group cursor-pointer"
                whileHover={{ y: -3 }}
              >
                <div className="text-foreground/70 group-hover:text-primary transition-colors duration-300">
                  <social.icon size={20} />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Organic Image */}
        <div className="order-1 lg:order-2 flex justify-center items-center relative" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            {/* Rotating Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[320px] h-[320px] md:w-[480px] md:h-[480px] border-[1.5px] border-dashed border-primary/20 rounded-full"
              style={{
                borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%"
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[340px] h-[340px] md:w-[500px] md:h-[500px] border border-secondary/10 rounded-full"
              style={{
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%"
              }}
            />

            {/* Profile Image Container */}
            <motion.div
              className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] overflow-hidden bg-muted/20 z-10"
              style={{
                borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%", // Base shape
                x: smoothX,
                y: smoothY,
              }}
              animate={{
                borderRadius: [
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "30% 60% 70% 40% / 50% 60% 30% 60%",
                  "60% 40% 30% 70% / 60% 30% 70% 40%"
                ],
                y: [0, -10, 0] // Floating effect
              }}
              transition={{
                borderRadius: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Texture Overlay (Reveals on Hover) */}
              <motion.div
                className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-0 hover:opacity-10 transition-opacity duration-500 pointer-events-none z-20"
              />

              <img
                src="/images/Photo.jpeg"
                alt="Prathmesh Bharsakle"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };