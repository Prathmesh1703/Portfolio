
import { Github, Linkedin, Twitter } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-text-secondary text-lg font-medium">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                PRATHAMESH
                <br />
                <span className="text-primary">BHARSAKALE</span>
              </h1>
              <p className="text-text-secondary text-lg font-medium">Building Smarter Systems with AI & ML</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="https://github.com/Prathmesh1703" className="text-text-secondary hover:text-primary transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/prathamesh-bharsakale-bb3452257/" className="text-text-secondary hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://x.com/prathmesh3000" className="text-text-secondary hover:text-primary transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="relative flex justify-center">
              <div className="relative z-10">
                <img
                  src="/images/Image_NoBackground.png"
                  alt="Prathamesh Bharsakale"
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                />
              </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl transform scale-105"></div>
          </div>

  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl transform scale-105"></div>
</div>

        </div>
      </div>
    </section>
  );
}