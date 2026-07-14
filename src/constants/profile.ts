import type { Skill, TimelineItem, EducationRecord, Certification, ValueCard } from '@/types/profile'

export const SKILLS: Skill[] = [
  {
    name: 'Python',
    category: 'Programming Languages',
    years: 2.5,
    projects: ['Skill Map AI', 'Voice OS Bharat'],
    confidence: 90,
    details: 'Expert in developing AI recommendation workflows, FastAPI servers, and data transformation scripts.'
  },
  {
    name: 'Java',
    category: 'Programming Languages',
    years: 3,
    projects: ['CampusGenie'],
    confidence: 85,
    details: 'Strong focus on core object-oriented structures, multithreading, and algorithmic optimizations.'
  },
  {
    name: 'JavaScript',
    category: 'Programming Languages',
    years: 2.5,
    projects: ['Voice OS Bharat', 'CampusGenie'],
    confidence: 88,
    details: 'Advanced asynchronous event-loop logic, DOM manipulation, and dynamic module rendering.'
  },
  {
    name: 'React.js',
    category: 'Frontend',
    years: 2,
    projects: ['KRONOS-01 Portfolio', 'CampusGenie'],
    confidence: 86,
    details: 'Experienced in custom hooks, context state synchronization, and component hierarchy design.'
  },
  {
    name: 'Node.js / Express.js',
    category: 'Backend',
    years: 2.5,
    projects: ['Voice OS Bharat', 'CampusGenie'],
    confidence: 87,
    details: 'High-throughput request routers, custom session middlewares, and scalable API pipelines.'
  },
  {
    name: 'FastAPI',
    category: 'Backend',
    years: 2,
    projects: ['Skill Map AI'],
    confidence: 84,
    details: 'Fast API schemas creation, type-hints inference, and connection pooling integration.'
  },
  {
    name: 'MongoDB',
    category: 'Databases',
    years: 2,
    projects: ['Voice OS Bharat', 'Skill Map AI'],
    confidence: 85,
    details: 'Aggregation pipelines optimization, custom indexing, and high-frequency writes scaling.'
  },
  {
    name: 'RAG Pipelines & LangChain',
    category: 'AI',
    years: 2,
    projects: ['Voice OS Bharat', 'Skill Map AI'],
    confidence: 86,
    details: 'Advanced text chunking algorithms, vector embeddings retrievals, and intent classifier routing.'
  }
]

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'ach-iitdelhi',
    title: 'Top 5 Finalist',
    company: 'IIT Delhi Sprint Hack 2026',
    type: 'Leadership',
    dateRange: 'February 2026',
    description: 'Pitched and designed an AI application prototype, earning a top-5 standing out of nationwide hackathon entries.',
    highlights: [
      'Engineered real-time response flows under high-pressure sprint environments.',
      'Presented technical architectures directly to industry specialists and startup mentors.'
    ]
  },
  {
    id: 'milestone-voiceos',
    title: 'Flagship Project Launch',
    company: 'Voice OS Bharat',
    type: 'Project',
    dateRange: '2026',
    description: 'Designed and engineered a multilingual voice-controlled AI assistant supporting accessibility to government schemes in regional languages.',
    highlights: [
      'Optimized query pipelines using a custom RAG architecture, reducing response latency below 1.5s.',
      'Deployed live models with STT, intent classification, and TTS logic.'
    ]
  },
  {
    id: 'milestone-skillmap',
    title: 'AI Recommendation System Release',
    company: 'Skill Map AI',
    type: 'Project',
    dateRange: '2025',
    description: 'Built a modular web platform analyzing skill-gaps and rendering personalized learning roads.',
    highlights: [
      'Coded NLP-based skill extraction layers serving recommendations through FastAPI endpoints.',
      'Connected decoupled Python services to document-based MongoDB databases.'
    ]
  }
]

export const EDUCATION: EducationRecord = {
  institution: 'GLA University, Mathura',
  degree: 'Bachelor of Technology in Computer Science & Engineering',
  dateRange: '2024 - 2028',
  cgpa: '7.0 / 10',
  coursework: ['Data Structures & Algorithms', 'Database Systems', 'Natural Language Processing', 'RAG Pipelines', 'Computer Networks'],
  highlights: [
    'Senior Secondary (CBSE) // Symboyziya School (2024) - 76%',
    'Secondary (CBSE) // Baluni Public School (2022) - 82%'
  ]
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-ai900',
    title: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
    issuer: 'Microsoft',
    credentialId: 'MS-AI900-LATEST',
    date: '2026',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/'
  },
  {
    id: 'cert-az900',
    title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    credentialId: 'MS-AZ900-LATEST',
    date: '2025',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/'
  }
]

export const VALUES: ValueCard[] = [
  {
    title: 'Clean Architecture',
    description: 'Structuring components and directories with strict modular splits to guarantee infinite scalability and painless updates.'
  },
  {
    title: 'High Performance',
    description: 'Achieving stable 60 FPS in interactive scenes and minimizing layout shifts through efficient memory lifecycle management.'
  },
  {
    title: 'Accessibility & Inclusion',
    description: 'Ensuring that interactive elements comply with WCAG guidelines, supporting keyboard nav and assistive screen readers.'
  },
  {
    title: 'Continuous Learning',
    description: 'Actively researching, experimenting, and integrating modern frameworks to stay at the cutting edge of software architecture.'
  }
]
export {}
