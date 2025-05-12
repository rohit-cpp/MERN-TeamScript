# 🚀 TeamScript

A modern, AI-powered collaborative team workspace built using the MERN Stack.  
Empower teams to create, edit, manage documents together — with real-time collaboration, smart AI tools, and intuitive dashboards.

🕒 **Completed in 7 days** with ❤️, coffee ☕, and a passion for modern web development.

---

## 📸 live link

[teamscript.onrender.com](https://teamscript.onrender.com/)

---

## 📅 Timeline

| Day | Features Implemented |
|-----|-----------------------|
| 1️⃣  | Backend setup (Teams, Users, Auth) |
| 2️⃣  | Redux Toolkit + RTK Query integration |
| 3️⃣  | Team dashboard layout (Sidebar + Nested Routes) |
| 4️⃣  | Document creation with Tiptap Editor |
| 5️⃣  | Version control & suggestion management |
| 6️⃣  | Real-time collaboration via Socket.IO |
| 7️⃣  | AI Assistant integration using Gemini API |

---

## 🌟 Features

### 👥 Team Management
- Create teams
- View "My Teams"
- Add members to a team

### 📄 Document Collaboration
- Create, edit, delete documents
- Assign documents to teams
- Version control (create, list, edit, view)
- Suggestion system (add/delete)

### 🧠 AI Integration
- Rephrase, Summarize, Translate
- SEO optimize, Generate Titles/Keywords
- Grammar & Tone improvement
- Powered by **Gemini API**

### 🧑‍🤝‍🧑 Real-time Collaboration
- Built with **Socket.IO**
- Live presence of teammates
- Show who's editing
- Real-time updates without page reloads

### 📦 Full Dashboard UI
- Clean layout with **ShadCN UI**
- Responsive sidebar navigation
- Forms and modals with smooth transitions

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| 🧠 AI | Gemini API |
| 💻 Frontend | React, Vite, Redux Toolkit, RTK Query, Tiptap, ShadCN UI, TailwindCSS |
| ⚙ Backend | Node.js, Express.js, MongoDB, Mongoose |
| 🔌 Real-time | Socket.IO |
| 🔐 Auth | JWT, bcrypt |
| 🧪 Notifications | Sonner, Toasts |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB
- Gemini API Key

---

⚡ AI Features Powered by Gemini
You’ll need a Gemini API key from Google AI Studio.

Paste it in your backend .env under GEMINI_API_KEY

🧪 Demo Accounts
Admin: bhushan@gamil.com / password-bhushan
User: rohit@example.com / password-rohit

👨‍💻 Author
Built by Rohit Gawande

🙌 Acknowledgements
ShadCN/UI

Tiptap Editor

Gemini API by Google

Socket.IO

RTK Query


## 📸 ScreenShots
![Screenshot 2025-05-04 134301](https://github.com/user-attachments/assets/ed751121-4de3-4b9c-846a-0766069bbb3c)
![Screenshot 2025-05-08 182924](https://github.com/user-attachments/assets/cd6b2852-46c2-41ff-854f-19cf0f633c3e)
![Screenshot 2025-05-08 161812](https://github.com/user-attachments/assets/13531d01-f287-45f9-92de-4f63cdaf01b2)
![Screenshot 2025-05-06 172330](https://github.com/user-attachments/assets/ddf9ab61-9293-4d9a-99d5-3638ae28d12f)
![Screenshot 2025-05-11 161956](https://github.com/user-attachments/assets/7f3f016b-b396-4a6e-a643-d8a1916917a6)



### 🔧 Installation

```bash
git clone https://github.com/rohit-cpp/teamscript.git
cd teamscript

Setup Backend
cd backend
npm install
cp .env.example .env
# fill in Mongo URI, JWT secret, Gemini API key
npm run dev

Setup Frontend
cd frontend
npm install
npm run dev


