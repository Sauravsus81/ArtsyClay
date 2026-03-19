# Artsy Clay Ceramics — React + Node.js

A full-stack e-commerce web app for a handcrafted ceramics shop, built with React (Vite) on the frontend and Node.js + Express on the backend.

---

## Project Structure

```
artsyclay-app/
├── backend/               # Node.js + Express API
│   ├── src/
│   │   ├── server.js      # Entry point
│   │   ├── data/
│   │   │   └── products.js       # Product catalog
│   │   └── routes/
│   │       ├── products.js       # GET /api/products, /api/products/:id
│   │       ├── orders.js         # POST /api/orders
│   │       └── misc.js           # POST /api/contact, /api/newsletter
│   └── package.json
│
└── frontend/              # React + Vite SPA
    ├── src/
    │   ├── main.jsx               # Entry point
    │   ├── App.jsx                # Router layout
    │   ├── index.css              # All styles (design tokens + components)
    │   ├── context/
    │   │   ├── CartContext.jsx    # Cart global state (useReducer)
    │   │   └── ToastContext.jsx   # Toast notifications
    │   ├── components/
    │   │   ├── Navbar.jsx         # Sticky nav + mobile menu
    │   │   ├── CartSidebar.jsx    # Slide-in cart panel
    │   │   ├── ProductCard.jsx    # Reusable product card
    │   │   ├── Footer.jsx         # Footer + inline newsletter
    │   │   └── NewsletterSection.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx       # Hero, featured, categories, about, testimonials
    │   │   ├── ShopPage.jsx       # Filter + sort + product grid
    │   │   ├── ProductPage.jsx    # Product detail + related
    │   │   ├── CheckoutPage.jsx   # Checkout form + order summary
    │   │   └── ContactPage.jsx    # Contact info + message form
    │   └── utils/
    │       ├── api.js             # All fetch calls to the backend
    │       └── svgHelpers.jsx     # Ceramic SVG illustrations (mug, bowl, plate…)
    ├── index.html
    ├── vite.config.js             # Proxy /api → localhost:5010
    └── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

---

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev        # uses nodemon, hot-reload
# or: npm start
```

API will be available at **http://localhost:5010**

#### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | All products (supports `?category=mugs&sort=price-asc`) |
| GET | `/api/products/featured` | First 4 featured products |
| GET | `/api/products/:id` | Single product + related |
| POST | `/api/orders` | Place an order |
| POST | `/api/contact` | Send a contact message |
| POST | `/api/newsletter` | Subscribe to newsletter |
| GET | `/api/health` | Health check |

---

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will be at **http://localhost:3010**

Vite proxies all `/api/*` requests to the backend automatically — no CORS issues in dev.

---

## Features

### Frontend
- **5 pages**: Home, Shop, Product Detail, Checkout, Contact
- **React Router v6** with scroll-to-top on navigation
- **Cart** — global state via `useReducer` + `localStorage` persistence
- **Filter & Sort** — URL-driven (shareable links)
- **Toast notifications** — non-blocking feedback
- **Ceramic SVG illustrations** — hand-drawn SVG art for all product types
- **Responsive** — mobile menu, stacked layouts on small screens
- **Marquee**, animated hero, scroll-reveal cards

### Backend
- **Express** REST API with `cors` and `express-validator`
- Product filtering by category, sorting by price/rating, text search
- Order placement with full validation
- Newsletter subscription + contact form handling
- In-memory store (swap for MongoDB/PostgreSQL in production)

---

## Production Build

```bash
# Build frontend
cd frontend && npm run build

# Serve frontend dist with Express (add static middleware to server.js)
# or deploy to Vercel / Netlify separately
```

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, React Router v6, Vite |
| Styling | Pure CSS with custom properties (no UI library) |
| State | useReducer + Context API |
| Backend | Node.js, Express 4 |
| Validation | express-validator |
| Dev proxy | Vite proxy → Express |
