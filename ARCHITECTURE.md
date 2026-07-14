# KRONOS-01 Core Architecture Specifications
*Product design rules, directories layout, state layers, and performance limits.*

This document details the modular layout guidelines, core provider structures, WebGL canvas configurations, state management rules, and rendering limits governing the *KRONOS-01* system.

---

## 1. Directory Structure Blueprint

The workspace directories are organized as follows:
- **`src/app`**: Housing application configurations, global context providers, routing, and Zustand state stores.
- **`src/config`**: Configuration files for site SEO, animation timings, custom springs, and environment flags.
- **`src/constants`**: Centralized constant datasets (routes list, static projects data, skills catalog).
- **`src/features`**: Standalone layout sections (Hero, About, Projects, Experience, Skills).
- **`src/shared`**: Reusable component units (cards, buttons, form inputs, tooltips).
- **`src/styles`**: Global stylesheet rules and custom Tailwind v4 configurations.
- **`src/three`**: 3D canvas rendering controls, custom GLSL shader assets, meshes, and lights.
- **`src/types`**: Type-safe structures, declarations, and interfaces.
- **`src/utils`**: Core helper tools (className merger, viewport checks, lerp math, debounce, throttles).
- **`src/views`**: Layout entry view components (Landing page viewport, NotFound viewport).

---

## 2. Global State & Context Layers

State in *KRONOS-01* is split between snappy global Zustand stores and unified layout context Providers:

```
                  +--------------------------------+
                  |         RootProvider           |
                  +--------------------------------+
                                  |
    +-----------------+-----------+-----------+------------------+
    |                 |                       |                  |
[Theme]            [Lenis]                 [Motion]           [Cursor]
Persist and sync   Smooth scroll handler   AnimatePresence    Cursor position tracking
classes to body    RAF frames loop         Reduced-motion     Dynamic spotlights variables
```

- **`useSystemStore` (Zustand)**: Controls system diagnostics, calibrations, loading progress, active viewport section index, and interactive custom cursor targets.

---

## 3. WebGL Rendering Protocols

The Three.js scene (built via React Three Fiber) follows strict performance and resource limits to guarantee smooth rendering:
- **DPR Scaling**: Limited strictly to `[1, 2]` to prevent frame lag on high-DPI screens.
- **DPR Performance Monitor**: Dynamically lowers canvas detail (reducing grid divisions, disabling bloom, downscaling geometries) when frame rate decreases.
- **Adaptive Event Listeners**: Pointer interaction calculations are computed relative to client page coordinates rather than the webGL matrix coordinates when hover is not actively focused on 3D meshes.

---

## 4. Coding Standards

- **TypeScript Strictness**: Implicit `any` is prohibited. All interfaces, hooks, parameters, and return types must be fully declared.
- **Atomic Modularity**: Components should receive data via properties (`props`) and delegate state updates to centralized stores rather than defining complex inline state layers.
- **Animation Abstraction**: Animation variants, transitions, and timing parameters must be imported from the centralized animation configuration files instead of being defined inline.
