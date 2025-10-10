# 🌍 Traveler — Tour Management System (Frontend)

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=flat-square)](https://traveler-place.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=flat-square&logo=github)](https://github.com/ismailjosim/tour-management-system-client)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://vercel.com/)

> A modern and scalable **React + TypeScript** frontend for managing tours, bookings, guides, and earnings — designed for travelers, tour guides, and admins.

---

## 🖼️ Preview

![Traveler Dashboard](./public/screenshot.png)

---

## 🔗 Related Repositories

- **Backend API:** [Traveler Server](https://github.com/ismailjosim/tour-management-system-server.git)

---

## ✨ Core Features

### 👤 User Features

- 🔍 **Discover Tours** — Explore curated tours with dynamic filters
- ❤️ **Wishlist & Favorites** — Save tours for later
- 🧾 **Booking System** — Secure and seamless tour booking
- ⭐ **Review & Rating System** — Submit and view feedback
- 📧 **Email Notifications** — Instant booking confirmations
- 🔒 **Authentication** — Secure login & registration (JWT based)
- 📱 **Fully Responsive** — Optimized for all devices

### 🧭 Guide Features

- 📊 **Dashboard Overview** — View bookings, earnings, and performance
- ➕ **Create & Manage Tours** — Add, edit, or delete your tours
- 📅 **Schedule Management** — Keep track of upcoming tours
- 💰 **Earnings Tracking** — View total and monthly revenue
- 💬 **Communication Panel** — Interact with travelers easily

### 🛠️ Admin Features

- 📊 **Comprehensive Dashboard**
- 🧍‍♂️ **User Management** — Manage all user accounts
- 🧭 **Tour Control** — Approve, edit, or remove any tour
- 📈 **Analytics** — Platform statistics and insights

---

## 🎨 UI/UX Highlights

- Modern and minimalist layout
- Built with **shadcn/ui** and **Radix UI** primitives
- **Lucide Icons** for consistent visuals
- Toasts, modals, and animated transitions
- Accessibility-ready (keyboard + ARIA)
- Dark mode support (via `next-themes`)

---

## 🧩 Tech Stack

| Category             | Technologies              |
| -------------------- | ------------------------- |
| **Framework**        | React 19 + TypeScript 5   |
| **Styling**          | Tailwind CSS 4, shadcn/ui |
| **Routing**          | React Router v7           |
| **State Management** | Redux Toolkit + RTK Query |
| **Validation**       | Zod + React Hook Form     |
| **APIs**             | Axios with interceptors   |
| **Maps & Charts**    | Leaflet + Recharts        |
| **Notifications**    | Sonner + SweetAlert2      |
| **Animations**       | GSAP + tw-animate-css     |
| **Build Tool**       | Vite 7                    |
| **Hosting**          | Vercel                    |

---

## ⚙️ Project Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/ismailjosim/tour-management-system-client.git
cd tour-management-system-client
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Configure Environment

Create a `.env` file at the project root:

```env
VITE_API_URL=https://your-backend-api.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

> ⚠️ All variables must start with `VITE_` to be accessible in the app.

### 4️⃣ Run Development Server

```bash
npm run dev
```

Open ➜ [http://localhost:5173](http://localhost:5173)

### 5️⃣ Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

---

## 🧱 Folder Structure

```
src/
├── assets/                  # Static assets
├── components/
│   ├── layout/              # Shared layout components
│   ├── modules/             # Dashboard & feature modules
│   └── ui/                  # Reusable UI components
├── config/                  # Global app config
├── constants/               # Constant values
├── context/                 # React Context providers
├── hooks/                   # Custom React hooks
├── Pages/                   # Page components (Home, Dashboard, etc.)
├── Providers/               # Context providers (Theme, Auth)
├── redux/
│   ├── app/                 # Store setup & base API config
│   └── features/            # Feature slices (auth, tours, etc.)
├── routes/                  # Application routes
├── schemas/                 # Zod validation schemas
├── styles/                  # Global & Tailwind styles
├── types/                   # TypeScript types
├── utils/                   # Helper utilities
├── App.tsx                  # Root component
├── main.tsx                 # Entry point
└── vite-env.d.ts            # Vite environment types
```

---

## 📦 Key Dependencies

| Package                                | Purpose            |
| -------------------------------------- | ------------------ |
| `react`, `react-dom`                   | UI rendering       |
| `@reduxjs/toolkit`, `react-redux`      | State management   |
| `react-router`                         | Routing system     |
| `axios`                                | API communication  |
| `react-hook-form`, `zod`               | Form validation    |
| `tailwindcss`, `shadcn/ui`, `radix-ui` | Styling            |
| `leaflet`, `react-leaflet`             | Interactive maps   |
| `recharts`                             | Data visualization |
| `sonner`, `sweetalert2`                | Notifications      |
| `lucide-react`                         | Icon set           |

---

## 🔐 Authentication Flow

1. User logs in or registers via form
2. Server issues a JWT token
3. Token stored in `localStorage`
4. Axios interceptors attach the token to every request
5. Protected routes validate session and redirect unauthenticated users

---

## 🚀 Deployment

### 🧭 Deploy on Vercel (Recommended)

1. Import your GitHub repo on [Vercel](https://vercel.com/)
2. Configure build settings:
   - **Framework:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Add `.env` variables under **Project → Settings → Environment Variables**
4. Deploy 🚀

---

## 📈 Performance Optimizations

- Route-based **code splitting**
- **Lazy loading** components & images
- **Memoization** (`useMemo`, `useCallback`)
- **Tree shaking** with Vite
- Optimized **bundle size** and build times

---

## 🔮 Roadmap

- [ ] Progressive Web App (PWA) support
- [ ] i18n (Multi-language)
- [ ] Social login (Google, Facebook)
- [ ] 360° virtual tour preview
- [ ] Real-time notifications (WebSocket)
- [ ] AI-based tour recommendations

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m "Add some AmazingFeature"`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🧑‍💻 Developer

**Ismail Josim**

- 🌐 [Portfolio](https://ismailjosim.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/ismailjosim)
- 🐙 [GitHub](https://github.com/ismailjosim)
- 📧 [ismailjosim@yahoo.com](mailto:ismailjosim@yahoo.com)

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

⭐ **Star this project** if you find it helpful!

[Live Demo](https://traveler-place.vercel.app/) • [Report Bug](https://github.com/ismailjosim/tour-management-system-client/issues) • [Request Feature](https://github.com/ismailjosim/tour-management-system-client/issues)

Made with ❤️ by [Ismail Josim](https://github.com/ismailjosim)

</div>
