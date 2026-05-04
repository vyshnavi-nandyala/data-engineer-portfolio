import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import educationData from '../data/education.json'

interface Certification {
  name: string
  issuer: string
  year: string
  badge: string
  color: string
}

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { degree, certifications } = educationData

  return (
    <section id="education" className="section-padding bg-[#060e1f] relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div ref={ref} className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-purple-400 font-mono text-sm font-medium mb-2 tracking-wider uppercase">Education</p>
          <h2 className="section-heading">
            Academic &{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional
            </span>{' '}
            Training
          </h2>
          <p className="section-subheading">
            Foundation in computer science complemented by industry certifications.
          </p>
        </motion.div>

        {/* Degree */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-base p-8 mb-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-3xl flex-shrink-0 shadow-lg shadow-purple-500/20">
              🎓
            </div>
            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                  <h3 className="text-white text-xl font-bold">{degree.title}</h3>
                  <p className="text-purple-400 font-semibold text-lg">{degree.field}</p>
                  <p className="text-slate-400 mt-1">{degree.institution}</p>
                  <p className="text-slate-500 text-sm">{degree.location}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="inline-block px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 font-semibold text-sm">
                    Class of {degree.year}
                  </span>
                  <p className="text-slate-400 text-sm mt-2">{degree.grade}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-white font-bold text-xl mb-6"
          >
            Professional Certifications
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(certifications as Certification[]).map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="card-base p-5 flex gap-4 items-start hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Badge icon */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-lg`}>
                  {cert.badge.slice(0, 3)}
                </div>
                {/* Info */}
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight">{cert.name}</p>
                  <p className="text-slate-400 text-xs mt-1">{cert.issuer}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs bg-slate-700/50 text-slate-400 border border-slate-600/30">
                    {cert.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Focus statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/15 text-center"
        >
          <p className="text-slate-300 text-lg">
            Committed to continuous learning — staying current with{' '}
            <span className="text-white font-semibold">Snowflake Cortex AI</span>,{' '}
            <span className="text-white font-semibold">dbt Semantic Layer</span>, and{' '}
            <span className="text-white font-semibold">Apache Iceberg</span> for the next generation of data lakes.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
