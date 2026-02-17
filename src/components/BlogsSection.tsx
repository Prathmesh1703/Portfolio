import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, PenTool, Coffee, Loader2, ExternalLink } from 'lucide-react';

import API_BASE_URL from '@/config/api';

interface BlogPost {
    title: string;
    description: string;
    slug: string;
    cover: string | null;
    readTime: number;
    date: string;
    url: string;
}

const BlogsSection = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/blogs`);
                if (!res.ok) throw new Error("API error");
                const data = await res.json();
                setBlogs(data.blogs);

                // Update Cache
                localStorage.setItem("blogs_cache", JSON.stringify(data.blogs));
                localStorage.setItem("blogs_cache_time", Date.now().toString());

                setError(false);
            } catch {
                console.warn("Failed to fetch blogs.");
                const cached = localStorage.getItem("blogs_cache");

                if (!cached) {
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };

        const loadData = () => {
            const cached = localStorage.getItem("blogs_cache");
            const timestamp = localStorage.getItem("blogs_cache_time");
            const now = Date.now();
            const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

            if (cached && timestamp && (now - parseInt(timestamp) < CACHE_DURATION)) {
                // Cache Hit
                setBlogs(JSON.parse(cached));
                setLoading(false);

                // Silent Revalidation
                fetchBlogs();
            } else {
                fetchBlogs();
            }
        };

        // Defer execution
        setTimeout(() => {
            loadData();
        }, 0);
    }, []);

    // Helper to format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <section id="blogs" className="py-24 px-6 relative overflow-hidden flex flex-col items-center justify-center bg-slate-50/30">
            {/* Background Decorative */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10 w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight flex items-center justify-center gap-3">
                        <PenTool className="text-primary hidden sm:block" size={32} />
                        Blogs
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Thoughts on AI architectures, optimization techniques, and the future of software.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        <p className="text-muted-foreground text-sm">Brewing content...</p>
                    </div>
                )}

                {/* Empty State / Coming Soon (if api returns 0 blogs) */}
                {!loading && blogs.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
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
                )}

                {/* Blogs Grid (Use this when blogs exist) */}
                {!loading && blogs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <a href={blog.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
                                    <div className="h-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                        {/* Cover Image */}
                                        <div className="h-48 overflow-hidden relative bg-slate-100">
                                            {blog.cover ? (
                                                <img src={blog.cover} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary/20">
                                                    <BookOpen size={48} />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                                                {formatDate(blog.date)} • {blog.readTime} min read
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                {blog.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                                {blog.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 group-hover:text-primary transition-colors mt-auto">
                                                Read on Hashnode <ExternalLink size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogsSection;
