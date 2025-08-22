
import Header from './components/Header';
import { HeroSection } from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FloatingNavbar } from './components/FloatingNavbar';
import FeedbackButton  from './components/FeedbackButton';

function App() {
  return (
    <div className="min-h-screen bg-background text-white relative">
      {/* Subtle floor-tile pattern background */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      <Header />
      
      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      
      <FloatingNavbar />
      <FeedbackButton />
      
      {/* Footer */}
     <footer className="py-8 border-t border-white/10 mt-20 bg-background/20 backdrop-blur-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
    <p className="text-text-secondary">
      © 2025 Prathamesh Bharsakale. Built with lots of ☕.
    </p>
  </div>
</footer>

    </div>
  );
}

export default App;