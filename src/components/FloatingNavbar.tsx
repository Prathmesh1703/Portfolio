
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, FolderGit2, BookOpen, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-scroll';
import GlassSurface from './ui/GlassSurface';

const navItems = [
  { name: 'Home', icon: Home, to: 'home' },
  { name: 'About me', icon: User, to: 'about' },
  { name: 'Experience', icon: Briefcase, to: 'experience' },
  { name: 'Projects', icon: FolderGit2, to: 'projects' },
  { name: 'Blogs', icon: BookOpen, to: 'blogs' },
  { name: 'Contact me', icon: Mail, to: 'contact' },
];

export const FloatingNavbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        className="rounded-full" // Container for animation
      >
        <GlassSurface
          borderRadius={9999}
          opacity={0.3}
          width="fit-content" // Allow dynamic width
          height="fit-content"
          className="mx-auto border border-white/20 shadow-lg min-w-[300px]" // Ensure minimum width
          displace={0.5}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          brightness={50}
          style={{ backdropFilter: 'blur saturate(200%)' }}
          mixBlendMode="screen"
        >
          {/* Flex Container */}
          <div className="flex items-center gap-1 p-1.5">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isHovered = hoveredIndex === index;

              return (
                <div key={item.name} className="relative group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}>

                  <Link
                    to={item.to}
                    smooth={true}
                    duration={500}
                    spy={true}
                    offset={-50}
                    // Active State: White Background, Dark Text, slightly larger
                    activeClass="bg-white text-slate-900 shadow-md scale-110"
                    className={cn(
                      "cursor-pointer flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-out",
                      "hover:bg-white/20 hover:scale-105 text-slate-700"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="sr-only">{item.name}</span>
                  </Link>

                  {/* Tooltip - Positioned absolutely relative to the group container, ensuring visibility */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: -45, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
                        className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 text-sm font-medium text-white bg-slate-900/90 backdrop-blur-md rounded-xl shadow-xl whitespace-nowrap z-50 border border-white/10"
                      >
                        {item.name}
                        {/* Little arrow pointing down */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900/90 rotate-45 border-r border-b border-white/10" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </GlassSurface>
      </motion.div>
    </div >
  );
};