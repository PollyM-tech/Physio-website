# Dr. David Okinda Physiotherapy

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Convex](https://img.shields.io/badge/Convex-Backend-EE342F?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

A full-stack web application for **Dr. David Okinda's physiotherapy clinic** in Nairobi, Kenya. The site serves as a public-facing clinic website where patients can learn about services and book appointments, while providing Dr. Okinda with a private, real-time dashboard to manage his appointments and clinical notes.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Clinic Contact](#clinic-contact)

---

## Features

### Public Website

- **Homepage** — Hero section, services overview, and patient testimonials
- **About** — Dr. Okinda's biography and professional credentials
- **Services** — 12 physiotherapy services including back pain, knee pain, sports physiotherapy, and more
- **Contact / Book** — Appointment request form for patients

### Doctor Dashboard (Protected)

- **Stats Overview** — At-a-glance counts for total, pending, confirmed, and rescheduled appointments
- **Appointment Requests** — Review incoming bookings; confirm or reschedule with a single action
- **Past Appointments** — Historical records with per-appointment clinical notes
- **Weekly Schedule** — Calendar view of upcoming appointments
- **Appointment Detail** — Full patient and booking information on a dedicated page
- **CSV Export** — Download filtered appointment lists for record-keeping

### General

- Real-time reactive UI — Convex pushes updates instantly without polling or manual refresh
- Dark / light mode toggle
- Fully responsive mobile design
- Appointment status lifecycle: **Pending → Confirmed / Rescheduled**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19 |
| Build tool | Vite |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Backend / Database | Convex (reactive database + serverless functions) |
| Authentication | Convex Auth — Password provider (doctor only) |
| Frontend hosting | Vercel |
| Backend hosting | Convex Cloud |

---

## Project Structure

```
Physio-website/
├── client/                        # Main application
│   ├── convex/                    # Convex backend (co-located with frontend)
│   │   ├── schema.ts              # Database schema: appointments, patients, doctors
│   │   ├── auth.ts                # Doctor authentication (Password provider)
│   │   ├── appointments.ts        # Appointment CRUD queries and mutations
│   │   ├── patients.ts            # Patient profile queries
│   │   └── http.js                # Auth HTTP endpoints
│   ├── src/
│   │   ├── components/            # Reusable React components
│   │   ├── App.jsx                # Route definitions
│   │   └── main.jsx               # App entry point (ConvexAuthProvider)
│   ├── .env.local                 # Local environment variables (not committed)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── server/                        # Legacy Flask backend (unused — safe to delete)
```

### Page Routes

| Path | Access | Description |
|---|---|---|
| `/` | Public | Homepage |
| `/about` | Public | Doctor bio and credentials |
| `/services` | Public | Full list of physiotherapy services |
| `/contact` | Public | Appointment booking form |
| `/login` | Public | Doctor login (and initial account creation) |
| `/doctor/dashboard` | Protected | Stats overview |
| `/doctor/requests` | Protected | Manage appointment requests |
| `/doctor/past` | Protected | Past appointments with clinical notes |
| `/doctor/schedule` | Protected | Weekly calendar view |
| `/doctor/appointments/:id` | Protected | Full appointment detail |

---

## Local Setup

### Prerequisites

- Node.js 18 or later
- A free [Convex](https://convex.dev) account

### Steps

**1. Clone the repository**

```bash
git clone https://github.com/PollyM-tech/Physio-website.git
cd Physio-website/client
```

**2. Install dependencies**

```bash
npm install
```

**3. Deploy your Convex project**

Sign in at [convex.dev](https://convex.dev), create a new project, copy your deploy key, then run:

```bash
CONVEX_DEPLOY_KEY=your_deploy_key npx convex deploy
```

**4. Set up Convex Auth**

Generates the required JWT keys and stores them in your Convex project automatically:

```bash
npx @convex-dev/auth
```

**5. Configure your local environment**

Create `client/.env.local` and add your Convex deployment URL:

```
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

**6. Start the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

**7. Create the doctor account**

Navigate to `/login` and click **"Create doctor account"** to seed the initial doctor profile. This only needs to be done once.

---

## Environment Variables

Create a `.env.local` file in the `client/` directory. This file must never be committed.

| Variable | Required | Description |
|---|---|---|
| `VITE_CONVEX_URL` | Yes | Your Convex deployment URL (e.g. `https://rare-lion-385.convex.cloud`) |

The following are managed by Convex and stored in your Convex project settings — not in `.env.local`:

| Variable | Set By | Description |
|---|---|---|
| `JWT_PRIVATE_KEY` | `npx @convex-dev/auth` | Private key used to sign auth tokens |
| `JWKS` | `npx @convex-dev/auth` | JSON Web Key Set for token verification |

---

## Deployment

### Backend (Convex Cloud)

```bash
CONVEX_DEPLOY_KEY=your_deploy_key npx convex deploy
```

Convex handles database hosting, serverless function execution, and real-time subscriptions automatically.

### Frontend (Vercel)

1. Push the repository to GitHub.
2. Import the project into [Vercel](https://vercel.com) and set the **root directory** to `client/`.
3. Add `VITE_CONVEX_URL` in the Vercel project environment variables.
4. Deploy. Vercel will rebuild automatically on every push to `main`.

---

## Screenshots

> _Screenshots will be added after deployment._

| Page | Preview |
|---|---|
| Homepage | _Coming soon_ |
| Services | _Coming soon_ |
| Contact / Book | _Coming soon_ |
| Doctor Dashboard | _Coming soon_ |
| Appointment Requests | _Coming soon_ |
| Weekly Schedule | _Coming soon_ |

---

## Clinic Contact

**Dr. David Okinda — Physiotherapist**

| | |
|---|---|
| Phone | [+254 714 704586](tel:+254714704586) |
| Email | [davidoanda62@gmail.com](mailto:davidoanda62@gmail.com) |

**Locations:**

- Kenyatta National Hospital — Physiotherapy Dept, Nairobi
- Tender Touch Clinic — KMA Centre, Upperhill, Nairobi
- House calls available on request
