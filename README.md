# AMARA Hair & Beauty — Salon Booking Website

The same booking-first logic as the restaurant build, adapted for a hair & beauty salon:
customers browse **services** (not a food menu) and book an **appointment** (not a table),
picking a stylist preference and a time slot. No payment gate — the salon confirms by
**email** and **WhatsApp**. An **admin dashboard** lets staff manage services (including
duration and limited-time offers), and a **customer dashboard** lets clients see their own
appointment history.

Built with **React (Vite + Tailwind)** on the frontend and **Node/Express + MongoDB** on the
backend. "AMARA" and its logo mark are placeholders — swap them for your client's real brand
in a few minutes (see [Rebranding](#rebranding-for-a-new-client) below).

---

## 1. What's different from the restaurant version

Same architecture, adapted data model:

| Restaurant version | Salon version |
|---|---|
| `MenuItem` (name, price, category, isSpecial) | `Service` (name, price, category, **durationMinutes**, isSpecial) |
| Booking = table reservation (`guests`, pre-ordered items) | Booking = appointment (`stylist` preference, selected services) |
| Categories: Starters, Mains, Grills, Sides, Drinks, Desserts | Categories: Hair, Nails, Skin & Facials, Makeup, Spa & Massage, Bridal |
| `/api/menu` | `/api/services` |
| Pages: Menu, admin ManageMenu | Pages: Services, admin ManageServices |

Everything else — auth, JWT roles, image upload for items, email/WhatsApp notification flow,
admin/customer dashboards, mobile-first responsive layout — works exactly the same way.

---

## 2. What's inside

```
salon/
├── backend/                 Node/Express API
│   ├── config/db.js         MongoDB connection
│   ├── models/               User, Service, Booking (Mongoose schemas)
│   ├── middleware/           auth.js (JWT), upload.js (service photo uploads)
│   ├── routes/                authRoutes, serviceRoutes, bookingRoutes
│   ├── utils/                 sendEmail.js, sendWhatsApp.js, seed.js
│   ├── uploads/services/      uploaded service photos land here
│   └── server.js              app entry point
│
└── frontend/                 React app (Vite)
    └── src/
        ├── api/axios.js           pre-configured axios instance (auto-attaches JWT)
        ├── context/AuthContext.jsx login/register/logout + current user
        ├── components/             Navbar, Footer, Hero, ServiceCard, AppointmentForm, etc.
        ├── pages/                  Home, Services, Booking, About, Contact, Login, Register
        ├── pages/admin/             AdminLayout, AdminDashboard, ManageServices, ManageBookings
        └── pages/customer/          CustomerLayout, CustomerDashboard, MyBookings
```

**Public site:** Home · Services · Book Appointment · About · Contact · Login / Register
**Admin dashboard** (`/admin`): Overview stats · Services (add/edit/delete, photo upload,
duration, mark as limited offer with "was / now" pricing) · Appointments (confirm/decline/
complete, jump to WhatsApp)
**Customer dashboard** (`/account`): Overview · My appointments

---

## 3. How booking + notifications work

Booking an appointment only asks for the client's details, date, time, an optional stylist
preference, and any services picked from the Services page — no payment gate. On submit:

1. The appointment is saved to MongoDB.
2. A confirmation email goes to the **client**, and a new-appointment alert goes to the
   **salon's inbox** (via Nodemailer/SMTP — Gmail app-password works out of the box).
3. A **WhatsApp link** (`wa.me/...`) pre-filled with the appointment details is shown to the
   client as a one-tap "Confirm via WhatsApp instead" button — zero setup, no paid API. Fill
   in Twilio credentials in `.env` and the server will *also* auto-send the WhatsApp message
   server-side; otherwise that step is skipped silently.
4. Staff confirm/decline from `/admin/bookings`, which emails the client again with the
   updated status.

---

## 4. Setup

### Prerequisites
- Node.js 18+
- A MongoDB database (local `mongod`, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### Backend

```bash
cd backend
npm install
cp .env.example .env      # then fill in the values, see below
npm run seed                # creates the first admin account + a few starter services
npm run dev                  # starts the API on http://localhost:5000
```

Key `.env` values to fill in:
- `MONGO_URI` — your MongoDB connection string
- `JWT_SECRET` — any long random string
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — the first admin login (used once by `npm run seed`)
- `EMAIL_USER` / `EMAIL_PASS` — an SMTP account for sending emails (a Gmail
  [App Password](https://myaccount.google.com/apppasswords) works well)
- `SALON_NOTIFY_EMAIL` — where new-appointment alerts land
- `SALON_WHATSAPP_NUMBER` — the salon's WhatsApp number, digits only, country code first
  (e.g. `27821234567`)
- `TWILIO_*` — optional, only needed for automatic server-side WhatsApp sending

If you skip the email credentials, the server still runs fine — it just logs what *would*
have been emailed to the console, so you can build and test the whole flow before wiring up
real SMTP.

### Frontend

```bash
cd frontend
npm install
npm run dev     # starts the site on http://localhost:5173
```

The dev server proxies `/api` and `/uploads` to `http://localhost:5000`, so make sure the
backend is running first. Log in with the admin account you seeded to reach `/admin`.

### Production build

```bash
cd frontend
npm run build      # outputs static files to frontend/dist
```

Deploy `frontend/dist` to any static host (Netlify, Vercel, S3+CloudFront, etc.) and the
`backend` folder to any Node host (Render, Railway, a VPS with PM2, etc.). Point the
frontend's API calls at your live backend URL by setting a proper `CLIENT_URL` in the
backend `.env` and, if you're not using a proxy in production, adjusting `baseURL` in
`frontend/src/api/axios.js`.

---

## 5. Rebranding for a new client

1. **Name & logo** — replace "AMARA" in `frontend/src/components/Navbar.jsx` and
   `Footer.jsx`, and swap the `Sparkles` icon badge for the client's real logo image.
   Update `frontend/index.html` (`<title>`, meta description) and `public/favicon.svg`.
2. **Colors & type** — everything runs off the token system in
   `frontend/tailwind.config.js` (`noir`, `surface`, `cream`, `mauve`, `champagne`, `sage`,
   `line`) plus the two font families loaded in `index.html` (Cormorant Garamond + Manrope).
   Change the hex values and font links there and the whole site re-themes.
3. **Copy** — hero headline/stats (`Hero.jsx`), about page story (`About.jsx`), contact
   details and footer address/hours (`Footer.jsx`, `Contact.jsx`) are all plain text, easy
   to swap per client.
4. **Service data** — either use the admin dashboard once it's live, or edit the starter
   services in `backend/utils/seed.js` before running `npm run seed`. Update the
   `category` enum in `backend/models/Service.js` (and the `CATEGORIES` array in
   `frontend/src/pages/Services.jsx` + `ManageServices.jsx`) if the client's service types
   differ from Hair / Nails / Skin & Facials / Makeup / Spa & Massage / Bridal.
5. **Business details** — salon phone/WhatsApp/email/address live in `.env` and in
   `Footer.jsx`/`Contact.jsx`; update both.

---

## 6. Roles

- **admin** — full access to `/admin`: manage services (add/edit/delete, photo upload,
  duration, mark items as a limited offer with an original "was" price and a new "now"
  price), and manage every appointment (confirm/decline/mark completed).
- **customer** — can register/log in and see their own appointment history at `/account`.
  Booking an appointment doesn't require an account — guests can book directly from
  `/booking`.

---

Built to be fully responsive from small phones up through desktop, with visible keyboard
focus states and reduced-motion support for accessibility.
