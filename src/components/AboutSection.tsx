
import { Award, Code2, Trophy, Brain, Crown, University } from 'lucide-react';

const AboutSection = () => {

  //To Be Updated with Actual Data
  const stats = [
    { label: "Tech Tools Mastered", value: "20+", icon: <Award size={24} /> },
    { label: "Industry Internships", value: "2", icon: <Code2 size={24} /> },
    { label: "Tech Participants Led", value: "150+", icon: <Brain size={24} /> },
    { label: "Hackathons Participated", value: "5+", icon: <Crown size={24} /> },
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
    "Programming Languages": [
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
    ],
    "AI/ML Frameworks": [
      { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "Scikit-learn", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
      { name: "Keras", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg" },
      { name: "Hugging Face", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" }
    ],
    "Data & Analytics": [
      { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
      { name: "Matplotlib", logo: "https://matplotlib.org/stable/_images/sphx_glr_logos2_003.png" },
      { name: "Plotly", logo: "https://images.plot.ly/logo/new-branding/plotly-logomark.png" },
      { name: "PowerBI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" }
    ],
    "Cloud Platforms": [
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/aws-light.svg" },
      { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    ],
    "Databases": [
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
    ],
    "Tools & Others": [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Ollama", logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/ollama-dark.svg" },
      { name: "Jupyter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
      { name: "Streamlit", logo: "https://streamlit.io/images/brand/streamlit-mark-color.svg" },
      { name: "Flask API", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg" }
    ]
  };

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Image & Description */}
          <div className="space-y-8">
            <div className="relative">
              <img
                src="images\Photo_Square.png"
                alt="About Prathamesh"
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#3FA7D6]/10 to-transparent"></div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <p className="text-white leading-relaxed mb-6">
                Passionate AI/ML Engineer developing intelligent systems that enhance human productivity and solve domain-specific challenges.
                My expertise spans natural language processing, generative AI, and full-stack deployment - turning cutting-edge research into real-world applications.
              </p>
              <p className="text-white leading-relaxed">
                When not architecting models, you'll find me competing in national hackathons, mentoring peers in data science workshops, or exploring the frontiers of transformer architectures and LangChain implementations.
              </p>
            </div>
          </div>

          {/* Right Column - Stats & Cards */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-[#3FA7D6]/20"
                >
                  <div className="flex justify-center mb-3 text-[#3FA7D6]">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <University className="text-[#3FA7D6] mr-3" size={24} />
                <h3 className="text-xl font-semibold text-white">Education</h3>
              </div>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-[#3FA7D6]/30 pl-4">
                    <div className="text-lg font-semibold text-white">{edu.degree}</div>
                    <div className="text-[#3FA7D6]">{edu.school}</div>
                    <div className="text-sm text-gray-400">{edu.year} • {edu.specialization}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Highlights */}
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <Trophy className="text-[#E846AB] mr-3" size={24} />
                <h3 className="text-xl font-semibold text-white">Key Highlights</h3>
              </div>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-[#E846AB] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-300">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <Award className="text-[#3FA7D6] mr-3" size={28} />
            <h3 className="text-2xl font-semibold text-white">Certifications</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <ul className="space-y-3">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-[#3FA7D6] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center mb-8">
            <Code2 className="text-[#3FA7D6] mr-3" size={28} />
            <h3 className="text-2xl font-semibold text-white">Skills & Technologies</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div key={index} className="bg-black/20 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:border-[#3FA7D6]/50 transition-all duration-300 min-h-[280px]">
                <h4 className="text-lg font-semibold text-white mb-6 text-center">{category}</h4>
                <div className="grid grid-cols-3 gap-3">
                  {skillList.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="group relative aspect-square rounded-xl bg-white/10 border border-white/15 hover:border-[#3FA7D6]/50 hover:shadow-lg hover:shadow-[#3FA7D6]/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer overflow-hidden"
                    >
                      <div 
                        className="absolute inset-0 bg-center bg-contain bg-no-repeat opacity-50 group-hover:opacity-30 transition-opacity duration-300"
                        style={{ backgroundImage: `url(${skill.logo})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300" />
                      <div className="relative h-full flex items-end justify-center p-2">
                        <span className="text-xs font-medium text-white text-center leading-tight group-hover:text-[#3FA7D6] transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
