import type { Project } from '@/types'

export const PROJECTS_DATA: Project[] = [
  {
    id: 'project-1',
    title: 'KRONOS-01 Engine',
    description: 'High-performance interactive WebGL workspace container with dynamic shader displacement meshes.',
    tags: ['React 19', 'R3F', 'GLSL', 'TypeScript'],
    link: 'https://kronos.dev',
    github: 'https://github.com',
    role: 'Principal Architect',
    year: '2026',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Nebula Analytics',
    description: 'Decentralized real-time server diagnostics board tracking GPU loads and bundle sizes.',
    tags: ['Next.js', 'Zustand', 'Tailwind', 'Tremor'],
    link: 'https://nebula.dev',
    github: 'https://github.com',
    role: 'Lead Developer',
    year: '2025',
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Aether OS',
    description: 'Minimalist desktop-in-browser environment powered by GSAP and custom canvas managers.',
    tags: ['React', 'GSAP', 'Lenis', 'Tailwind'],
    link: 'https://aether.dev',
    github: 'https://github.com',
    role: 'Motion Designer',
    year: '2025',
    featured: false,
  },
]
