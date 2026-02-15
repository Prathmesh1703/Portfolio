
import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
}

const ProjectsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const projectsPerPage = 4;

  const projects: Project[] = [
    {
      id: 1,
      title: "DeepAssist - AI Coder",
      description: "Generative AI chatbot utilizing Deepseek R1 to assist developers with complex coding problems and general programming queries.",
      image: "/images/deepAssist.png",
      tags: ["Python", "LangChain", "Deepseek R1", "Streamlit"],
      githubUrl: "https://github.com/Prathmesh1703/DeepAssist",
    },
    {
      id: 2,
      title: "NyayaBot - Legal AI",
      description: "AI-powered chatbot providing accessible legal assistance for Indian law, interpreting complex queries with real-time responses.",
      image: "/images/Nyayabot.png",
      tags: ["Python", "Flask", "NLP", "Scikit-learn"],
      githubUrl: "https://github.com/Prathmesh1703/NyayaBot"
    },
    {
      id: 3,
      title: "Predictive Analytics Dashboard",
      description: "End-to-end ML pipeline for sales forecasting using ensemble methods, deployed with an interactive Streamlit dashboard.",
      image: "/images/Finance_Manager.png",
      tags: ["React", "MongoDB", "ML", "Streamlit"],
      githubUrl: "https://github.com/Prathmesh1703/Finance_Manager_P4"
    },
    {
      id: 4,
      title: "Descriptive Analytics",
      description: "Comprehensive dashboard for visualizing sales data and historical trends to enable data-driven business decisions.",
      image: "/images/Dashboard.png",
      tags: ["PowerBI", "Data Viz", "Business Intelligence"],
      githubUrl: "#"
    },
    {
      id: 5,
      title: "Movie Recommender",
      description: "Hybrid recommendation system using collaborative and content-based filtering to suggest personalized movies.",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
      tags: ["Python", "Scikit-learn", "Pandas", "NumPy"],
      githubUrl: "https://github.com/Prathmesh1703/Movie-Recommendation-System"
    },
    {
      id: 6,
      title: "Zomato Sentiment Analysis",
      description: "NLP-based sentiment analysis of restaurant reviews to extract insights and cluster user feedback.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
      tags: ["Python", "NLP", "Pandas"],
      githubUrl: "https://github.com/Prathmesh1703/Zomato_Restaurant_Clustering-_sentiment_analysis"
    }
  ];

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(
    currentIndex * projectsPerPage,
    (currentIndex + 1) * projectsPerPage
  );

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden bg-slate-50/50">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground tracking-tight flex items-center gap-3">
              <FolderGit2 className="text-primary hidden md:block" size={40} />
              Featured Creations
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              A showcase of intelligent systems and scalable applications.
            </p>
          </div>

          {totalPages > 1 && (
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === currentIndex ? "bg-primary w-12" : "bg-slate-200 w-2 hover:bg-slate-300"
                  )}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode='wait'>
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-[2rem] overflow-hidden bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500 flex flex-col h-full"
              >
                {/* Image Area */}
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-500" />

                  {/* Overlay Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-white/90 backdrop-blur text-slate-900 hover:bg-primary hover:text-white transition-colors shadow-lg"
                    >
                      <Github size={18} />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-white/90 backdrop-blur text-slate-900 hover:bg-primary hover:text-white transition-colors shadow-lg"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>

                  <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed text-sm flex-grow font-light">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-md bg-slate-50 text-slate-500 border border-slate-200 group-hover:border-primary/20 group-hover:text-primary/80 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
