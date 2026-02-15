
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const experiences = [
    {
        role: "Data Science Club Coordinator",
        company: "ITSA-TAE",
        duration: "2024 - 2025",
        location: "Pune, India",
        description: "Leading a vibrant community of 150+ students, orchestrating technical workshops, and fostering a culture of innovation in Data Science and AI.",
        tags: ["Leadership", "Community Building", "Data Science", "Event Management"]
    },
    {
        role: "Event Lead",
        company: "State Level Hackathon 2024",
        duration: "2024",
        location: "Pune, India",
        description: "Directed a major state-level hackathon with over 500+ participants. Managed logistics, secured sponsorships, and oversaw technical execution ensuring a seamless event.",
        tags: ["Event Management", "Technical Leadership", "Logistics"]
    },
    {
        role: "Software Engineering Intern",
        company: "Tech Company",
        duration: "2023",
        location: "Remote",
        description: "Contributed to backend architecture using Node.js and MongoDB. Optimized API response times by 20% and implemented robust error handling mechanisms.",
        tags: ["Node.js", "MongoDB", "Backend Architecture", "API Optimization"]
    }
];

const ExperienceSection = () => {
    return (
        <section id="experience" className="py-24 px-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Professional Voyage</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        My journey through leadership, development, and innovation.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Center Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent md:-translate-x-1/2" />

                    <div className="space-y-16">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className={cn(
                                    "relative flex flex-col md:flex-row gap-8 md:gap-16",
                                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                                )}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[11px] md:left-1/2 top-0 w-[18px] h-[18px] rounded-full bg-white border-[4px] border-secondary shadow-sm md:-translate-x-1/2 z-20" />

                                {/* Content Card */}
                                <div className="flex-1 ml-12 md:ml-0">
                                    <div className={cn(
                                        "glass-panel p-8 rounded-3xl relative group border border-white/60 transition-all duration-300",
                                        "hover:border-secondary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/5"
                                    )}>
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-secondary transition-colors">{exp.role}</h3>
                                                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                                    <Building2 className="w-4 h-4 text-secondary/70" />
                                                    <span>{exp.company}</span>
                                                </div>
                                            </div>
                                            <span className="self-start text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20 whitespace-nowrap">
                                                {exp.duration}
                                            </span>
                                        </div>

                                        <p className="text-muted-foreground leading-relaxed text-sm mb-6 font-light">
                                            {exp.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                                            {exp.tags.map((tag, i) => (
                                                <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-200 hover:bg-white hover:border-secondary/30 transition-colors">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Spacer for alternate side (Desktop only) */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
