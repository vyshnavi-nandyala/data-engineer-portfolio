import { motion } from 'framer-motion'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/vyshnavi-nandyala',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/vyshnavi-nandyala',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:vyshnavi.nandyalaa47@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const navLinks = [
  { name: 'Profile', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#020817] border-t border-blue-500/10 pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                VN
              </div>
              <div>
                <p className="text-white font-bold">Vyshnavi Nandyala</p>
                <p className="text-blue-400 text-xs">Senior Data Engineer</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Building scalable data pipelines and cloud-native data solutions that power business insights.
            </p>
            <p className="text-slate-500 text-sm mt-3 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              Houston, TX
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white font-semibold mb-4">Quick Links</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-slate-400 text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold mb-4">Connect</p>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="w-10 h-10 rounded-xl bg-[#0a1628] border border-blue-500/15 flex items-center justify-center text-slate-400
                             hover:border-blue-500/40 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="text-slate-400 text-sm">
              Open to senior DE roles<br />and consulting opportunities.
            </p>
            <button
              onClick={() => scrollTo('#contact')}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 text-blue-300 text-sm font-medium hover:from-blue-600/30 hover:to-purple-600/30 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available Now
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-blue-500/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Vyshnavi Nandyala. All rights reserved.</p>
          <p className="font-mono text-xs">
            Built with{' '}
            <span className="text-blue-400">Next.js</span> ·{' '}
            <span className="text-purple-400">Tailwind CSS</span> ·{' '}
            <span className="text-cyan-400">Framer Motion</span>
          </p>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-6 w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow z-40"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </footer>
  )
}
