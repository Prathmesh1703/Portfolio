import React, { useState } from 'react';
import { Card } from './ui/card-custom';
// import { Button } from './ui/button-custom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      // success UI
      alert(data.message || "Message sent!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      alert(data.error || "Failed to send message.");
    }
  } catch (err) {
    console.error("Send error:", err);
    alert("Network error. Please try again later.");
  }
};



  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Ready to collaborate on your next AI project? Let's discuss how we can work together.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <Card>
            <h3 className="text-xl font-semibold text-white mb-6">Send me a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-background/50 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:border-primary focus:outline-none focus:bg-background/70 transition-all duration-200"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-background/50 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:border-primary focus:outline-none focus:bg-background/70 transition-all duration-200"
                  />
                </div>
              </div>
              
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full bg-background/50 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:border-primary focus:outline-none focus:bg-background/70 transition-all duration-200"
              />
              
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full bg-background/50 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:border-primary focus:outline-none focus:bg-background/70 transition-all duration-200 resize-none"
              ></textarea>
              
             <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-[#3FA7D6] text-black font-semibold rounded-xl hover:bg-[#3FA7D6]/80 transition-all duration-300 hover:scale-105"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>

            </form>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <p className="text-text-secondary">prathameshpb2004@gmail.com</p>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <p className="text-text-secondary">+91 9325405034</p>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className="text-text-secondary">Pune, Maharashtra, India</p>
                </div>
              </div>
            </Card>
            
            <Card>
              <h4 className="font-semibold text-white mb-4">Let's build something amazing together!</h4>
              <p className="text-text-secondary">
                I'm always open to discussing new opportunities, interesting projects, 
                or just chatting about the latest in AI and machine learning.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}