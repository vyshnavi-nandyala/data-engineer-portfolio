import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import skillsData from '../data/skills.json'

interface Skill {
  name: string
  level: 'Expert' | 'Advanced' | 'Working'
  score: number
}

interface SkillCategory {
  category: string
  icon: string
  skills: Skill[]
}

const levelConfig = {
  Expert:   { color: 'bg-blue-500',   text: 'text-blue-400',   border: 'border-blue-500/30',   bg: 'bg-blue-500/10' },
  Advanced: { color: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/10' },
  Working:  { color: 'bg-cyan-500',   text: 'text-cyan-400',   border: 'border-cyan-500/30',   bg: 'bg-cyan-500/10' },
}

const iconMap: Record<string, string> = {
  pipeline: '⚡',
  database: '🗄️',
  cloud: '☁️',
  chart: '📊',
  code: '💻',
  shield: '🛡️',
}

function SkillBar({ skill, animate }: { skill: Skill; animate: boolean }) {
  const cfg = levelConfig[skill.level]
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${cfg.text} ${cfg.border} ${cfg.bg}`}>
          {skill.level}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#162952]/60 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${cfg.color}`}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${skill.score}%` : 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = skillsData as SkillCategory[]

  return (
    <section id="skills" className="section-padding bg-[#020817] relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div ref={ref} className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-cyan-400 font-mono text-sm font-medium mb-2 tracking-wider uppercase">Expertise</p>
          <h2 className="section-heading">
            Skills &{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Capability Matrix
            </span>
          </h2>
          <p className="section-subheading">
            Hands-on experience across the modern data engineering stack.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          {(Object.entries(levelConfig) as [keyof typeof levelConfig, typeof levelConfig[keyof typeof levelConfig]][]).map(([level, cfg]) => (
            <div key={level} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${cfg.color}`} />
              <span className={`text-sm font-medium ${cfg.text}`}>{level}</span>
            </div>
          ))}
        </motion.div>

        {/* Skill grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className={`card-base p-6 cursor-pointer transition-all duration-300 ${
                activeCategory === cat.category
                  ? 'border-blue-500/40 shadow-lg shadow-blue-500/10 scale-[1.02]'
                  : ''
              }`}
              onClick={() => setActiveCategory(activeCategory === cat.category ? null : cat.category)}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{iconMap[cat.icon] || '🔧'}</span>
                <h3 className="text-white font-bold text-base">{cat.category}</h3>
              </div>

              <div>
                {cat.skills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill as Skill} animate={inView} />
                ))}
              </div>

              {/* Expert count */}
              <div className="mt-4 pt-4 border-t border-blue-500/10 flex items-center justify-between text-xs text-slate-500">
                <span>
                  {cat.skills.filter(s => s.level === 'Expert').length} Expert ·{' '}
                  {cat.skills.filter(s => s.level === 'Advanced').length} Advanced ·{' '}
                  {cat.skills.filter(s => s.level === 'Working').length} Working
                </span>
                <span>{cat.skills.length} skills</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All tech tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 p-6 rounded-2xl bg-[#0a1628]/60 border border-blue-500/10"
        >
          <p className="text-slate-400 text-sm font-medium mb-4">Additional tools & technologies:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Snowflake Cortex', 'AWS DynamoDB', 'AWS SageMaker', 'AWS EC2', 'AWS SQS',
              'AWS SNS', 'Docker', 'Git', 'GitHub Copilot', 'VS Code', 'Jira', 'Confluence',
              'Apache Kafka', 'Delta Lake', 'dbt Cloud', 'Fivetran', 'Stitch'
            ].map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
