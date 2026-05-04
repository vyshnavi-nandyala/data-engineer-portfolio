import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const TECH_LABELS = ['S3', 'dbt', 'Snowflake', 'Airflow', 'Python', 'SQL', 'Glue', 'Redshift', 'Kafka', 'Spark', 'Power BI', 'Terraform']

interface Particle {
  x: number; y: number; vx: number; vy: number; radius: number
  label: string | null; opacity: number; pulse: number; pulseSpeed: number
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const init = () => {
      particles = []
      const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 18000))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1.5,
          label: i < TECH_LABELS.length ? TECH_LABELS[i] : null,
          opacity: Math.random() * 0.5 + 0.3,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        })
      }
    }
    init()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.15
            ctx.beginPath()
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.pulse += p.pulseSpeed
        const pulsedRadius = p.radius + Math.sin(p.pulse) * 0.8

        // Glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulsedRadius * 4)
        gradient.addColorStop(0, `rgba(96, 165, 250, ${p.opacity * 0.6})`)
        gradient.addColorStop(1, 'rgba(96, 165, 250, 0)')
        ctx.beginPath()
        ctx.arc(p.x, p.y, pulsedRadius * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, pulsedRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(147, 197, 253, ${p.opacity})`
        ctx.fill()

        // Label
        if (p.label && pulsedRadius > 2) {
          ctx.font = '11px JetBrains Mono, monospace'
          ctx.fillStyle = `rgba(148, 163, 184, ${p.opacity * 0.8})`
          ctx.fillText(p.label, p.x + pulsedRadius + 4, p.y + 4)
        }

        // Move
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.y < -20) p.y = canvas.height + 20
        if (p.y > canvas.height + 20) p.y = -20
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020817]">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[100px] animate-float-delayed pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-600/5 blur-[150px] pointer-events-none" />

      {/* Canvas animation */}
      <canvas ref={canvasRef} id="hero-canvas" className="absolute inset-0 w-full h-full" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for senior roles & consulting
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6"
        >
          Building scalable{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            data pipelines
          </span>
          <br className="hidden md:block" />
          {' '}that power insights.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-xl md:text-2xl text-slate-300 font-medium mb-3"
        >
          I&apos;m{' '}
          <span className="text-white font-bold">Vyshnavi Nandyala</span>
          ,{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Senior Data Engineer
          </span>
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-slate-400 text-lg mb-10 font-mono"
        >
          6+ years in production data systems
        </motion.p>

        {/* Tech stack inline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {['Snowflake', 'dbt', 'AWS', 'Apache Airflow', 'Python', 'Power BI'].map((tech) => (
            <span key={tech} className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#0a1628] border border-blue-500/20 text-slate-300">
              {tech}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo('#about')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg
                       hover:from-blue-500 hover:to-purple-500 hover:shadow-xl hover:shadow-blue-500/25
                       transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
          >
            View Profile
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-4 rounded-xl border border-blue-500/30 text-blue-300 font-semibold text-lg
                       hover:border-blue-400 hover:text-blue-200 hover:bg-blue-500/5
                       transition-all duration-300 hover:-translate-y-1"
          >
            Let&apos;s Collaborate
          </button>
          <a
            href="/resume.pdf"
            download
            className="px-8 py-4 rounded-xl border border-slate-600/40 text-slate-300 font-semibold text-lg
                       hover:border-slate-500 hover:text-white hover:bg-white/5
                       transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-sm"
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
