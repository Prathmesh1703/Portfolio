import { useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowUpRight, FolderGit2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import ScrollReveal from './ui/ScrollReveal';
import API_BASE_URL from '@/config/api';

// ── Types ───────────────────────────────────────────────
interface Project {
  title: string;
  description: string;
  github: string;
  live: string | null;
  tech: string[];
  language: string | null;
  stars: number;
  updated: string;
}

// ── Fallback static data (shown if API is unreachable) ──
const FALLBACK_PROJECTS: Project[] = [
  {
    title: "DeepAssist",
    description: "Generative AI chatbot utilizing Deepseek R1 to assist developers with complex coding problems and general programming queries.",
    github: "https://github.com/Prathmesh1703/DeepAssist",
    live: null,
    tech: ["Python", "LangChain", "Deepseek R1", "Streamlit"],
    language: "Python",
    stars: 0,
    updated: "",
  },
  {
    title: "NyayaBot",
    description: "AI-powered chatbot providing accessible legal assistance for Indian law, interpreting complex queries with real-time responses.",
    github: "https://github.com/Prathmesh1703/NyayaBot",
    live: null,
    tech: ["Python", "Flask", "NLP", "Scikit-learn"],
    language: "Python",
    stars: 0,
    updated: "",
  },
];

// ── Component ───────────────────────────────────────────
const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/projects`);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setProjects(data.projects);
      } catch {
        console.warn("Failed to fetch projects, using fallback data.");
        setProjects(FALLBACK_PROJECTS);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, 2);

  // Build display-friendly tags: GitHub topics + primary language
  const getTags = (project: Project): string[] => {
    const tags = [...project.tech];
    if (project.language && !tags.map(t => t.toLowerCase()).includes(project.language.toLowerCase())) {
      tags.unshift(project.language);
    }
    return tags;
  };

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden bg-slate-50/50">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground tracking-tight flex items-center justify-center gap-3">
            <FolderGit2 className="text-primary" size={40} />
            Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A showcase of intelligent systems and scalable applications.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm">Loading projects...</p>
          </div>
        )}

        {/* Error Notice (subtle, non-blocking) */}
        {error && !loading && (
          <p className="text-center text-xs text-amber-600/70 mb-8">
            Showing cached projects — live data will load when backend is available.
          </p>
        )}

        {/* Projects List */}
        {!loading && (
          <div className="space-y-24">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <ScrollReveal
                  key={project.github + index}
                  layout
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className={cn(
                    "flex flex-col lg:flex-row gap-12 items-center"
                  )}
                >
                  {/* Text Content */}
                  <div className="flex-1 space-y-6 order-2 lg:order-1">
                    <h3 className="text-3xl font-bold text-slate-900">
                      {project.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {getTags(project).map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-full bg-white text-slate-500 border border-slate-200 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.stars > 0 && (
                      <p className="text-sm text-slate-500">
                        ⭐ {project.stars} star{project.stars !== 1 ? 's' : ''}
                      </p>
                    )}

                    <div className="flex items-center gap-4 pt-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-medium hover:bg-primary transition-colors duration-300 shadow-lg hover:shadow-primary/25"
                      >
                        <Github size={18} />
                        <span>Code</span>
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 border border-slate-200 font-medium hover:border-primary/50 hover:text-primary transition-colors duration-300 shadow-sm"
                        >
                          <ExternalLink size={18} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Visual Preview — GitHub OpenGraph card */}
                  <div className="flex-1 w-full order-1 lg:order-2 relative">
                    <div className="relative rounded-3xl shadow-xl aspect-video overflow-hidden bg-slate-900 border-none">
                      {/* Spinning RGB Gradient Border Layer */}
                      <div className="absolute inset-0 overflow-hidden rounded-3xl">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#8b5cf6_25%,#ec4899_50%,#f97316_75%,#eab308_87%,#3b82f6_100%)]" />
                      </div>
                      {/* Content Container — 2px inset creates the thin border */}
                      <div className="absolute inset-[2px] bg-white rounded-[22px] z-10 overflow-hidden">
                        <div className="relative w-full h-full">
                          <img
                            src={`https://opengraph.githubassets.com/1/${project.github.replace('https://github.com/', '')}`}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* View More Button */}
        {!loading && !showAll && projects.length > 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center mt-20"
          >
            <button
              onClick={() => setShowAll(true)}
              className="group flex flex-col items-center gap-3 focus:outline-none"
            >
              <div className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 group-hover:text-primary group-hover:border-primary transition-colors duration-300 animate-bounce bg-white shadow-sm">
                <ArrowUpRight size={20} style={{ transform: 'rotate(135deg)' }} />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                View More Projects ({projects.length - 2} more)
              </span>
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20">
            <FolderGit2 className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
