import type { Project } from '@/types/project'

export const PROJECTS: Project[] = [
  {
    id: 'voiceos-bharat',
    title: 'Voice OS Bharat',
    tagline: 'Multilingual AI speech system for scheme accessibility.',
    description: 'A multilingual voice assistant designed to help non-technical users access government scheme resources through native verbal speech queries.',
    category: 'AI',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'LangChain', 'Whisper', 'RAG'],
    difficulty: 'Expert',
    duration: '6 Months',
    status: 'Operational',
    metrics: [
      { label: 'Latency', value: '< 1.5s' },
      { label: 'Languages', value: 'Multilingual' },
      { label: 'Architecture', value: 'Hybrid RAG' }
    ],
    image: '/voiceos.png',
    problem: 'Non-technical vernacular speakers are often excluded from modern digital government portals due to language blocks and complex keyboard input requirements.',
    solution: 'Voice OS Bharat handles voice input in native languages, converting speech to text (STT), classifying intents, retrieving documents through RAG, and converting outputs back to speech (TTS).',
    features: [
      'Multilingual RAG retrieval system using LangChain nodes.',
      'Low-latency audio query streaming using optimized Whisper layers.',
      'Offline/Online hybrid processing logic for low bandwidth constraints.'
    ],
    challenges: [
      'Minimizing total round-trip response latency for real-time speech interaction.',
      'Compensating for voice accent and regional slang variation.'
    ],
    optimizations: [
      'Implemented local caching for common government schemes query intents.',
      'Quantized classification models to run low-latency intent matching pipelines.'
    ],
    githubUrl: 'https://github.com/naitikshaxma',
    liveUrl: 'https://voice-os-bhaarat.vercel.app',
    timeline: [
      { date: 'Oct 2025', title: 'Beta Release', desc: 'Shipped first voice query pipeline supporting local accents.' },
      { date: 'Jan 2026', title: 'Latency Upgrade', desc: 'Reduced voice pipeline execution down to 1.5 seconds.' }
    ]
  },
  {
    id: 'skillmap-ai',
    title: 'Skill Map AI',
    tagline: 'AI recommendation platform for career skill-gap analysis.',
    description: 'An AI-powered mind mapping utility analyzing role descriptions and suggesting custom, interactive learning paths.',
    category: 'Machine Learning',
    techStack: ['Python', 'NLP', 'FastAPI', 'MongoDB', 'LangChain'],
    difficulty: 'Hard',
    duration: '3 Months',
    status: 'Operational',
    metrics: [
      { label: 'API Speed', value: '120ms' },
      { label: 'Data Store', value: 'MongoDB' },
      { label: 'Extractors', value: 'NLP-based' }
    ],
    image: '/skillmap.png',
    problem: 'Engineers find it hard to track skill-gaps and find structure in learning curves across evolving technology stacks.',
    solution: 'Skill Map AI extracts requirements using NLP models and maps matching nodes to dynamic learning tracks served via FastAPI.',
    features: [
      'NLP-based automated text classification and skill extracting.',
      'Dynamic mind map node trees suggesting study references.',
      'Real-time learning paths adjusting dynamically to industry metric changes.'
    ],
    challenges: [
      'Extracting accurate skills from unstructured text and job specs.',
      'Serving node recommendations in real time without lag.'
    ],
    optimizations: [
      'Optimized FastAPI endpoint JSON serializers for low memory foot prints.',
      'Cached common career path node maps in indexed MongoDB collections.'
    ],
    githubUrl: 'https://github.com/naitikshaxma',
    liveUrl: 'https://skill-map-ai.vercel.app',
    timeline: [
      { date: 'Nov 2025', title: 'NLP Models', desc: 'Trained text classifiers on public engineering role sheets.' },
      { date: 'Feb 2026', title: 'Release Candidate', desc: 'Shipped FastAPI recommendation paths to beta students.' }
    ]
  },
  {
    id: 'campusgenie',
    title: 'CampusGenie',
    tagline: 'Academic orchestration platform.',
    description: 'A student management and portal platform optimizing course enrollment, grades tracking, and scheduling.',
    category: 'Full Stack',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'HTML', 'CSS'],
    difficulty: 'Hard',
    duration: '4 Months',
    status: 'Completed',
    metrics: [
      { label: 'User Count', value: '1,200+' },
      { label: 'DB Latency', value: '35ms' },
      { label: 'Uptime', value: '99.9%' }
    ],
    image: '/campusgenie.png',
    problem: 'University administration portals suffer from high latency, overlapping course schedules, and manual grades spreadsheets.',
    solution: 'CampusGenie integrates course catalogs, calendar builders, and score telemetry under a unified Node.js API cluster.',
    features: [
      'Conflict-free class calendar and enrollment scheduler.',
      'Sleek student dashboard tracking scores and assignments.',
      'Custom teacher panels for quick grading submissions.'
    ],
    challenges: [
      'Mitigating schedule collision race conditions during enrollment days.',
      'Optimizing complex database joins across scores and classes.'
    ],
    optimizations: [
      'Built indexed search keys for all course registry catalog indexes.',
      'Offloaded batch report exports to secondary async queues.'
    ],
    githubUrl: 'https://github.com/naitikshaxma',
    liveUrl: 'https://github.com/naitikshaxma',
    timeline: [
      { date: 'Dec 2025', title: 'Beta Release', desc: 'Deployed schedule builder to the engineering school.' },
      { date: 'May 2026', title: 'Platform Launch', desc: 'Deployed full-grade dashboards to local university accounts.' }
    ]
  },
  {
    id: 'glamis-ai',
    title: 'GLAMIS AI Platform',
    tagline: 'Emotion analysis interviewer platform.',
    description: 'An AI-powered assessment system evaluating candidate facial expressions and vocal response patterns.',
    category: 'AI',
    techStack: ['Python', 'OpenCV', 'WebRTC', 'FastAPI', 'MongoDB'],
    difficulty: 'Expert',
    duration: '5 Months',
    status: 'Beta',
    metrics: [
      { label: 'Precision', value: '95%' },
      { label: 'Response', value: '180ms' },
      { label: 'Video Channels', value: 'WebRTC' }
    ],
    image: '/glamis.png',
    problem: 'Traditional resume screenings fail to test emotional responses, soft-skills, and speech delays accurately.',
    solution: 'GLAMIS AI leverages computer vision and voice wave analyses to rate soft skills and confidence levels.',
    features: [
      'Real-time emotion mesh analysis with OpenCV frames tracking.',
      'WebRTC video streams capturing vocal response latency.',
      'Automated scoring cards exported directly as recruiters reports.'
    ],
    challenges: [
      'Processing video frames in real time without lag.',
      'Ensuring video capture format consistency across mobile and desktop.'
    ],
    optimizations: [
      'Compressed incoming WebRTC video resolutions to conserve server memory.',
      'Offloaded voice frequency FFT analysis to background workers.'
    ],
    githubUrl: 'https://github.com/naitikshaxma',
    liveUrl: 'https://github.com/naitikshaxma',
    timeline: [
      { date: 'Jan 2026', title: 'CV Pipeline', desc: 'Trained OpenCV expression meshes on sentiment benchmarks.' },
      { date: 'April 2026', title: 'Beta Trial', desc: 'Integrated automated scoring report modules.' }
    ]
  }
]
export {}
