# KRONOS-01: NEXT-GEN PORTFOLIO ENGINE
*A premium, futuristic developer dashboard and portfolio workspace.*

This project represents the production implementation of the **KRONOS-01** design blueprint. It features dynamic WebGL components, smooth scroll physics, custom cursor interactions, responsive grids, and clean visual layouts built on React 19, TypeScript, Tailwind CSS v4, and Three.js.

---

## 🛠️ Technology Stack
- **Framework:** React 19 + Vite
- **Styles:** Tailwind CSS v4 (using native Vite compilation)
- **3D Graphics:** Three.js + React Three Fiber + Drei
- **Motion & Transitions:** GSAP (ScrollTrigger) + Framer Motion
- **Scroll Physics:** Lenis Scroll
- **State Management:** Zustand
- **Languages:** TypeScript
- **Testing:** Vitest + React Testing Library + jsdom

---

## 📂 Core Folder Architecture
The project structure follows an enterprise-ready modular structure. Key folders:
- `src/app/`: Centralized providers (Lenis, Theme, Motion, Toast, Cursor) and routing.
- `src/config/`: Configuration rules for SEO, theme, motion timings, and environment checking.
- `src/constants/`: Central static data structures (skills, projects, routing, social parameters).
- `src/three/`: 3D canvas rendering controls, custom GLSL shader modules, meshes, and lights.
- `src/utils/`: Layout utilities (className merger, viewport checks, math interpolation, performance helpers).
- `src/types/`: Structured TypeScript interfaces and declarations.

Detailed architecture information is located in the [ARCHITECTURE.md](file:///c:/Users/sharm/OneDrive/Desktop/fungroport/ARCHITECTURE.md) guide.

---

## 🚀 Development Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment variables:**
   - Copy `.env.example` to `.env`.
   - Add your EmailJS public credentials.

3. **Launch Dev Server:**
   ```bash
   npm run dev
   ```

4. **Compile Production Bundle:**
   ```bash
   npm run build
   ```

---

## 🧪 Testing Suite

Tests are managed via Vitest and React Testing Library:

- **Run all unit tests:**
  ```bash
  npm run test
  ```
- **Watch mode:**
  ```bash
  npx vitest
  ```
