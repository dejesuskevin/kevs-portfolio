import {
  SiCss,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiSupabase,
  SiVite,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

export const projects = [
  {
    id: 'mindcare',
    title: 'MindCare',
    eyebrow: 'Wellness platform',
    category: 'Full-stack · AI',
    description: 'An AI-supported mental wellness and anonymous message-sharing platform designed around the needs of students.',
    technologies: ['React', 'FastAPI', 'PostgreSQL', 'Supabase', 'AI API'],
    tone: 'violet',
    details: {
      overview: 'MindCare gives students a private, low-friction space to reflect, reach out, and find relevant support without making the experience feel clinical or intimidating.',
      problem: 'Students often avoid existing support channels because they feel too formal, visible, or difficult to approach during vulnerable moments.',
      solution: 'A calm, privacy-aware experience combines anonymous peer messages, guided reflection, and carefully scoped AI assistance in one approachable platform.',
      features: ['Anonymous community messages', 'AI-assisted reflection prompts', 'Curated support resources', 'Private mood check-ins', 'Responsive, accessible interface'],
      role: 'Product design, frontend architecture, API integration, and database modeling.',
      challenges: 'Balancing anonymity with safety, setting responsible boundaries for AI responses, and keeping sensitive flows reassuring and simple.',
      outcome: 'A cohesive platform concept with a clear safety model, reusable UI system, and architecture ready for moderated pilot testing.',
    },
  },
  {
    id: 'lakbay',
    title: 'Lakbay',
    eyebrow: 'Transport platform',
    category: 'Full-stack · Maps',
    description: 'A public utility jeepney tracking and fleet management platform that makes everyday routes easier to understand.',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Maps API'],
    tone: 'mint',
    details: {
      overview: 'Lakbay connects commuters and operators through a shared live view of routes, vehicles, and service conditions.',
      problem: 'Uncertain arrival times and fragmented route information create stressful commutes, while operators have limited visibility into fleet activity.',
      solution: 'A map-led web application presents live vehicle locations to passengers and an operational dashboard to fleet managers.',
      features: ['Live vehicle locations', 'Route and stop discovery', 'Operator dashboard', 'Fleet status monitoring', 'Mobile-first commuter view'],
      role: 'UX planning, interactive map UI, backend services, and relational data design.',
      challenges: 'Presenting dense location data clearly, managing frequently changing coordinates, and keeping the mobile map controls easy to use.',
      outcome: 'A scalable product direction that unifies commuter information and day-to-day fleet visibility in a single system.',
    },
  },
  {
    id: 'iskolarvault',
    title: 'IskolarVault',
    eyebrow: 'Academic archive',
    category: 'Full-stack · Documents',
    description: 'A secure digital archive for academic research papers, theses, capstone projects, and OJT reports.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    tone: 'blue',
    details: {
      overview: 'IskolarVault helps academic communities preserve, organize, and retrieve institutional work through a structured document library.',
      problem: 'Valuable student research is often stored across disconnected drives and filing systems, making discovery and long-term preservation difficult.',
      solution: 'A permission-aware archive centralizes uploads, rich metadata, search, review, and controlled document access.',
      features: ['Metadata-rich document uploads', 'Fast search and filters', 'Role-based permissions', 'Review and approval workflow', 'Organized collections'],
      role: 'System architecture, document workflow design, frontend implementation, and API development.',
      challenges: 'Designing permissions that remain understandable, handling document states, and building useful search around inconsistent metadata.',
      outcome: 'A maintainable archive model that makes institutional knowledge easier to preserve, govern, and discover.',
    },
  },
]

export const stackGroups = [
  {
    title: 'Frontend',
    items: [
      { name: 'React', description: 'Component-driven interfaces', icon: SiReact },
      { name: 'JavaScript', description: 'Modern application logic', icon: SiJavascript },
      { name: 'HTML5', description: 'Semantic foundations', icon: SiHtml5 },
      { name: 'CSS3', description: 'Responsive visual systems', icon: SiCss },
      { name: 'Vite', description: 'Fast frontend tooling', icon: SiVite },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', description: 'JavaScript runtimes', icon: SiNodedotjs },
      { name: 'Express.js', description: 'Web APIs and services', icon: SiExpress },
      { name: 'PHP', description: 'Server-side applications', icon: SiPhp },
      { name: 'FastAPI', description: 'Typed Python APIs', icon: SiFastapi },
    ],
  },
  {
    title: 'Database',
    items: [
      { name: 'PostgreSQL', description: 'Relational data systems', icon: SiPostgresql },
      { name: 'MySQL', description: 'Reliable SQL storage', icon: SiMysql },
      { name: 'MongoDB', description: 'Flexible document data', icon: SiMongodb },
      { name: 'Supabase', description: 'Backend platform tooling', icon: SiSupabase },
    ],
  },
  {
    title: 'Development tools',
    items: [
      { name: 'Git', description: 'Versioned development', icon: SiGit },
      { name: 'GitHub', description: 'Code collaboration', icon: SiGithub },
      { name: 'VS Code', description: 'Focused code editing', icon: VscCode },
      { name: 'Postman', description: 'API testing workflows', icon: SiPostman },
    ],
  },
]

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/dejesuskevin', placeholder: false },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kevin-de-jesus-607a72295/?isSelfProfile=true', placeholder: false },
  { label: 'Email', href: 'mailto:dejesus.kevinkevin2004@gmail.com', placeholder: false },
]

export const certifications = [
  {
    title: 'Exploring Internet of Things with Cisco Packet Tracer',
    provider: 'Cisco Networking Academy (NetAcad)',
    date: 'December 16, 2024',
    dateISO: '2024-12-16',
    href: '/certificates/cisco-iot.pdf',
  },
]
