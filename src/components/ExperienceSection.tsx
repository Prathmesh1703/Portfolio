
import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const experiences = [
    {
        role: "AI/Python Developer Intern",
        company: "Dexpert Systems Pvt. Ltd.",
        duration: "Internship",
        description: [
            "Built full-stack features for a production platform, including real-time interactions, access control, and dynamic dashboards. Boosted system reliability and UX by resolving critical bugs, ensuring UI consistency, and synchronizing data across the stack. Performed cross-functional testing across user roles to identify gaps and deliver features on time."
        ]
    },
    {
        role: "Full Stack Dev Intern",
        company: "FitFare",
        duration: "Internship",
        description: [
            "Developed and enhanced AI-powered chatbot features using NLP, memory-based context handling, and personalized logic, improving response relevance and user engagement. Implemented intelligent workflow automation and dynamic query routing, reducing manual support effort and improving system efficiency."
        ]
    },
    {
        role: "MERN Intern",
        company: "EYGDS",
        duration: "Internship",
        description: [
            "Built responsive React components and optimized form workflows, improving usability and streamlining day-to-day financial operations. Strengthened backend reliability by refactoring Express APIs and optimizing database interactions, leading to faster responses and improved stability."
        ]
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
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Experience</h2>
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
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
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

                                        <ul className="space-y-3 mb-2">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="text-muted-foreground leading-relaxed text-sm font-light flex gap-3 items-start">
                                                    <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-secondary/60 flex-shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
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
