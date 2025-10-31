## 🔐 Project Name: [RoleVault]

### Role-Based Authentication Full-Stack Mini Project

This project implements a secure, role-based authentication system demonstrating proficiency in modern full-stack development. The core objective is to manage user access via distinct **User** and **Admin** roles. This assignment evaluates your ability to integrate the frontend and backend, solve problems, and successfully deploy the application.

---

## 🚀 Deployed Application Links (Mandatory Deliverables)

The mandatory deliverables include publicly reachable URLs for both the frontend and backend.

| Component | Deployment Platform | Status | URL |
| :--- | :--- | :--- | :--- |
| **Frontend (Next.js)** | [Vercel / Netlify] | Deployed | `[Your Deployed Frontend URL]` |
| **Backend (Node/Express)** | [Render / Railway / Vercel Serverless] | Deployed | `[Your Deployed Backend URL (Base API)]` |
| **GitHub Repository** | GitHub | Live | `[Your GitHub Repository Link]` |

---

## ⚙️ Technical Stack

This project adheres to the specified technologies for the full-stack architecture:

| Category | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | **Next.js** (TypeScript) | Required framework for the client application. |
| **UI/Styling** | **Tailwind CSS & Shad CN/UI** | Used for clean, effective styling and components. |
| **Backend** | **Node.js with Express** | Required backend framework. |
| **Database** | **[PostgreSQL/MongoDB]** | Used with [Prisma ORM / Mongoose] (free tier required). |
| **Authentication**| **JWT** (or Session-Based) | Used for securing the application state. |
| **Security** | **Bcrypt** | Used for secure password hashing. |

---

## 🔑 Core Features and Requirements

The application meets all mandatory core requirements:

* **Role Selection on Signup:** The signup page includes a mandatory dropdown for selecting the user role (**User** or **Admin**).
* **Protected Dashboard:** The dashboard route is protected and only accessible when a user is logged in.
* **Personalized Header:** Upon login, the user is redirected to the dashboard, which displays a welcome message showing the user's name and role (e.g., "Welcome, \[Name] (Admin)").
* **Environment Files:** Includes a **.env.example** file for easy setup.

### Implemented Backend Endpoints

[cite_start]The minimum required API endpoints have been implemented[cite: 31]:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/signup` | Registers a new user with a specified role. |
| `POST` | `/auth/login` | Authenticates a user and issues a JWT/session. |
| `GET` | `/auth/me` | Protected route that returns the authenticated user's details for dashboard context. |

### ✨ Implemented Optional Enhancements

*(Remove this section if you did not implement any optional features, or list the ones you did implement from the assignment's suggestions)*

* [cite_start]**Logout Functionality:** A clear button is provided for users to terminate their session[cite: 52].
* [cite_start]**Form Validation:** Used **Zod/Joi** for robust validation on signup and login forms[cite: 53].
* [cite_start]**Distinct Dashboards:** The Admin and User dashboards utilize different UI/layouts[cite: 54].

---

## 🛠️ Local Development Setup

Follow these steps to get the project running on your local machine.

### 1. Prerequisites

* Node.js (v18+)
* npm or yarn
* A running instance of your chosen database ([PostgreSQL/MongoDB]).

### 2. Backend Setup (Node/Express)

1.  Navigate to the backend directory: `cd backend`
2.  Install dependencies: `npm install` (or `yarn`)
3.  **Configure Environment:** Create a file named **`.env`** and populate it using the provided **`.env.example`** file.
    ```env
    # Example .env content
    DATABASE_URL="[Your DB Connection String]"
    JWT_SECRET="[A long, random string]"
    PORT=5000 
    ```
4.  **Database Migration (If using Prisma/PostgreSQL):**
    ```bash
    npx prisma migrate dev --name init
    ```
5.  Start the server: `npm run dev`
    *The server will run at http://localhost:5000*

### 3. Frontend Setup (Next.js)

1.  Navigate to the frontend directory: `cd frontend`
2.  Install dependencies: `npm install` (or `yarn`)
3.  **Configure Environment:** Create a file named **`.env.local`** and set your API URL:
    ```env
    # .env.local
    NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1" 
    ```
4.  Start the development server: `npm run dev`
    *The client will run at http://localhost:3000*
