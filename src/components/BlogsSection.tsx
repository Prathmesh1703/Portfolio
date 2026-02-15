
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, PenTool, Coffee } from 'lucide-react';

const BlogsSection = () => {
    return (
        <section id="blogs" className="py-24 px-6 relative overflow-hidden flex flex-col items-center justify-center bg-slate-50/30">
            {/* Background Decorative */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight flex items-center justify-center gap-3">
                        <PenTool className="text-primary hidden sm:block" size={32} />
                        Technical Musings
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Thoughts on AI architectures, optimization techniques, and the future of software.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Floating Icons Background */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-12 -left-4 text-primary/20"><BookOpen size={64} /></motion.div>
                        <motion.div animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -bottom-8 -right-8 text-secondary/20"><Sparkles size={56} /></motion.div>
                    </div>

                    <div className="glass-panel p-12 md:p-16 rounded-[2.5rem] border border-white/60 shadow-xl shadow-slate-200/50 backdrop-blur-xl relative overflow-hidden max-w-2xl mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-white/10 pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 mb-8 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 flex items-center justify-center shadow-inner border border-white/50">
                                <Coffee className="text-primary/80" size={40} />
                            </div>

                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Brewing Fresh Content</h3>
                            <p className="text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto font-light">
                                I'm deeply researching and drafting articles on <span className="font-medium text-foreground">Large Language Models</span> and <span className="font-medium text-foreground">System Design</span>.
                                <br />Good things take time.
                            </p>

                            <button className="group relative px-8 py-3 rounded-full bg-slate-900 text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                                <span className="relative z-10 flex items-center gap-2">
                                    Notify Me
                                    <Sparkles size={16} className="text-yellow-400 group-hover:spin-slow" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogsSection;
