# 🚀 AI/ML Engineer Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-brightgreen?style=for-the-badge&logo=vercel)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.13-38B2AC?style=for-the-badge&logo=tailwind-css)

*A modern, interactive portfolio showcasing AI/ML expertise with glassmorphic design*

[🌐 Live Demo](https://github.com/Prathmesh1703/Portfolio) • [📧 Contact](mailto:prathameshpb2004@gmail.com) • [💼 LinkedIn](https://www.linkedin.com/in/prathamesh-bharsakale-bb3452257/)

</div>

---

## ✨ Features

### 🎨 **Modern Design**
- **Glassmorphic UI** with backdrop blur effects
- **Dark theme** with cyan and pink accents
- **Responsive design** optimized for all devices
- **Smooth animations** and micro-interactions

### 🧭 **Interactive Navigation**
- **Floating navbar** with section detection
- **Smooth scrolling** between sections
- **Resume integration** with PDF viewer
- **Social media links** with hover effects

### 💼 **Portfolio Showcase**
- **Project carousel** with 8+ AI/ML projects
- **Technology tags** with color coding
- **Live demo links** and GitHub repositories
- **Detailed project descriptions**

### 📬 **Contact & Feedback System**
- **Working contact form** with email notifications
- **Interactive feedback button** (appears on scroll)
- **MongoDB integration** for data persistence
- **Form validation** and loading states

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Nodemailer** - Email sending service

### **Deployment**
- **Frontend**: Netlify/Vercel
- **Backend**: Railway/Heroku
- **Database**: MongoDB Atlas

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

### **Installation**

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### **Environment Setup**

Create `server/.env`:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/portfolio-feedback
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Server
PORT=5000
NODE_ENV=development

# Email Configuration (Gmail recommended)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com
```

### **Development**

```bash
# Start both frontend and backend
npm run dev:full

# Or start separately
npm run dev          # Frontend only
npm run server:dev   # Backend only
```

Visit `http://localhost:5173` to see your portfolio!

---

## 📁 Project Structure

```
portfolio/
├── 📂 src/
│   ├── 📂 components/
│   │   ├── 📂 ui/              # shadcn/ui components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── HeroSection.tsx     # Landing section
│   │   ├── ProjectsSection.tsx # Portfolio showcase
│   │   ├── AboutSection.tsx    # About & skills
│   │   ├── ContactSection.tsx  # Contact form
│   │   ├── FloatingNavbar.tsx  # Bottom navigation
│   │   └── FeedbackButton.tsx  # Feedback modal
│   ├── 📂 hooks/               # Custom React hooks
│   ├── 📂 lib/                 # Utility functions
│   ├── App.tsx                 # Main application
│   └── index.css               # Global styles
├── 📂 server/
│   ├── index.js                # Express server
│   ├── package.json            # Backend dependencies
│   └── .env.example            # Environment template
├── 📂 public/
│   ├── 📂 images/              # Static images
│   └── resume.pdf              # Your resume
└── package.json                # Frontend dependencies
```

---

## 🎨 Customization

### **Personal Information**
Update your details in:
- `src/components/HeroSection.tsx` - Name, title, social links
- `src/components/AboutSection.tsx` - Bio, skills, education
- `src/components/ContactSection.tsx` - Contact information

### **Projects**
Edit the projects array in `src/components/ProjectsSection.tsx`:
```typescript
const projects = [
  {
    title: "Your Project Name",
    description: "Project description...",
    image: "https://your-image-url.com",
    tags: ["Python", "TensorFlow", "React"],
    github: "https://github.com/yourusername/project",
    live: "https://your-demo-url.com"
  }
];
```

### **Styling**
Customize colors in `src/index.css`:
```css
:root {
  --primary: #3FA7D6;      /* Your brand color */
  --secondary: #E846AB;    /* Accent color */
  --background: #121212;   /* Background */
}
```

---

## 📧 Contact Form Setup

### **Option 1: Backend Integration (Current)**
The contact form uses your Express backend with email notifications.

**Gmail Setup:**
1. Enable 2-Factor Authentication
2. Generate App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Use App Password in `EMAIL_PASS`

### **Option 2: Netlify Forms (Alternative)**
For static deployment without backend:

1. Add `netlify` attribute to form:
```html
<form netlify name="contact" method="POST">
```

2. Add hidden input:
```html
<input type="hidden" name="form-name" value="contact" />
```

3. Deploy to Netlify - forms will be automatically handled!

---

## 🚀 Deployment

### **Frontend (Netlify)**
```bash
# Build the project
npm run build

# Deploy to Netlify
# Drag & drop the 'dist' folder to Netlify
```

## 📊 Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| 🎨 Responsive Design | ✅ | Mobile-first, all screen sizes |
| 🧭 Smooth Navigation | ✅ | Floating navbar with section detection |
| 💼 Project Showcase | ✅ | Interactive carousel with 8+ projects |
| 📬 Contact Form | ✅ | Email notifications + MongoDB storage |
| 💭 Feedback System | ✅ | Modal popup with database integration |
| 📄 Resume Integration | ✅ | PDF viewer/download functionality |
| 🔍 SEO Optimized | ✅ | Meta tags, semantic HTML |
| ⚡ Performance | ✅ | Optimized images, lazy loading |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Design Inspiration**: Modern glassmorphic design trends, IOS 26
- **Icons**: [Lucide React](https://lucide.dev)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ by [Prathamesh Bharsakale](https://github.com/Prathmesh1703)

[🌐 Portfolio]((https://github.com/Prathmesh1703/Portfolio)) • [📧 Email](mailto:prathameshpb2004@gmail.com) • [💼 LinkedIn](https://www.linkedin.com/in/prathamesh-bharsakale-bb3452257/)

</div>
