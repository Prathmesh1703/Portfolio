import  { useState, useEffect } from 'react';
import { Home, User, FolderOpen, Mail, FileText } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'about', label: 'About', icon: User },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'resume', label: 'Resume', icon: FileText },
];

export function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'resume') {
      // Option 1: Open resume in new tab (replace with your resume URL)
      window.open('/images/Prathmesh_Bharsakle_Resume.pdf', '_blank');
      
      // Option 2: Download resume directly
      // const link = document.createElement('a');
      // link.href = '/resume.pdf';
      // link.download = 'Prathamesh_Bharsakale_Resume.pdf';
      // link.click();
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-surface/40 backdrop-blur-sm border border-white/20 rounded-full px-3 py-2 shadow-lg">
        <div className="flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <div key={item.id} className="relative">
                {/* Hover tooltip */}
                {hoveredItem === item.id && (
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-surface/90 backdrop-blur-md border border-white/20 rounded-lg px-2 py-1 shadow-lg">
                    <span className="text-xs font-medium text-white whitespace-nowrap">{item.label}</span>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20"></div>
                  </div>
                )}
                
                <button
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-500 text-white shadow-lg scale-110' 
                      : 'text-text-secondary hover:text-white hover:scale-105 hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}