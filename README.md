# ResQ Najda — نجدة

> **Emergency response platform** — SOS trigger, live incident map & citizen video reports for Tunisia.

---

## ✨ Features

- 🆘 **One-tap SOS** — instantly alerts emergency contacts with your GPS location
- 🗺️ **Live incident map** — real-time community-reported alerts via Leaflet
- 📹 **Citizen feed** — TikTok-style video evidence reports
- 🌙 **Dark / Light mode** — toggle in the top header; preference saved automatically
- 🌐 **Multi-language** — Arabic (RTL), French & English
- 🔔 **Push notifications** — in-app alert bell for updates
- 🔒 **Supabase Auth** — secure email/password sign-in & sign-up

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
- Node.js (v18 or higher recommended)
- npm or yarn (or bun)

### Installation

```bash
# Clone and enter the project
git clone https://github.com/AM1NE05/ResQ.git
cd ResQ

# Install dependencies
npm install

# Setup environment variables
cp env .env
```
Open `.env` and set your Supabase project values:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Running the Application Locally

To start the development server, run:
```bash
npm run dev
```

Open your browser and visit `http://localhost:8080` (or the port specified in your terminal) to view the application.

> The dev server binds to port **8080** by default (configured via `@lovable.dev/vite-tanstack-config`).

### Dark / Light Mode

Click the **moon / sun icon** in the top-right of the header to toggle themes.  
Your preference is saved in `localStorage` and respects your OS setting on first visit.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | TanStack Start (React 19) |
| Styling | Tailwind CSS v4 + custom design tokens |
| Auth & DB | Supabase |
| Routing | TanStack Router |
| Maps | Leaflet + react-leaflet |
| UI components | Radix UI / shadcn-style |
| Fonts | Cairo (Arabic) + Inter |

---

## 📦 Building for Production

To create a production build, run:
```bash
npm run build
```

Output lands in `dist/`. The entry point is `dist/server/server.js` (TanStack Start SSR).

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

MIT
