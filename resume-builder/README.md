# AI Resume Builder 🚀

A full-stack, production-grade AI-powered Resume Builder application built with **Node.js**, **Express.js**, **EJS**, **PostgreSQL**, and **Prisma ORM**, strictly following the **Model-View-Controller (MVC)** architectural pattern.

---

## 📌 Overview

The **AI Resume Builder** empowers job seekers to construct ATS-optimized, high-impact resumes in minutes. Featuring secure JWT-based authentication, complete resume lifecycle management (CRUD), AI-powered summary & skill suggestions via OpenAI, and vector-rendered PDF document export.

---

## ✨ Features

- 🔒 **Secure Authentication**: User registration and login powered by `bcrypt` password hashing and secure `httpOnly` JWT cookies.
- 📄 **Full Resume Management (CRUD)**: Create, view, edit, update, and delete custom resumes associated with user accounts.
- 🤖 **AI Resume Assistant**:
  - **Generate Summary**: AI creates tailored professional summaries based on candidate background.
  - **Improve Experience**: AI transforms raw work history into impact-driven bullet points using action verbs.
  - **Suggest Skills**: AI recommends top industry skills for target job roles.
- 📥 **PDF Document Export**: Instant downloadable, beautifully styled PDF resumes generated via `PDFKit`.
- 🎨 **Modern Responsive UI**: Custom CSS with glassmorphism effects, crisp typography, and dark-mode aesthetic.

---

## 🛠 Tech Stack

- **Frontend**: EJS (Embedded JavaScript), HTML5, CSS3 (Vanilla), Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database & ORM**: PostgreSQL, Prisma ORM
- **Authentication**: JSON Web Tokens (JWT), bcrypt, cookie-parser
- **AI Integration**: OpenAI API (`gpt-4o-mini`)
- **PDF Generation**: PDFKit
- **Architecture**: Model-View-Controller (MVC)

---

## 🏗 Application Architecture & Folder Structure

```text
resume-builder/
│
├── app.js                   # Express application setup & middleware pipeline
├── server.js                # Server entry point & listener
├── package.json             # Project metadata & dependencies
├── .env.example             # Environment variable template
├── .gitignore               # Git exclusions
├── README.md                # Project documentation
│
├── config/                  # App configurations
│
├── controllers/             # Request handlers (MVC)
│   ├── authController.js    # Register, login, logout logic
│   ├── resumeController.js  # CRUD operations for resumes
│   ├── aiController.js      # AI endpoints integration
│   └── pdfController.js     # PDF export controller
│
├── routes/                  # Route definitions
│   ├── indexRoutes.js       # Homepage route
│   ├── authRoutes.js        # Authentication endpoints
│   ├── resumeRoutes.js      # Resume CRUD endpoints
│   ├── aiRoutes.js          # AI Assistant endpoints
│   └── pdfRoutes.js         # PDF download endpoints
│
├── middleware/              # Express custom middlewares
│   └── authMiddleware.js    # JWT protection & user context middleware
│
├── services/                # Business logic & external services
│   ├── aiService.js         # OpenAI API service module
│   └── pdfService.js        # PDFKit document generator service
│
├── utils/                   # Shared utilities
│   └── prisma.js            # Prisma client singleton instance
│
├── prisma/                  # Database schema & migrations
│   └── schema.prisma        # Database models & relationships
│
├── views/                   # EJS templates
│   ├── layouts/
│   │   ├── header.ejs       # Shared head & navigation
│   │   └── footer.ejs       # Shared footer & scripts
│   └── pages/
│       ├── index.ejs        # Landing page
│       ├── login.ejs        # Login page
│       ├── register.ejs     # Registration page
│       ├── dashboard.ejs    # User dashboard page
│       ├── createResume.ejs # Resume creation form with AI
│       ├── editResume.ejs   # Resume editing form with AI
│       └── resumeView.ejs   # Resume preview & PDF trigger page
│
└── public/                  # Static assets
    ├── css/
    │   └── style.css        # Core stylesheet
    ├── js/
    │   └── main.js          # Client-side JS & AI Fetch calls
    └── images/              # Static media assets
```

---

## ⚡ Installation & Setup

### Prerequisites

Ensure you have the following installed locally:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/) database server

---

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ai-resume-builder.git
   cd resume-builder
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Fill in your actual environment settings:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/resume_builder_db?schema=public"
   JWT_SECRET=super_secret_jwt_key_change_me
   OPENAI_API_KEY=sk-proj-your-openai-api-key-here
   ```

4. **Database Setup & Prisma Migrations**
   Run the Prisma migration to create tables in PostgreSQL:
   ```bash
   npx prisma migrate dev --name init_database
   ```
   Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` in your web browser.

---

## 🔗 API Documentation

### Authentication Routes (`/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/auth/register` | Render registration page | Public |
| `POST` | `/auth/register` | Register new user account | Public |
| `GET` | `/auth/login` | Render login page | Public |
| `POST` | `/auth/login` | Authenticate user & issue JWT cookie | Public |
| `GET` | `/auth/logout` | Clear auth token cookie | Private |

### Resume Management Routes (`/resume`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/resume/dashboard` | List logged-in user's resumes | Private |
| `GET` | `/resume/create` | Render resume creation form | Private |
| `POST` | `/resume/create` | Save new resume to database | Private |
| `GET` | `/resume/:id` | View specific resume preview | Private (Owner) |
| `GET` | `/resume/:id/edit` | Render resume edit form | Private (Owner) |
| `POST` | `/resume/:id/update` | Update existing resume data | Private (Owner) |
| `POST` | `/resume/:id/delete` | Delete resume | Private (Owner) |

### AI Assistant Routes (`/ai`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/ai/generate-summary` | Generate professional summary via AI | Private |
| `POST` | `/ai/improve-experience` | Refine experience into action bullet points | Private |
| `POST` | `/ai/generate-skills` | Suggest relevant skills for job role | Private |

### PDF Export Routes (`/pdf`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/pdf/resume/:id` | Generate and download resume as PDF | Private (Owner) |

---

## 🖼 Screenshots

*(Place application screenshots here)*

---

## 🚀 Future Improvements

- 🎨 Multiple resume design themes and color template selector.
- 🔗 Shareable public link for online resume portfolios.
- 📊 ATS Compatibility score checker.
