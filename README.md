# TransitGo.lk 🇱🇰

> Sri Lanka's premier intercity bus booking and real-time live GPS tracking platform, exclusively dedicated to **Long-Distance Express** and **Luxury AC** coaches.

---

## 🌟 Overview

**TransitGo.lk** modernizes intercity public transit across Sri Lanka. Built with a clean, mobile-first design, it allows commuters to search long-distance buses (e.g., Colombo–Kandy, Colombo–Galle Expressway, Colombo–Jaffna), select specific window or aisle seats on interactive seat maps, pay via local payment options (Credit/Debit Card, FriMi/Genie, Bank Transfer, Counter Hold), and track the bus's exact live GPS position smoothly on Google Maps (Uber/PickMe style) or automatic free OpenStreetMap fallback.

---

## 🚀 Key Features

### 1. Google Maps Live Tracking (Uber/PickMe Style) on `/track`
- **Dual Engine Road Routing**:
  - **Google Maps JavaScript API**: Computes exact driving directions polyline via Google Directions Service, caches route per trip in `sessionStorage`, and draws a solid blue line for upcoming road and faded line for travelled road.
  - **Free OpenStreetMap + Leaflet Fallback**: If `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is omitted or fails, automatically routes along Sri Lankan roads via the free OSRM driving engine. Never displays a blank map.
- **Smooth Vehicle Animation**: Bus marker moves smoothly along the road using `requestAnimationFrame`, snaps GPS coordinates to the route, auto-rotates to heading, and auto-follows with a "Re-center" button.
- **Milestones Timeline**: Shows next stop, estimated arrival time, live speed (km/h), and stop-by-stop progress (passed, pulsing next stop, upcoming).

### 2. Track by Bus Number Only
- Search on `/track` accepts **bus number only** (e.g. `NB-1234` or `ND-7711`), case-insensitive and forgiving of spaces and dashes.
- All "Track" buttons across the application (Bus List, Confirmation E-Ticket, My Bookings, Home quick tracker) link directly via `?bus=BUS_NUMBER`.
- Handles all states gracefully: Running live, Not started yet ("Starts at 18:30"), No trip today, or Invalid bus number with active bus suggestions.

### 3. Simpler Booking & Front Reserved Seats
- **Clean Passenger Step**: Streamlined to Full Name (Lead passenger) and Mobile Number (`+94` Sri Lankan phone number validation), plus optional email. Gender and age requirements removed across forms, types, mock data, and e-tickets.
- **Driver Cabin Reserved Seats (`BLOCKED_FRONT_SEATS = 2`)**: The first 2 front seats nearest the driver (Row 1) cannot be booked by the public. Shown grayed-out with a "Not available" tooltip, enforced by `src/lib/config.ts`.
- **Duplicate Booking Prevention**: Re-checks seat availability before checkout to guarantee seats cannot be booked twice.
- **Mobile Sticky Bottom Summary**: On small screens, a sticky bottom bar shows selected seats, total LKR, and primary action button.

### 4. Guest-First Access & Private Ticket Links (`/ticket/[token]`)
- **100% Guest-First Access**: Commuters can search buses, book seats, pay, receive digital tickets, look up bookings, track buses, cancel bookings, and share journeys with family without ever creating an account or logging in.
- **Private E-Ticket Links (`/ticket/[token]`)**: Every confirmed booking generates a unique, unguessable token link that opens the full e-ticket (conductor verification QR code, schedule details, masked passenger phone `077 *** 4567`, live tracking button, and 85% refund cancellation action).
- **Dual-Mode Booking Lookup (`/my-bookings`)**:
  - *(a) Booking ID + Mobile*: Instant ticket lookup with zero OTP required.
  - *(b) Mobile Number (OTP)*: Enter phone, receive 6-digit code (Demo code: `123456`), and view all bookings associated with that number.
- **Demo Booking Shortcut**: One-tap "Try demo booking" button pre-populates `TG-20261105-4821` and `+94 77 987 6543`.

### 5. Optional Simple Passenger Accounts (`/login` & `/account`)
- **2-Step Passwordless Sign-In**:
  - Step 1: Sri Lankan mobile number.
  - Step 2: 6 auto-advancing OTP boxes (Demo code: `123456`, 30s resend timer, 5-try lockout protection). Takes 10 seconds with no passwords or upfront profile forms.
- **Automatic Ticket Consolidation**: Creating or logging into an account automatically links and displays all tickets previously booked with that mobile number in one place.
- **Quick Demo Account**: One-click "Use demo account: 077 000 0000" pre-seeded with multiple active tickets, saved passengers, and favourite routes.
- **Account Features (`/account/*`)**:
  - **My Bookings (`/account/bookings`)**: Real-time tabs for Upcoming, Past, and Cancelled trips.
  - **Saved Passengers (`/account/passengers`)**: Save frequent travellers (Name and Mobile) to autofill checkout in one tap.
  - **Favourite Routes (`/account/favourites`)**: Bookmark routes via the heart icon on bus cards, with one-tap "Search Today" and "Search Tomorrow" shortcuts.
  - **Profile (`/account/profile`)**: Manage optional name, email, preferred language (English, Sinhala, Tamil), and danger zone account deletion.
- **Role Isolation**: Passenger sessions are strictly isolated from the Operator Portal (`/operators/dashboard`) and Admin Portal (`/admin`).

### 6. Operator Bus Onboarding & Admin Approval Flow
- **Request-Based Onboarding**: Bus registration submits an application request instead of immediately going live.
  - Lifecycle: `Submitted` → `Under Review` → `Contacted` → `Rules Agreed` → `GPS Setup` → `Approved` (or `Needs More Info` / `Rejected`).
- **TransitGo Operator Rules (`/operators/rules`)**: Commission structure (6%), GPS live tracking requirement, vehicle safety standards, punctuality, and passenger rights.
- **Operator Dashboard "My Requests" Tab (`/operators/dashboard?tab=requests`)**: Step-by-step lifecycle tracker, "What happens next?" guidance, messages from the operations team, and missing document upload modal.
- **Admin Portal (`/admin`)**:
  - Filterable Operator Requests table with search.
  - Detailed applicant inspection: owner, company, tap-to-call, and direct WhatsApp links.
  - 3-point approval checklist: Documents verified, Commission agreed, GPS method connected.
  - GPS method selector: Driver phone app (`/driver`), Traccar GPS hardware, or Fleet API.
  - "Approve" button strictly requires all 3 checklist items before activating.
  - Call/contact log notes and SMS/Email audit log.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing across domain models)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with TransitGo Blue & White tokens (`#1D4ED8`, `#1E3A8A`, `#EFF6FF`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Mapping**: Google Maps JavaScript API via `@googlemaps/js-api-loader` + Leaflet & OpenStreetMap (OSRM public routing)
- **State & Storage**: React Context + client-side `localStorage` caching

---

## ⚙️ Environment Configuration

TransitGo includes a ready `.env.example` and `.env.local`:

```bash
# Google Maps JavaScript API Key (Optional)
# If left blank or invalid, TransitGo automatically falls back to Leaflet + OpenStreetMap + OSRM Road Routing
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

To enable Google Maps live tracking:
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Add your Google Maps API key with **Maps JavaScript API** and **Directions API** enabled.
3. If omitted, the platform runs seamlessly on free OpenStreetMap tiles with complete road routing.

---

## 🚦 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Type check & build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

---

## 🔑 Demo Credentials & Quick Test Links

### Commuter Experience
- **Home**: `http://localhost:3000/` (search Colombo to Kandy, Galle, or Jaffna)
- **Bus List**: `http://localhost:3000/buses` (filter Luxury AC 2x2 vs Express 2x3, tap heart icon to save favourite routes)
- **Book Seats (Guest)**: `http://localhost:3000/book/colombo-kandy-0600` (select seats, demo card checkout, generates private ticket link)
- **Private E-Ticket Link**: `http://localhost:3000/ticket/demo-ticket-4821` (open ticket without login, QR code, masked phone `077 *** 6543`, track bus, cancel booking)
- **Find My Booking (Guest)**: `http://localhost:3000/my-bookings` (Click "Try demo booking" for instant ID lookup or verify by mobile with OTP `123456`)
- **Passenger Login**: `http://localhost:3000/login` (Click "Use: 077 000 0000" and enter OTP `123456`)
- **Passenger Account**: `http://localhost:3000/account/bookings`, `/account/passengers`, `/account/favourites`, `/account/profile`
- **Live GPS Tracking**: `http://localhost:3000/track?bus=NB-1234` or `http://localhost:3000/track?bus=ND-7711`

### Operator & Admin Experience
- **Operator Rules**: `http://localhost:3000/operators/rules`
- **Operator Register**: `http://localhost:3000/operators/register` (Submit onboarding request)
- **Operator Dashboard**: `http://localhost:3000/operators/dashboard`
  - Demo login: `admin@lankastar.lk` / `transitgo2026`
- **Admin Portal**: `http://localhost:3000/admin`
  - Demo login: `admin@transitgo.lk` / `transitgo2026`
  - Review operator onboarding requests, log notes, choose GPS method, toggle 3-point checklist, and approve.

---

## 🔮 Future Work

- **Production Phone OTP**: Connect Supabase Auth or an enterprise SMS gateway (Dialog IdeaMart, Mobitel mSpace, Twilio) to replace mock OTP `123456`.
- **Database Persistence**: Replace client-side `localStorage` caching with Supabase / PostgreSQL.
- **Conductor & Driver Native App**: Android / iOS app for conductors to scan e-ticket QR codes and transmit high-frequency telemetry.
