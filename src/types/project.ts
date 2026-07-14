export interface Milestone {
  date: string
  title: string
  desc: string
}

export interface Metric {
  label: string
  value: string
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  category: 'AI' | 'Machine Learning' | 'Frontend' | 'Backend' | 'Full Stack' | 'Research' | 'Hackathon'
  techStack: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
  duration: string
  status: 'Operational' | 'In Development' | 'Completed' | 'Beta'
  metrics: Metric[]
  image?: string
  problem: string
  solution: string
  features: string[]
  challenges: string[]
  optimizations: string[]
  githubUrl?: string
  liveUrl?: string
  timeline: Milestone[]
}
