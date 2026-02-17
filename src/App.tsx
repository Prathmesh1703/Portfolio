
import { HeroSection } from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import { FloatingNavbar } from './components/FloatingNavbar';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import React, { Suspense } from 'react';
import SectionLoader from './components/SectionLoader';

// Lazy Load Heavy Sections
const ProjectsSection = React.lazy(() => import('./components/ProjectsSection'));
const BlogsSection = React.lazy(() => import('./components/BlogsSection'));
const ContactSection = React.lazy(() => import('./components/ContactSection'));

function App() {
  // Mouse tracking for organic reveal effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for parallax
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalize coordinates -1 to 1
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden" onMouseMove={handleMouseMove}>

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50/50">
        {/* Soft Shapes / Pebbles - Clarity & Depth */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-slate-200/40 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[80px] mix-blend-multiply"
          style={{ x: useMotionTemplate`${smoothX.get() * -40}px`, y: useMotionTemplate`${smoothY.get() * -40}px` }}
          animate={{
            rotate: [0, 10, 0],
            scale: [1, 1.05, 1],
            borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 50% 40% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-100/50 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[80px] mix-blend-multiply"
          style={{ x: useMotionTemplate`${smoothX.get() * 40}px`, y: useMotionTemplate`${smoothY.get() * 40}px` }}
          animate={{
            rotate: [0, -10, 0],
            scale: [1, 1.1, 1],
            borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[30%] right-[15%] w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[60px] mix-blend-multiply"
          style={{ x: useMotionTemplate`${smoothX.get() * 20}px`, y: useMotionTemplate`${smoothY.get() * 20}px` }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Intelligent Neural Lines - Heartbeat & Flow */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            {/* Gradient for the pulse - Electric Blue Fade */}
            <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 1)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Path 1: Top Left to Center Right */}
          <g>
            <path
              d="M 0 100 Q 600 200 1000 150 T 1600 300"
              fill="none"
              stroke="rgba(148, 163, 184, 0.2)" // Slate-400 very low opacity base
              strokeWidth="1"
            />
            <motion.path
              d="M 0 100 Q 600 200 1000 150 T 1600 300"
              fill="none"
              stroke="url(#pulse-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ strokeDasharray: "100 1500", strokeDashoffset: 1600 }}
              animate={{ strokeDashoffset: -1600 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />
          </g>

          {/* Path 2: Bottom Left to Top Right */}
          <g>
            <path
              d="M -100 800 C 300 900 600 500 1200 400 S 1800 200 2000 100"
              fill="none"
              stroke="rgba(148, 163, 184, 0.2)"
              strokeWidth="1"
            />
            <motion.path
              d="M -100 800 C 300 900 600 500 1200 400 S 1800 200 2000 100"
              fill="none"
              stroke="url(#pulse-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ strokeDasharray: "150 2000", strokeDashoffset: 2150 }}
              animate={{ strokeDashoffset: -2150 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            />
          </g>

          {/* Path 3: Vertical Flow */}
          <g>
            <path
              d="M 1200 0 C 1100 300 1300 600 1200 1000"
              fill="none"
              stroke="rgba(148, 163, 184, 0.15)"
              strokeWidth="1"
            />
            <motion.path
              d="M 1200 0 C 1100 300 1300 600 1200 1000"
              fill="none"
              stroke="rgba(139, 92, 246, 0.8)" // Secondary pulse color
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ strokeDasharray: "80 1200", strokeDashoffset: 1280 }}
              animate={{ strokeDashoffset: -1280 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
            />
          </g>
        </svg>
      </div>


      <main className="relative z-10 space-y-24 pb-32">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />

        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <BlogsSection />
        </Suspense>
      </main>

      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>

      <FloatingNavbar />


    </div>
  );
}

export default App;
