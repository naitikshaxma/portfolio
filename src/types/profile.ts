export interface Skill {
  name: string
  category: 'Frontend' | 'Backend' | 'AI' | 'Machine Learning' | 'Cloud' | 'Databases' | 'DevOps' | 'Tools' | 'Programming Languages'
  years: number
  projects: string[]
  confidence: number // percentage
  details: string
}

export interface TimelineItem {
  id: string
  title: string
  company: string
  type: 'Internship' | 'Freelance' | 'Leadership' | 'Project' | 'Open Source'
  dateRange: string
  description: string
  highlights: string[]
}

export interface EducationRecord {
  institution: string
  degree: string
  dateRange: string
  cgpa: string
  coursework: string[]
  highlights: string[]
}

export interface Certification {
  id: string
  title: string
  issuer: string
  credentialId: string
  date: string
  url: string
}

export interface ValueCard {
  title: string
  description: string
}
