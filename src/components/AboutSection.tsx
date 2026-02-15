
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Code2, Trophy, Brain, Crown, University, Sparkles, Cpu, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'certifications'>('about');

  const stats = [
    { label: "Tech Tools Mastered", value: "20+", icon: Award },
    { label: "Industry Internships", value: "2", icon: Code2 },
    { label: "Tech Participants Led", value: "150+", icon: Brain },
    { label: "Hackathons Participated", value: "5+", icon: Crown },
  ];

  const education = [
    {
      degree: "B.E. Information Technology",
      school: "Savitribai Phule Pune University",
      year: "2022-2026",
      specialization: "Software Engineering & Data Science"
    },
    {
      degree: "Honors in AI/ML",
      school: "Savitribai Phule Pune University",
      year: "2024-2026",
      specialization: "Artificial Intelligence and Machine Learning"
    }
  ];

  const achievements = [
    "Data Science Club Coordinator - ITSA-TAE(2024-2025)",
    "Event Lead - State Level Hackathon 2024",
    "Winner - Internal Smart India Hackathon 2023 & 2024",
    "Zonal Achiever - Avishkar 2024",
  ];

  const certifications = [
    "Professional Certificate in Machine Learning - IBM (2025)",
    "C++ and Php Programming - Udemy (2025)",
    "Agile Project Management - HP Life (2025)",
    "Generative AI with Diffusion Models - AWS (2025)"
  ];

  const skills = {
    "Languages": [
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
    ],
    "AI/ML": [
      { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "Scikit-learn", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
      { name: "Keras", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg" },
      { name: "Hugging Face", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" }
    ],
    "Data": [
      { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
      { name: "Matplotlib", logo: "https://matplotlib.org/stable/_images/sphx_glr_logos2_003.png" },
      { name: "Plotly", logo: "https://images.plot.ly/logo/new-branding/plotly-logomark.png" },
      { name: "PowerBI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" }
    ],
    "Cloud & Tools": [
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/aws-light.svg" },
      { name: "GCP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Streamlit", logo: "https://streamlit.io/images/brand/streamlit-mark-color.svg" },
    ]
  };

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden flex flex-col justify-center">
      <div className="max-w-7xl mx-auto relative z-10 w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
            Beyond the Code
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            I bridge the gap between complex algorithms and real-world applications, transforming data into actionable intelligence.
          </p>

          {/* Tab Navigation */}
          <div className="inline-flex p-1.5 rounded-full bg-slate-100/50 border border-white/20 backdrop-blur-md shadow-sm">
            {(['about', 'skills', 'certifications'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative z-10",
                  activeTab === tab
                    ? "text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/40"
                )}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-full shadow-md border border-slate-100"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className={cn("relative z-10 mix-blend-multiply", activeTab === tab ? "font-semibold text-primary" : "")}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode='wait'>
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-12 gap-12"
            >
              {/* Left Column - Image & Story */}
              <div className="lg:col-span-5 space-y-8">
                <div className="glass-panel p-2 rounded-[2rem] shadow-xl shadow-slate-200/50">
                  <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/5]">
                    <img
                      src="/images/Photo_Square.png"
                      alt="About Prathamesh"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white text-sm font-light italic opacity-90">
                      "Driven by curiosity, powered by logic."
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group border border-white/60">
                  <p className="text-muted-foreground leading-relaxed text-lg font-light">
                    Passionate <span className="text-primary font-medium">AI/ML Engineer</span> focused on building intelligent systems.
                    From deploying <span className="text-foreground font-medium">Generative AI</span> models to architecting <span className="text-foreground font-medium">scalable full-stack apps</span>,
                    I thrive on solving complex problems with elegant code.
                  </p>
                </div>
              </div>

              {/* Right Column - Stats & Details */}
              <div className="lg:col-span-7 space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card p-6 rounded-2xl text-center flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform"
                    >
                      <div className="p-3 rounded-full bg-primary/5 text-primary">
                        <stat.icon size={22} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
                        <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Education Timeline */}
                <div className="glass-panel p-8 rounded-3xl border border-white/60">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 rounded-lg bg-blue-50 text-primary"><University size={24} /></div>
                    <h3 className="text-xl font-bold text-slate-800">Education</h3>
                  </div>

                  <div className="space-y-8">
                    {education.map((edu, index) => (
                      <div key={index} className="relative pl-8 border-l-2 border-slate-100 last:border-0 last:pb-0">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-primary shadow-sm" />
                        <div className="relative -top-1.5">
                          <h4 className="text-lg font-semibold text-slate-800">{edu.degree}</h4>
                          <p className="text-primary font-medium text-sm mb-1">{edu.school}</p>
                          <p className="text-sm text-muted-foreground">{edu.year} • {edu.specialization}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="glass-panel p-8 rounded-3xl border border-white/60">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-amber-50 text-amber-500"><Trophy size={24} /></div>
                    <h3 className="text-xl font-bold text-slate-800">Highlights</h3>
                  </div>
                  <ul className="grid sm:grid-cols-1 gap-4">
                    {achievements.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                        <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        <span className="text-slate-600 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className=""
            >
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(skills).map(([category, skillList], index) => (
                  <div key={index} className="glass-panel p-8 rounded-3xl border border-white/60 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                    <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                      {index === 0 && <Code2 size={20} className="text-primary" />}
                      {index === 1 && <Brain size={20} className="text-primary" />}
                      {index === 2 && <Layers size={20} className="text-primary" />}
                      {index === 3 && <Cpu size={20} className="text-primary" />}
                      {category}
                    </h4>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                      {skillList.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="group flex flex-col items-center gap-3 relative"
                          title={skill.name}
                        >
                          <div className="w-12 h-12 p-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 flex items-center justify-center">
                            <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                          </div>
                          <span className="text-[11px] font-medium text-slate-500 group-hover:text-primary transition-colors text-center absolute -bottom-6 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'certifications' && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="glass-panel p-6 rounded-2xl flex items-start gap-4 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group cursor-default">
                    <div className="p-3 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Award size={24} />
                    </div>
                    <div>
                      <h4 className="text-md font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">{cert.split(" - ")[0]}</h4>
                      <p className="text-sm text-muted-foreground">{cert.split(" - ")[1] || "Credible Authority"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AboutSection;
