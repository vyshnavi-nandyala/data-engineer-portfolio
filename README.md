# Data Engineer Portfolio — Vyshnavi Nandyala

Professional portfolio website for a Senior Data Engineer. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + canvas particle system
- **Icons**: Heroicons

## Sections

| Section | Description |
|---|---|
| Hero | Animated particle network, headline, CTA buttons |
| About | Bio, stats, core strengths |
| Experience | Timeline with 3 roles and achievements |
| Skills | Capability matrix with Expert/Advanced/Working bars |
| Education | Degree + 6 professional certifications |
| Projects | Filterable grid of 4 data engineering projects |
| Contact | Form with validation + social links |

## Customization

All content lives in `data/`:

- `data/experience.json` — work history
- `data/skills.json` — skill categories and levels
- `data/projects.json` — portfolio projects
- `data/education.json` — degree and certifications

## Deploy

```bash
npm run build
npm run start
```

Or deploy to Vercel with one click.
