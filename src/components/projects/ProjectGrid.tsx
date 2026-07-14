import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '@/constants/projects'
import { ProjectCard } from '@/shared/Card'
import { ProjectModal } from './ProjectModal'
import type { Project } from '@/types/project'

export function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const categories = ['All', 'AI', 'Machine Learning', 'Frontend', 'Backend', 'Full Stack', 'Research', 'Hackathon']

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesFilter = filter === 'All' || project.category === filter
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.tagline.toLowerCase().includes(search.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(search.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  return (
    <div id="projects" className="w-full text-white space-y-12 select-none">
      {/* Grid section header */}
      <div className="space-y-3">
        <h2 className="text-display-md font-bold tracking-tight font-display">Featured Projects</h2>
        <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
          PROJECTS // ARCHITECTURES // SYSTEM DESIGN
        </p>
      </div>

      {/* Filter lists and search query box */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-150 ${
                filter === cat
                  ? 'bg-[#00b4d8] text-[#0d0f12] font-bold shadow-[0_0_10px_rgba(0,180,216,0.3)]'
                  : 'border border-[#2b303c] text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full md:w-80 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects or stack..."
            className="w-full bg-[#11141a] text-white border border-[#2b303c] rounded-lg px-4 py-2.5 text-xs font-mono placeholder-gray-500 focus:outline-none focus:border-[#00b4d8] transition-colors"
          />
        </div>
      </div>

      {/* Projects list container */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.techStack.slice(0, 3)}
                image={project.image}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Expanded case detail modal overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
