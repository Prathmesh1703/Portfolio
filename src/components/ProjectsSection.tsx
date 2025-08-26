import React, { useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

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
      title: "DeepAssist - AI-Powered Coding Assistant",
      description: "DeepAssist is a Generative AI chatbot designed to assist developers by solving complex coding problems and providing accurate answers to general programming queries. It utilizes the Deepseek R1 model, integrating advanced Natural Language Processing (NLP) techniques to deliver high-quality coding support.",
      image: "/images/deepAssist.png",
      tags: ["Python", "LangChain", "Deepseek R1", "Stramlit"],
      githubUrl: "https://github.com/Prathmesh1703/DeepAssist",
      // liveUrl: "https://example.com"
    },
    {
      id: 2,
      title: "NyayaBot - AI-Powered Legal Chatbot",
      description: "NyayaBot is an AI-powered chatbot designed to provide quick and accessible legal assistance for users seeking guidance on Indian law. It helps users interpret complex legal queries and offers accurate, real-time responses, reducing the dependency on traditional legal support systems that are often slow and costly.",
      image: "/images/Nyayabot.png",
      tags: ["Python", "LangChain", "Flask API", "Sckit-learn"],
      githubUrl: "https://github.com/Prathmesh1703/NyayaBot"
    },
    {
      id: 3,
      title: "Predictive Analytics Dashboard",
      description: "Created a machine learning pipeline for sales forecasting using ensemble methods and deployed with interactive Streamlit dashboard.",
      image: "/images/Finance_Manager.png",
      tags: ["React", "MongoDB", "React Routes"],
      githubUrl: "https://github.com/Prathmesh1703/Finance_Manager_P4"
    },
    {
      id: 4,
      title: "Descriptive Aanalytics Dashboard",
      description: "Developed a comprehensive dashboard for visualizing and analyzing sales data, enabling businesses to make informed decisions based on historical trends.",
      image: "/images/Dashboard.png",
      tags: ["PowerBI", "Data Visualization", "Business Intelligence"],
      githubUrl: "#"
    },
    {
      id: 5,
      title: "Movie Recommendation System",
      description: "Build a Movie recommendation system using collaborative filtering and content-based filtering techniques to suggest movies based on user preferences.",
      image: "#",
      tags: ["Python", "Scikit-learn", "Pandas", "NumPy"],
      githubUrl: "https://github.com/Prathmesh1703/Movie-Recommendation-System"
    },
    {
      id: 6,
      title: "Sentiment Ananlysis of Zomato Reviews",
      description: "Analyzed the sentiment of Zomato reviews using NLP techniques and python libraries.",
      image: "#",
      tags: ["Python", "Pandas", "Scikit-learn"],
      githubUrl: "https://github.com/Prathmesh1703/Zomato_Restaurant_Clustering-_sentiment_analysis"
    }
  ];

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(
    currentIndex * projectsPerPage,
    (currentIndex + 1) * projectsPerPage
  );

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="projects" className="py-5 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-white">Projects</h2>
          
          {totalPages > 1 && (
            <div className="flex space-x-2">
              <button
                onClick={prevPage}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-[#3FA7D6]/20 hover:border-[#3FA7D6] transition-all duration-300 hover:scale-105"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextPage}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-[#3FA7D6]/20 hover:border-[#3FA7D6] transition-all duration-300 hover:scale-105"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {currentProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-black/40 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-[#3FA7D6]/20 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-3 leading-relaxed text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-[#3FA7D6]/20 text-[#3FA7D6] border border-[#3FA7D6]/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-primary transition-colors flex items-center space-x-1"
                  >
                    <SiGithub size={24} />
                    <span className="text-sm">Code</span>
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-primary transition-colors flex items-center space-x-1"
                    >
                      <ExternalLink size={24} />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-[#3FA7D6] shadow-lg'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
