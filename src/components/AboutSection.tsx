
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Code2, Trophy, Brain, University, Layout, Database, Cloud, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';


const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'education' | 'skills' | 'achievements' | 'certifications'>('about');



  const education = [
    {
      institution: "Trinity Academy of Engineering, Pune",
      affiliation: "Savitribai Phule Pune University",
      logo: "/images/trinity-logo.png", // specific logo path or just a placeholder icon if no image
      degrees: [
        {
          degree: "B.E. in Information Technology",
          year: "2022-2026",
          grade: "SGPA: 8.6" // Placeholder value
        },
        {
          degree: "Honors in AI/ML",
          year: "2024-2026",
          //grade: "CGPA: 8.5" // Placeholder value
        }
      ]
    },
    {
      institution: "Maloo International School and JR. college",
      affiliation: "HSC Board",
      logo: "/images/maloo.webp",
      degrees: [
        {
          degree: "Higher Secondary Certificate (HSC)",
          year: "2020-2022",
          grade: "Grade: 75%" // Placeholder value
        }
      ]
    },
    {
      institution: "Vasundhara Dnyanpeeth Akot",
      affiliation: "SSC Board",
      logo: "/images/vasundhara.png",
      degrees: [
        {
          degree: "Secondary School Certificate (SSC)",
          year: "2020",
          grade: "Grade: 77%" // Placeholder value
        }
      ]
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
    "Programming Languages": [
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
    ],
    "Web & Frontend": [
      { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }
    ],
    "AI / Machine Learning": [
      { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "Scikit-learn", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
      { name: "Keras", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg" },
      { name: "Hugging Face", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
      { name: "NLP", logo: "https://cdn-icons-png.flaticon.com/512/3670/3670147.png" },
      { name: "LangChain", logo: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" }
    ],
    "Data & Visualization": [
      { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
      { name: "Matplotlib", logo: "https://matplotlib.org/stable/_images/sphx_glr_logos2_003.png" },
      { name: "Seaborn", logo: "https://seaborn.pydata.org/_static/logo-mark-lightbg.svg" },
      { name: "Plotly", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/plotly/plotly-original.svg" },
      { name: "PowerBI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
      { name: "Tableau", logo: "https://img.icons8.com/?size=100&id=9Kvi1p1F0tUo&format=png&color=000000" }
    ],
    "Cloud & MLOps": [
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "GCP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" }
    ],
    "Databases & Backend Tools": [
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Streamlit", logo: "https://streamlit.io/images/brand/streamlit-mark-color.svg" }
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
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
            Beyond the Code
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            I bridge the gap between complex algorithms and real-world applications, transforming data into actionable intelligence.
          </p>

          {/* Tab Navigation */}
          <div className="inline-flex p-1.5 rounded-full bg-slate-100/50 border border-white/20 backdrop-blur-md shadow-sm overflow-x-auto max-w-full">
            {(['about', 'education', 'skills', 'achievements', 'certifications'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative z-10 whitespace-nowrap",
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode='wait'>
            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-12 items-center"
              >
                {/* Left Column - Image */}
                <div className="lg:col-span-5">
                  <div className="glass-panel p-2 rounded-[2rem] shadow-xl shadow-slate-200/50">
                    <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/5]">
                      <img
                        src="/images/About_photo.jpeg"
                        alt="About Prathamesh"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Right Column - Story */}
                <div className="lg:col-span-7">
                  <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group border border-white/60">
                    <div className="space-y-4 text-muted-foreground leading-relaxed text-lg font-light">
                      <p>
                        I’m an AI/ML Engineer and MERN Stack Developer pursuing a B.E. in Information Technology with Honors in AI/ML. My work centers on building intelligent systems, NLP pipelines, and full-stack applications that scale in real environments. I’ve competed in 5+ hackathons, led student tech communities, and completed internships where I developed production-ready ML models and backend systems using cloud services.
                      </p>
                      <p>
                        I hold certifications in Machine Learning, AWS Generative AI, and Agile practices, and I actively mentor peers through workshops. My stack includes Python, JavaScript, TensorFlow, PyTorch, React, Node.js, Docker, and MongoDB. I focus on clean architecture, performance, and bridging the gap between research and real product deployment.
                      </p>
                      <p>
                        I also write technical blogs and frequently update my projects dynamically so that my portfolio showcases my most current work.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto"
              >
                <div className="glass-panel p-8 rounded-3xl border border-white/60">
                  <div className="space-y-12">
                    {education.map((edu, index) => (
                      <div key={index} className="relative">
                        {/* Institution Header */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-100 p-2 overflow-hidden">
                            {edu.logo ? (
                              <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain" />
                            ) : (
                              <University className="text-primary" size={24} />
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-800">{edu.institution}</h3>
                            <p className="text-sm text-muted-foreground">{edu.affiliation}</p>
                          </div>
                        </div>

                        {/* Degrees List */}
                        <div className="space-y-6 pl-6 border-l-2 border-slate-100 ml-6">
                          {edu.degrees.map((degree, dIndex) => (
                            <div key={dIndex} className="relative pl-8">
                              <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-primary shadow-sm" />
                              <div>
                                <h4 className="text-lg font-semibold text-slate-800">{degree.degree}</h4>
                                <div className="flex items-center gap-4 mt-1 text-sm">
                                  <span className="text-primary font-medium">{degree.year}</span>
                                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                                  <span className="text-muted-foreground">{degree.grade}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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
                  {Object.entries(skills).map(([category, skillList], index) => {
                    const isAI = category === "AI / Machine Learning";
                    return (
                      <div
                        key={index}
                        className={cn(
                          "glass-panel p-8 rounded-3xl border transition-all duration-300",
                          isAI ? "border-primary/40 shadow-lg shadow-primary/5" : "border-white/60 hover:shadow-xl hover:shadow-primary/5"
                        )}
                      >
                        <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                          {category === "Programming Languages" && <Code2 size={20} className="text-primary" />}
                          {category === "Web & Frontend" && <Layout size={20} className="text-primary" />}
                          {category === "AI / Machine Learning" && <Brain size={20} className="text-primary" />}
                          {category === "Data & Visualization" && <BarChart size={20} className="text-primary" />}
                          {category === "Cloud & MLOps" && <Cloud size={20} className="text-primary" />}
                          {category === "Databases & Backend Tools" && <Database size={20} className="text-primary" />}
                          {category}
                        </h4>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                          {skillList.map((skill, skillIndex) => (
                            <div
                              key={skillIndex}
                              className="group flex flex-col items-center gap-3 relative hover:z-20"
                              title={skill.name}
                            >
                              <div className="w-12 h-12 p-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 flex items-center justify-center overflow-hidden">
                                <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                              </div>
                              <span className="text-[11px] font-medium text-slate-500 group-hover:text-primary transition-colors text-center absolute -bottom-6 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                {skill.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto"
              >
                <div className="glass-panel p-8 rounded-3xl border border-white/60">
                  <ul className="grid sm:grid-cols-1 gap-4">
                    {achievements.map((item, index) => (
                      <li key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                        <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
                          <Trophy size={20} />
                        </div>
                        <span className="text-slate-700 font-medium text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
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
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
