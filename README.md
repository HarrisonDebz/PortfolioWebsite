# Personal Portfolio Website

A modern, responsive engineering portfolio built to showcase projects, skills, and experience. Designed with a dark editorial UI, emerald accent system, smooth animations, and a 3D cybersecurity-themed globe motif — all in pure HTML, CSS, and JavaScript with zero external frameworks.

## Features

### Design & Aesthetics
- Dark-themed editorial design system with CSS custom properties (design tokens)
- Emerald accent palette (`--emerald-primary`, `--emerald-deep`, `--emerald-light`, `--emerald-glow`)
- Glassmorphism cards with subtle green glow on hover and partial zoom (`scale(1.015–1.02)`)
- Custom cursor with `mix-blend-mode` effect (desktop only)
- Responsive layout for desktop, tablet, and mobile
- Mobile slide-in navigation drawer with animated hamburger toggle

### 3D Cybersecurity Globe Background
- Animated 3D wireframe globe rendered on an HTML5 `<canvas>` — no external libraries
- **130 Fibonacci sphere nodes** with geodesic network edges forming a rotating cyber-mesh
- Depth-aware rendering: front hemisphere nodes and edges are bright, back hemisphere fades subtly
- Dashed telemetry equator ring and tilted orbital halo
- **Data packet pulses** traveling along globe connections with emerald glow
- **Radar probe pings** radiating from surface nodes
- **Mouse parallax**: subtle axial tilt follows cursor position; front-facing nodes show a lock-on reticle on hover
- Ambient peripheral dust nodes drifting outside the globe to blend canvas margins
- `prefers-reduced-motion` support (renders a single static frame)
- Pauses all animation when the browser tab is hidden for performance

### Interactivity & Animation
- Smooth scroll-reveal animations via `IntersectionObserver`
- Scroll progress indicator bar
- Active navigation link tracking on scroll
- Magnetic CTA button hover effect
- Interactive case study modal with a live **Probe Simulator** terminal (animated security audit output)

### SEO & Accessibility
- SEO meta description, Open Graph, and Twitter Card tags
- Semantic HTML5 structure with ARIA labels
- Keyboard-navigable modal with focus trapping
- Custom Steezy Dev logo favicon (PNG + SVG)

## Sections

1. **Home** — Hero with animated heading, availability badge, three architectural pillar cards, and CTA buttons
2. **About** — Profile photo, bio, and professional timeline (experience & learning journey)
3. **Featured Projects** — Three editorial case study cards (WebVal Analyzer, CAT, EventPulse) with metrics strips, tech chips, and GitHub links; plus a compact project grid (Chronicle, Library Space Monitor, AgriSense AI, Client Web Designs)
4. **Experience** — Chronological timeline with role descriptions and skill chips
5. **Skills** — Six skill groups: Frontend, Mobile, Backend & APIs, Database & Cloud, Cybersecurity, Architecture & Tools
6. **Contact** — Email, LinkedIn, and GitHub contact cards with inline SVG badges
7. **Footer** — Streamlined copyright line with back-to-top link

## Tech Stack

| Layer | Technologies |
|---|---|
| **Markup** | HTML5 (semantic, accessible) |
| **Styling** | Vanilla CSS — custom design system, CSS variables, glassmorphism, responsive grid |
| **Scripting** | Vanilla JavaScript — `IntersectionObserver`, Canvas 2D, `requestAnimationFrame`, 3D projection math |
| **Typography** | [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk), [Newsreader](https://fonts.google.com/specimen/Newsreader), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts |
| **Deployment** | GitHub Pages |

## Project Structure

```
PortfolioWebsite/
├── index.html              # Single-page markup (all sections + case study modal)
├── styles.css              # Full design system, component styles & responsive rules
├── scripts.js              # Interactivity, scroll animations, 3D globe renderer & probe simulator
├── README.md
└── Resources/
    ├── Dev Logo-light.png  # Steezy Dev wordmark (navbar)
    ├── favicon.png         # PNG favicon
    ├── favicon-32x32.png   # 32×32 PNG favicon
    ├── favicon.svg         # SVG favicon
    └── Images/
        └── Harrison-1.jpg  # Profile photo
```
