import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import experienceData from '../data/experience.json'

interface ExperienceItem {
  id: number
  role: string
  company: string
  client: string | null
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
  tech: string[]
}

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" className="section-padding bg-[#060e1f] relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div ref={ref} className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-purple-400 font-mono text-sm font-medium mb-2 tracking-wider uppercase">Career</p>
          <h2 className="section-heading">
            Work{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="section-subheading">
            8 years building production data systems across enterprise environments.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[15px] md:left-[27px] top-0 bottom-0 w-px timeline-line hidden sm:block" />

          <div className="space-y-10">
            {(experienceData as ExperienceItem[]).map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <div className={`absolute left-0 top-6 w-8 h-8 rounded-full border-2 hidden sm:flex items-center justify-center text-xs font-bold z-10
                  ${exp.current
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400 shadow-lg shadow-blue-500/30'
                    : 'bg-[#0a1628] border-blue-500/40 text-blue-400'
                  }`}
                >
                  {exp.current ? '★' : i + 1}
                </div>

                {/* Card */}
                <div className={`card-base p-6 md:p-8 ${exp.current ? 'border-blue-500/30 shadow-lg shadow-blue-500/5' : ''}`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                    {/* Role info */}
                    <div>
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h3 className="text-white text-xl font-bold">{exp.role}</h3>
                        {exp.current && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/15 text-green-400 border border-green-500/25">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-blue-400 font-semibold text-lg">
                        {exp.company}
                        {exp.client && (
                          <span className="text-slate-400 font-normal text-sm ml-2">{exp.client}</span>
                        )}
                      </p>
                    </div>

                    {/* Dates + location */}
                    <div className="flex-shrink-0 text-right">
                      <p className="text-slate-300 font-medium text-sm">
                        {exp.startDate} — {exp.endDate}
                      </p>
                      <p className="text-slate-500 text-sm flex items-center gap-1 justify-end mt-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {exp.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed mb-6">{exp.description}</p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <p className="text-slate-300 font-semibold text-sm mb-3">Key Achievements</p>
                    <ul className="space-y-2.5">
                      {exp.achievements.map((ach, j) => (
                        <li key={j} className="flex items-start gap-3 text-slate-400 text-sm">
                          <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/15 flex items-center justify-center">
                            <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span dangerouslySetInnerHTML={{
                            __html: ach.replace(/(\d+[%+MK]+|\$[0-9M+]+)/g, '<strong class="text-white">$1</strong>')
                          }} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
