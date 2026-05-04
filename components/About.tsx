import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const stats = [
  { value: '6+', label: 'Years Experience', sub: 'production systems' },
  { value: '50M+', label: 'Records / Day', sub: 'processed at peak' },
  { value: '200+', label: 'Data Pipelines', sub: 'built & maintained' },
  { value: '$2M+', label: 'Cost Savings', sub: 'delivered to clients' },
]

const strengths = [
  { icon: '⚡', title: 'Pipeline Architecture', desc: 'Designing fault-tolerant, scalable data pipelines that handle millions of records reliably.' },
  { icon: '☁️', title: 'Cloud Infrastructure', desc: 'AWS-native solutions using S3, Glue, Lambda, EventBridge, Redshift, and Snowflake.' },
  { icon: '📊', title: 'Data Modeling', desc: 'Star schemas, Kimball dimensional modeling, dbt transformations, and mart design.' },
  { icon: '🎯', title: 'Business Impact', desc: 'Translating raw data into measurable outcomes — faster reports, lower costs, better decisions.' },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="section-padding bg-[#020817] relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div ref={ref} className="container-max relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-blue-400 font-mono text-sm font-medium mb-2 tracking-wider uppercase">About Me</p>
          <h2 className="section-heading">
            Turning raw data into{' '}
            <span className="gradient-text">business intelligence</span>
          </h2>
          <p className="section-subheading">
            Senior Data Engineer with 6+ years building production data systems that scale.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-slate-300 text-lg leading-relaxed">
              I&apos;m a Senior Data Engineer currently at{' '}
              <span className="text-white font-semibold">Waste Management</span> via{' '}
              <span className="text-blue-400">Infosys</span> in Houston, TX — architecting the data foundation
              that powers analytics across North America&apos;s largest environmental services company.
            </p>
            <p className="text-slate-400 leading-relaxed">
              My expertise spans the full data engineering lifecycle: ingestion, transformation, warehousing,
              and visualization. I specialize in <span className="text-white">Snowflake</span>, <span className="text-white">dbt</span>,{' '}
              <span className="text-white">AWS</span>, <span className="text-white">Apache Airflow</span>,{' '}
              <span className="text-white">Python</span>, and <span className="text-white">Power BI</span> —
              building pipelines that are not just functional, but production-grade, monitored, and maintainable.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I&apos;m driven by measurable impact. Every pipeline I build is designed to reduce latency,
              cut costs, or unlock insights that weren&apos;t previously possible. I&apos;ve led migrations,
              mentored engineers, and established data engineering practices adopted across organizations.
            </p>

            {/* Core stack */}
            <div>
              <p className="text-slate-300 font-semibold mb-3">Core Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {['Snowflake', 'dbt', 'AWS Glue', 'Apache Airflow', 'Python', 'SQL', 'Power BI', 'Terraform', 'PySpark', 'Redshift'].map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            {/* Location + status */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Houston, TX
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to senior opportunities
              </div>
            </div>
          </motion.div>

          {/* Stats + strengths */}
          <div className="space-y-6">
            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="card-base p-5 text-center"
                >
                  <div className="text-3xl font-extrabold gradient-text-blue mb-1">{stat.value}</div>
                  <div className="text-white text-sm font-semibold">{stat.label}</div>
                  <div className="text-slate-500 text-xs mt-1">{stat.sub}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-3"
            >
              {strengths.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-[#0a1628]/60 border border-blue-500/10 hover:border-blue-500/25 transition-colors"
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-slate-400 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
