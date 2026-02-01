# Full-Stack Landing Page with Admin Panel

A Next.js landing page with an Express.js backend and MongoDB. Content (Hero, About, Testimonials, FAQ) is editable via an admin panel; changes appear on the site without redeploy.

---

## Technology Stack

| Layer      | Technology |
| ---------- | ---------- |
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS, MUI, GSAP |
| **Backend**  | Express.js (Node) |
| **Database** | MongoDB |
| **Auth**     | JWT in httpOnly cookie (admin only) |

---

## Project Structure

```
├── app/
│   ├── (website)/          # Public landing page
│   │   ├── components/     # Hero, About (Nutrition), Testimonials, FAQ, etc.
│   │   ├── header.tsx     # Site header (shows Admin login or admin profile when logged in)
│   │   ├── footer.tsx
│   │   └── page.tsx       # Home page
│   ├── admin/              # Admin panel (protected)
│   │   ├── login/          # Admin login page
│   │   ├── page.tsx        # Dashboard: edit Hero, About, Testimonials, FAQ
│   │   └── *Editor.tsx     # Form components for each section
│   └── api/                 # Next.js API routes (optional; primary API is Express)
├── server/                  # Express backend
│   ├── index.js             # App entry, CORS, routes
│   ├── db.js                # MongoDB connection
│   ├── auth.js              # JWT create/verify, requireAdmin
│   └── routes/
│       ├── auth.js          # POST /login, POST /logout, GET /me
│       ├── content.js       # GET/PUT /content/hero, /content/about
│       ├── testimonials.js  # CRUD /testimonials
│       └── faqs.js          # CRUD /faqs
├── lib/
│   ├── api.ts               # fetchApi() – calls Express with credentials
│   ├── auth.ts              # JWT helpers (Next.js API / server use)
│   └── mongodb.ts           # MongoDB client (Next.js use if needed)
└── public/images/           # Static assets
```

---

## How the App Works

1. **Landing page (`/`)**  
   Fetches Hero, About, Testimonials, and FAQ from the Express API and renders them. Refreshing the page shows the latest content.

2. **Admin**  
   - **Not logged in:** Header shows “Admin login” → `/admin/login`.  
   - **Logged in:** Header shows avatar, name, email, and “Logout”.  
   - **Admin panel:** `/admin/login` (login) → `/admin` (dashboard). In the dashboard you can edit Hero (title, subtitle, image), About (heading, paragraph), Testimonials (add/edit/delete), and FAQs (add/edit/delete).  
   - All admin API calls go to the Express server with credentials (cookie). Changes are stored in MongoDB and appear on the landing page after refresh.

3. **Auth**  
   Admin signs in with email/password (from env). Express validates, sets an httpOnly JWT cookie, and returns success. The frontend uses `fetchApi` with `credentials: 'include'` so the cookie is sent on later requests.

---

## Run Locally

### Prerequisites

- **Node.js** 18+  
- **MongoDB** running locally (e.g. [MongoDB Community](https://www.mongodb.com/try/download/community) or Docker)

### 1. Clone and install

```bash
git clone <repo-url>
cd testfullstack
npm install
```

### 2. Environment variables

Create `.env.local` in the project root (or copy from `.env.example` if present):

```env
# MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/testfullstack

# Admin (used by Express)
ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD=admin123
ADMIN_NAME=Edgar Thompson

# JWT (Express)
JWT_SECRET=your-secret-key-min-32-chars

# Frontend → Backend (Next.js calls Express)
NEXT_PUBLIC_API_URL=http://localhost:4000

# Optional: CORS origin for Express (defaults to http://localhost:3000)
# FRONTEND_URL=http://localhost:3000
```

Use your own values for `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`, and `JWT_SECRET`.

### 3. Start MongoDB

Ensure MongoDB is running and reachable at `MONGODB_URI` (e.g. `mongodb://127.0.0.1:27017`).

### 4. Start the backend (Express)

In one terminal:

```bash
npm run server
```

You should see: `Express server running at http://localhost:4000`

### 5. Start the frontend (Next.js)

In a second terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6. Use the app

- **Site:** Browse the landing page at `/`.  
- **Admin:** Go to [http://localhost:3000/admin](http://localhost:3000/admin) (or click “Admin login” in the header), sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`, then edit content. Refresh the landing page to see updates.

---

## Scripts

| Command        | Description                    |
| -------------- | ------------------------------ |
| `npm run dev`  | Next.js dev server (port 3000) |
| `npm run server` | Express API server (port 4000) |
| `npm run build` | Next.js production build       |
| `npm run start` | Next.js production server      |
| `npm run lint`  | Run ESLint                     |

---

## Notes

- The **Express server must be running** for login, admin panel, and dynamic content. If the backend is down, the site will show defaults or “Cannot reach the server” on login.
- **MongoDB** is required for saving content; if it’s not running, the app may still load with default/fallback data but writes will fail.
- Sensitive values (`ADMIN_*`, `JWT_SECRET`, `MONGODB_URI`) are read from env and should not be committed.
