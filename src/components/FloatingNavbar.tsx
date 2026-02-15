
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, FolderGit2, BookOpen, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-scroll';

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
        className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-full",
          "bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl",
          "hover:border-white/60 transition-colors duration-300"
        )}
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isHovered = hoveredIndex === index;

          return (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={500}
              spy={true}
              activeClass="bg-primary/10 text-primary"
              className="relative cursor-pointer group rounded-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={cn(
                  "p-3 rounded-full transition-all duration-300",
                  "bg-transparent hover:bg-black/5",
                  "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="sr-only">{item.name}</span>

                {/* Tooltip */}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? -45 : 10 }}
                  className="absolute left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-slate-800 rounded-md whitespace-nowrap pointer-events-none border border-slate-700 shadow-md"
                >
                  {item.name}
                </motion.span>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};