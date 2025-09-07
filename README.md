# 🌟 NextStep AI  

NextStep AI is an **AI-powered roadmap builder and productivity assistant**.  
It allows users to generate personalized learning or career roadmaps using AI, view their recently generated roadmaps in a beautiful **card-based UI**, and sign in securely with **Google OAuth**.  

---

## ✨ Features
- 🔑 **Authentication**  
  - Google OAuth using Passport.js  
  - Secure JWT-based sessions  

- 🧠 **AI-Powered Roadmaps**  
  - Generate learning and career roadmaps from user prompts  
  - Recently generated roadmaps are stored and displayed in a **card UI**  

- 🎨 **Modern UI/UX**  
  - Built with React + TailwindCSS  
  - Responsive and mobile-friendly  
  - Card-based dashboard for recent roadmaps  

- 📬 **Communication**  
  - Integrated with **NodeMailer** for emails (future notifications, password recovery, etc.)  

- ☁️ **Backend API**  
  - Node.js + Express.js REST APIs  
  - MongoDB + Mongoose for database  

- 🛠 **Scalable Architecture**  
  - Frontend (Vite + React + Tailwind)  
  - Backend (Express + Passport + MongoDB)  
  - Deployment-ready (Vercel for frontend, Render for backend)  

---

## ⚙️ Tech Stack

**Frontend**
- React (Vite)  
- TailwindCSS (UI)  
- Card-based UI with recent roadmap history  

**Backend**
- Node.js + Express.js  
- Passport.js (Google OAuth 2.0)  
- JWT Authentication  
- NodeMailer (email service)  
- MongoDB + Mongoose  

**AI Integration**
- AI-powered roadmap generator (custom logic / API)  

**Deployment**
- Vercel (Frontend)  
- Render (Backend)  

---

## 📂 Project Structure
nextstep-ai/
├── backend/ # Node.js + Express + MongoDB
│ ├── src/
│ ├── package.json
│ └── .env (ignored)
│
├── frontend/ # React + Vite + Tailwind
│ ├── src/
│ ├── vite.config.ts
│ ├── package.json
│ └── .env (ignored)
│
└── README.md
