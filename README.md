# 💳 CC Analyser — Credit Card Analyser (MERN Stack)

A full-stack MERN application to help users find the best credit card for their lifestyle.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (running locally on default port 27017)

### Step 1 — Install all dependencies

```bash
npm run install-all
```

This installs packages for root, server, and client in one command.

### Step 2 — Start MongoDB

Make sure MongoDB is running. On Windows:
```
net start MongoDB
```
Or open the **MongoDB Compass** app and connect to `mongodb://localhost:27017`

### Step 3 — Run the app (Development mode)

```bash
npm run dev
```

This starts both:
- **Backend** → http://localhost:5000
- **Frontend** → http://localhost:3000

The database will be **auto-seeded** with all 14 credit cards on first launch.

---

## 📁 Project Structure

```
cc-analyser/
├── client/               ← React Frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── CreditCardImage.js
│       │   └── RangeSlider.js
│       ├── pages/
│       │   ├── HomePage.js      ← Landing page with hero, CC info, privileges, flip banners
│       │   ├── CardsPage.js     ← Card explorer with category tabs
│       │   └── AnalysePage.js   ← 3-step analyser with results
│       ├── App.js
│       ├── App.css
│       └── index.js
├── server/               ← Express + MongoDB Backend
│   ├── models/
│   │   └── Card.js
│   ├── routes/
│   │   ├── cards.js
│   │   └── analyse.js
│   ├── index.js
│   ├── seedData.js        ← Auto-seeds 14 cards on first run
│   └── .env
├── package.json           ← Root scripts
└── README.md
```

---

## 🃏 Cards Included

### Cashback
- SBI Cashback Credit Card
- Axis Bank Cashback Credit Card
- HDFC Millennia Credit Card
- HSBC Live+ Credit Card

### Rewards / Points
- HDFC Regalia Gold Credit Card
- Axis Bank Atlas Credit Card
- Amazon Pay ICICI Bank Credit Card

### Travel
- HSBC TravelOne Credit Card
- IDFC First WOW! Credit Card
- HDFC Millennia (Travel)
- IDFC First Diamond Reserve Credit Card

### Premium
- HDFC Infinia Metal Credit Card
- IDFC First Private Credit Card
- ICICI Emeralde Private Metal Credit Card
- Axis Magnus Credit Card

### Student
- IDFC First WOW! Credit Card (Students)
- Amazon Pay ICICI Credit Card (Students)

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/health` | Server health check |
| GET    | `/api/cards` | Get all cards |
| GET    | `/api/cards?category=cashback` | Get cards by category |
| GET    | `/api/cards/:id` | Get single card by ID |
| POST   | `/api/analyse` | Analyse and rank cards for user profile |

### POST /api/analyse — Request Body
```json
{
  "income": 600000,
  "hasCard": "yes",
  "cardType": "cashback",
  "expenses": {
    "online_shopping": 15000,
    "groceries": 8000,
    "dining": 5000,
    "movies": 2000,
    "travel": 10000,
    "fuel": 3000,
    "utilities": 4000,
    "lifestyle": 6000
  }
}
```

---

## 🔧 Environment Variables (server/.env)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ccanalyser
```

---

## 🏗️ Production Build

```bash
npm run build
```

Builds the React client into `client/build/`. You can serve this with the Express server by adding static file serving.

---

## ✨ Features

- 🏠 **Landing Page** — Hero with animated gradient text, "What is a Credit Card" explainer, 8 privilege cards, and 5 flip-card category banners
- 🃏 **Cards Explorer** — Category tab navigation; cards only shown when a category is clicked
- 🔍 **AI Analyser** — 3-step form with range sliders (income ₹1L–₹40L, expenses ₹0–₹1L), smart scoring engine
- 💳 **Card Visuals** — Real card images with SVG fallback if image fails to load
- 📊 **MongoDB** — Cards stored in database, auto-seeded on first run
- 📱 **Responsive** — Works on mobile, tablet, and desktop
