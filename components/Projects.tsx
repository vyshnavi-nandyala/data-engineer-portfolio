import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import projectsData from '../data/projects.json'

interface Project {
  id: number
  title: string
  category: string
  problem: string
  solution: string
  impact: string
  description: string
  tech: string[]
  github: string
  gradient: string
  icon: string
}

const filters = [
  { label: 'All', value: 'All' },
  { label: 'Data Pipeline', value: 'DataPipeline' },
  { label: 'Cloud Infra', value: 'CloudInfra' },
  { label: 'Analytics', value: 'Analytics' },
]

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [activeFilter, setActiveFilter] = useState('All')

  const projects = projectsData as Project[]
  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="section-padding bg-[#020817] relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div ref={ref} className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-blue-400 font-mono text-sm font-medium mb-2 tracking-wider uppercase">Portfolio</p>
          <h2 className="section-heading">
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subheading">
            Production-grade data engineering projects demonstrating real-world impact.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeFilter === f.value
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-[#0a1628] border border-blue-500/15 text-slate-400 hover:text-white hover:border-blue-500/30'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto flex items-center text-slate-500 text-sm">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-base overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Card header with gradient */}
                <div className={`h-36 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 grid-pattern opacity-20" />
                  {/* Icon */}
                  <div className="absolute top-4 left-5 text-4xl">{project.icon}</div>
                  {/* Category badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-black/30 text-white text-xs font-semibold border border-white/20">
                      {project.category === 'DataPipeline' ? 'Data Pipeline'
                        : project.category === 'CloudInfra' ? 'Cloud Infra'
                        : project.category}
                    </span>
                  </div>
                  {/* Floating decorative elements */}
                  <div className="absolute bottom-3 right-4 font-mono text-white/15 text-xs">
                    {project.tech.slice(0, 2).join(' · ')}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-3 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Problem / Solution / Impact */}
                  <div className="space-y-3 mb-5">
                    <div className="flex gap-2 text-sm">
                      <span className="text-red-400 font-semibold flex-shrink-0 w-16">Problem</span>
                      <span className="text-slate-400">{project.problem}</span>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <span className="text-blue-400 font-semibold flex-shrink-0 w-16">Solution</span>
                      <span className="text-slate-400">{project.solution}</span>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <span className="text-green-400 font-semibold flex-shrink-0 w-16">Impact</span>
                      <span className="text-slate-300 font-medium">{project.impact}</span>
                    </div>
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-tag text-xs">{t}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-blue-500/10">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 text-sm font-medium bg-[#0a1628] border border-blue-500/15 hover:border-blue-500/35 hover:text-white transition-all"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View Code
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-300 text-sm font-medium bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 hover:text-blue-200 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Project
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 mb-4">See all projects on GitHub</p>
          <a
            href="https://github.com/vyshnavi-nandyala"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-blue-500/25 text-blue-400 font-semibold hover:border-blue-400 hover:text-blue-300 hover:bg-blue-500/5 transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            github.com/vyshnavi-nandyala
          </a>
        </motion.div>
      </div>
    </section>
  )
}
