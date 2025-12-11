# StudyNotion – Full-Stack EdTech Platform

StudyNotion is a full‑stack EdTech web application that allows instructors to create and manage courses while students can browse, purchase, and learn from rich, video‑based content. It is inspired by modern e‑learning platforms and demonstrates a complete MERN‑stack application with authentication, payments, dashboards, and responsive UI.

---

## Features

- **Role‑based authentication** for Students and Instructors with secure login and signup flows.
- **Course management system** for instructors:
  - Create, update, and delete courses.
  - Add sections, lectures, and rich content.
  - Track enrolled students.
- **Student experience**:
  - Browse course catalog with filters.
  - Purchase courses and access enrolled content.
  - Track progress through a learning dashboard.
- **Responsive UI** built with modern React and Tailwind‑style utility classes for desktop and mobile.
- **API integration** via a dedicated backend server directory (`server`) for all course, user, and payment operations.

---

## Tech Stack

### Frontend

- **React** single‑page application in `src/` with:
  - `components/` for reusable UI elements.
  - `pages/` for route‑level views (auth pages, dashboard, course pages, etc.).
  - `hooks/` for shared client logic.
  - `slices/` and `reducer/` for state management (Redux‑style pattern).
  - `services/` for API calls and wrappers over the backend.
- **Tailwind CSS** (configured via `tailwind.config.js`) for styling and layout.
- **Vite/CRA‑style tooling** (see `package.json`) for local dev and optimized builds.

### Backend

- **Node.js + Express** backend located in the `server/` directory for REST APIs.
- **MongoDB** (typical for StudyNotion‑style projects) for persistent storage of users, courses, and enrollments.
- **JWT‑based authentication** and protected routes for dashboards and course content.
- **Payment gateway integration** (commonly Razorpay/Stripe in this pattern) for course purchase flows.

### Tooling & Quality

- `.editorconfig`, `.prettierignore`, and `prettier.config.js` for consistent formatting.
- `.nvmrc` to standardize Node version across environments.
- Deployed frontend: (https://study-notion-psi-khaki.vercel.app/).

---

## Project Structure

studyNotion/
├─ public/
├─ server/ # Node/Express backend APIs
├─ src/ # React frontend
│ ├─ assets/
│ ├─ components/
│ ├─ data/
│ ├─ hooks/
│ ├─ pages/
│ ├─ reducer/
│ ├─ services/
│ ├─ slices/
│ ├─ utils/
│ ├─ App.jsx
│ └─ index.js
├─ .editorconfig
├─ .gitignore
├─ .nvmrc
├─ .prettierignore
├─ README.md
├─ package.json
├─ prettier.config.js
└─ tailwind.config.js

text

The app follows a clear separation between frontend (`src/`) and backend (`server/`), with additional folders for services, slices, and reducers to keep state management and API logic modular.

---

## Getting Started

### Prerequisites

- Node.js and npm (version as specified in `.nvmrc`).
- MongoDB instance (local or cloud).
- Environment variables for JWT secrets, DB URI, and payment keys (in backend `.env`).

### Installation

1. **Clone the repository**
git clone https://github.com/VISHALGAURAV95/studyNotion.git
cd studyNotion

text

2. **Install root and workspace dependencies**
npm install

text

3. **Backend setup (server)**
cd server
npm install

create .env and configure DB_URI, JWT_SECRET, payment keys, etc.
npm run dev # or npm start, depending on your scripts

text

4. **Frontend setup**
cd ..
npm run dev # start React dev server from project root (see package.json)

text

The frontend will start on a local port (e.g., `http://localhost:3000`) and talk to the backend server using the configured API base URL.

---

## Usage

- Visit the home page to explore available courses.
- Sign up as a **Student** to enroll in courses and track learning progress.
- Sign up as an **Instructor** to create and publish new courses from the dashboard.
- Purchase a course to unlock its lectures and track progress.

---

## Live Demo & Repository

- **Live App:** https://study-notion-psi-khaki.vercel.app/  
- **GitHub:** https://github.com/VISHALGAURAV95/studyNotion
