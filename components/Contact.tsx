import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Location',
    value: 'Houston, TX',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'vyshnavi.nandyalaa47@gmail.com',
    href: 'mailto:vyshnavi.nandyalaa47@gmail.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: 'LinkedIn',
    value: 'linkedin.com/in/vyshnavi-nandyala',
    href: 'https://linkedin.com/in/vyshnavi-nandyala',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/vyshnavi-nandyala',
    href: 'https://github.com/vyshnavi-nandyala',
  },
]

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email address'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    else if (form.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1200))
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  return (
    <section id="contact" className="section-padding bg-[#060e1f] relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div ref={ref} className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-blue-400 font-mono text-sm font-medium mb-2 tracking-wider uppercase">Contact</p>
          <h2 className="section-heading">
            Let&apos;s{' '}
            <span className="gradient-text">Collaborate</span>
          </h2>
          <p className="section-subheading">
            Interested in data engineering consulting, senior roles, or architecture discussions?
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-white font-bold text-xl mb-2">Get in touch</h3>
              <p className="text-slate-400 leading-relaxed">
                Whether you&apos;re looking for a senior data engineer, need architecture guidance,
                or want to discuss a data challenge — I&apos;d love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-slate-300 text-sm hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-300 text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Response time */}
            <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-semibold">Quick Response</span>
              </div>
              <p className="text-slate-400 text-sm">Typically responds within 24 hours</p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-base p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-slate-400">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 btn-secondary">
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="card-base p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="John Smith"
                      className={`w-full px-4 py-3 rounded-xl bg-[#0a1628] border text-white placeholder-slate-600 text-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all
                        ${errors.name ? 'border-red-500/50' : 'border-blue-500/15 focus:border-blue-500/40'}`}
                    />
                    {errors.name && <p className="mt-1 text-red-400 text-xs">{errors.name}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="john@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#0a1628] border text-white placeholder-slate-600 text-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all
                        ${errors.email ? 'border-red-500/50' : 'border-blue-500/15 focus:border-blue-500/40'}`}
                    />
                    {errors.email && <p className="mt-1 text-red-400 text-xs">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder="Senior Data Engineer opportunity at Acme Corp"
                    className="w-full px-4 py-3 rounded-xl bg-[#0a1628] border border-blue-500/15 focus:border-blue-500/40 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={5}
                    placeholder="Tell me about the project, role, or question you'd like to discuss..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#0a1628] border text-white placeholder-slate-600 text-sm resize-none
                      focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all
                      ${errors.message ? 'border-red-500/50' : 'border-blue-500/15 focus:border-blue-500/40'}`}
                  />
                  {errors.message && <p className="mt-1 text-red-400 text-xs">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-base
                             hover:from-blue-500 hover:to-purple-500 hover:shadow-xl hover:shadow-blue-500/25
                             disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
