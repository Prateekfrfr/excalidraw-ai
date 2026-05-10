# Excalidraw AI

A modern, collaborative whiteboard application inspired by Excalidraw, designed for seamless real-time brainstorming, sketching, and visual collaboration. Built with a scalable frontend architecture using React, Vite, Konva, Clerk Authentication, and Yjs-powered WebSocket synchronization.

---

## Overview

Excalidraw AI enables users to create, edit, and collaborate on drawings in real time with a smooth and responsive canvas experience. The project focuses on performance, scalability, and modern frontend engineering practices while integrating authentication and collaborative state synchronization.

This project demonstrates:

* Real-time collaborative systems
* Canvas rendering with Konva
* State management architecture
* Authentication workflows
* WebSocket-based synchronization
* Modern React development patterns

---

##  Core Features

###  Interactive Drawing Canvas

* Smooth canvas rendering using React Konva
* Multiple shape and drawing tools
* Dynamic property editing
* Responsive interaction handling

###  Real-Time Collaboration

* Live synchronization using Yjs and y-websocket
* Multi-user collaboration support
* Shared drawing state across clients
* Real-time cursor updates

###  Authentication & User Management

* Secure authentication powered by Clerk
* User session management
* Protected application workflows

###  Optimized Frontend Architecture

* Fast build tooling with Vite
* Modular component-based structure
* Zustand-powered state management
* Scalable project organization

###  AI Integration Ready

* Extendable AI utility layer
* Architecture prepared for AI-assisted workflows and drawing enhancements

---

## Technology Stack

| Category         | Technologies       |
| ---------------- | ------------------ |
| Frontend         | React, Vite        |
| Canvas Rendering | React Konva, Konva |
| State Management | Zustand            |
| Authentication   | Clerk              |
| Real-Time Sync   | Yjs, y-websocket   |
| Routing          | React Router DOM   |
| Styling          | CSS                |

---

#  Project Structure

```bash
src/
 ├── components/
 │    ├── Canvas.jsx
 │    ├── Toolbar.jsx
 │    ├── MenuBar.jsx
 │    ├── PropertyPanel.jsx
 │    └── MultiplayerCursors.jsx
 │
 ├── App.jsx
 ├── ai.js
 ├── store.js
 ├── main.jsx
 └── index.css
```

---

#  Installation & Setup

##  Clone the Repository

```bash
git clone https://github.com/Prateekfrfr/excalidraw-ai.git
cd excalidraw-ai
```

---

##  Install Dependencies

```bash
npm install
```

---

##  Configure Environment Variables

Create a `.env` file in the project root.

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Obtain your Clerk publishable key from:

[https://dashboard.clerk.com/](https://dashboard.clerk.com/)

---

##  Start the Development Server

```bash
npm run dev
```

The application will run locally on:

```bash
http://localhost:5173
```

---

##  Start the WebSocket Collaboration Server

Open another terminal window and run:

```bash
npm run yjs
```

This enables real-time collaborative synchronization.

---

#  Deployment

## Production Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

---

## Recommended Deployment Platforms

* Vercel
* Netlify
* Render

---

# 🔮 Future Enhancements

* AI-powered drawing assistance
* Export to PNG, SVG, and PDF
* Layer and grouping support
* Team workspaces
* Version history and recovery
* Dark/Light theme switching
* Voice and live collaboration tools
* Advanced shape libraries

---

#  Contributing

Contributions, feature requests, and improvements are welcome.

## Contribution Workflow

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

#  License

This project is licensed under the MIT License.

---

#  Author

**Prateek Jha**

GitHub: [https://github.com/Prateekfrfr](https://github.com/Prateekfrfr)
