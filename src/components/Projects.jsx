import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Terminal, ShoppingBag, GraduationCap, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSound } from './SoundManager';

const PROJECTS_DATA = [
  {
    id: 'pernambut-connection',
    title: 'Pernambut Connection',
    subtitle: 'Community Hub & Directory',
    overview: 'A highly secure community coordination engine. This portal bridges regional announcements, golden-credential verification loops, citizen support networks, and dynamic municipal schedules on a custom, fast UI.',
    tech: ['React.js', 'Tailwind CSS', 'Django REST', 'SQLite', 'JWT'],
    features: [
      'Token-based secure authentication flow',
      'Regional citizen registry with GOLD status loops',
      'Dynamic donation trackers and announcements',
      'Sub-60fps fluid page translations'
    ],
    challenge: 'Designing a dynamic, high-capacity client directory filters matching multi-criteria queries with instant rendering speeds.',
    live: 'https://pernambut-connection.netlify.app/',
    github: 'https://github.com/Zakki-05',
    accentColor: '#38bdf8', // Sky
    icon: Terminal,
    mockupType: 'dashboard'
  },
  {
    id: 'pernambut-hub',
    title: 'Pernambut Hub',
    subtitle: 'Civic Issue Reporting System',
    overview: 'A full-stack civic reporting web application simplifying public grievance reports and municipal database tracking with secure CRUD structures.',
    tech: ['Python Django', 'HTML5', 'CSS3', 'JavaScript'],
    features: [
      'Authentication middleware for citizen accounts',
      'Grievance database CRUD operations',
      'Cross-browser optimized layouts',
      'Optimized backend response times'
    ],
    challenge: 'Optimizing relational queries on SQLite database to maintain sub-150ms server responses on Render free tier.',
    live: 'https://pernambut-hub.onrender.com/',
    github: 'https://github.com/Zakki-05',
    accentColor: '#8b5cf6', // Violet
    icon: AlertCircle,
    mockupType: 'grievances'
  },
  {
    id: 'al-huda-school',
    title: 'Al Huda Islamic School',
    subtitle: 'Educational Institution Portal',
    overview: 'A multi-page educational school website showcasing notice layouts, dynamic notices and notice boards, and curriculum grids.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Clean Architecture'],
    features: [
      'Mobile-first responsive notice board grid',
      'Interactive notice lists and media galleries',
      'Fully accessible semantic structure',
      'Near-perfect Lighthouse optimization score'
    ],
    challenge: 'Achieving responsive visual grids and high performance scores by optimizing image assets and minimizing JavaScript dependencies.',
    live: 'https://al-huda-islamic-school.netlify.app/',
    github: 'https://github.com/Zakki-05',
    accentColor: '#ec4899', // Pink
    icon: GraduationCap,
    mockupType: 'school'
  },
  {
    id: 'tech-zone',
    title: 'Tech Zone Ecommerce',
    subtitle: 'Electronics Storefront Application',
    overview: 'A high-fidelity electronics storefront selling smartphones, watches, and accessories. Features session summaries, cart calculations, and responsive visual blocks.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
    features: [
      'Pagination control lists and sort filters',
      'Local session persistence for cart checkouts',
      'Modern glass product grids',
      'Fast responsive product detail modules'
    ],
    challenge: 'Building a dynamic client-side inventory filter and order totals summary module using lightweight vanilla script code.',
    live: 'https://tech-zone-zakki-05.netlify.app/',
    github: 'https://github.com/Zakki-05',
    accentColor: '#10b981', // Green
    icon: ShoppingBag,
    mockupType: 'storefront'
  }
];

export default function Projects() {
  const { playHover, playClick } = useSound();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    playClick();
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden bg-transparent">
      {/* Background Radial Glow */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] ambient-glow opacity-25 pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.25em] text-theme-accent uppercase font-bold"
          >
            03 // PORTFOLIO
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-theme-text"
          >
            Featured Production Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-theme-textSec leading-relaxed"
          >
            Hover and click to expand technical blueprints, architecture choices, and challenges solved for each platform.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project, idx) => {
            const Icon = project.icon;
            const isExpanded = expandedId === project.id;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card-premium rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                
                {/* 1. Live Interactive CSS Mockup Frame */}
                <div className="h-44 sm:h-48 bg-slate-950 border-b border-theme-border relative p-3 flex flex-col justify-between select-none">
                  
                  {/* Browser top pill */}
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/60" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                      <div className="w-2 h-2 rounded-full bg-green-500/60" />
                    </div>
                    <div className="bg-slate-900 border border-white/5 rounded px-4 py-0.5 text-[9px] text-slate-500 font-mono w-48 text-center truncate">
                      {project.live.replace('https://', '')}
                    </div>
                    <div className="w-8"></div>
                  </div>

                  {/* Dynamic CSS Mockups inside Browser */}
                  <div className="flex-1 flex items-center justify-center pt-2 font-mono text-[9px] text-slate-400 overflow-hidden">
                    
                    {/* A. Dashboard Mockup */}
                    {project.mockupType === 'dashboard' && (
                      <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
                        <div className="bg-slate-900 border border-white/5 rounded p-2 flex flex-col justify-between h-24">
                          <span className="text-[8px] text-slate-500">CITIZENS</span>
                          <span className="text-sm font-bold text-white font-sans">1,402</span>
                          <div className="w-full h-1 bg-sky-500/20 rounded"><div className="h-full bg-[#38bdf8] w-2/3 rounded"></div></div>
                        </div>
                        <div className="bg-slate-900 border border-white/5 rounded p-2 flex flex-col justify-between h-24">
                          <span className="text-[8px] text-slate-500">VOLUNTEERS</span>
                          <span className="text-sm font-bold text-white font-sans">89</span>
                          <div className="w-full h-1 bg-violet-500/20 rounded"><div className="h-full bg-violet-500 w-1/2 rounded"></div></div>
                        </div>
                        <div className="bg-slate-900 border border-white/5 rounded p-2 flex flex-col justify-between h-24 relative overflow-hidden">
                          <span className="text-[8px] text-slate-500">STATUS</span>
                          <span className="text-[9px] font-bold text-emerald-400 font-mono">LIVE_SECURE</span>
                          <div className="absolute -bottom-4 right-[-10px] w-12 h-12 bg-emerald-500/10 rounded-full animate-ping pointer-events-none"></div>
                        </div>
                      </div>
                    )}

                    {/* B. Grievances Ticket Mockup */}
                    {project.mockupType === 'grievances' && (
                      <div className="space-y-1.5 w-full max-w-xs">
                        <div className="bg-slate-900 border border-white/5 rounded p-1.5 flex justify-between items-center">
                          <span>#104: Main Street Drainage Block</span>
                          <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-[8px] font-bold">UNDER REVIEW</span>
                        </div>
                        <div className="bg-slate-900 border border-white/5 rounded p-1.5 flex justify-between items-center">
                          <span>#103: Park Street Light Malfunction</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-bold">SOLVED</span>
                        </div>
                      </div>
                    )}

                    {/* C. School Course notices Grid */}
                    {project.mockupType === 'school' && (
                      <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                        <div className="bg-slate-900 border border-white/5 rounded p-2 text-left space-y-1">
                          <div className="w-8 h-1 bg-pink-500 rounded"></div>
                          <span className="text-white font-bold block">Notice Board</span>
                          <span className="text-[8px] text-slate-500 block">Admissions open for batch 2026</span>
                        </div>
                        <div className="bg-slate-900 border border-white/5 rounded p-2 text-left space-y-1">
                          <div className="w-8 h-1 bg-sky-500 rounded"></div>
                          <span className="text-white font-bold block">Gallery</span>
                          <span className="text-[8px] text-slate-500 block">Annual Sports Meet album updated</span>
                        </div>
                      </div>
                    )}

                    {/* D. Storefront Grid */}
                    {project.mockupType === 'storefront' && (
                      <div className="flex items-center gap-3 w-full max-w-xs">
                        <div className="bg-slate-900 border border-white/5 rounded p-2 text-center flex-1 space-y-1">
                          <span className="text-white block font-bold">Smartwatch Neo</span>
                          <span className="text-[8px] text-[#10b981] font-mono">$199.00</span>
                        </div>
                        <div className="bg-slate-900 border border-white/5 rounded p-2 text-center flex-1 space-y-1">
                          <span className="text-white block font-bold">Earbuds Pro</span>
                          <span className="text-[8px] text-[#10b981] font-mono">$89.00</span>
                        </div>
                      </div>
                    )}

                  </div>

                </div>

                {/* 2. Project Card Info */}
                <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2" style={{ color: project.accentColor }}>
                      <Icon className="w-4 h-4" />
                      <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                        {project.subtitle}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-theme-text">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-theme-textSec leading-relaxed font-light">
                      {project.overview}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[9.5px] font-mono bg-theme-bgSec border border-theme-border px-2 py-0.5 rounded-full text-theme-textSec font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Accordion expand button */}
                  <div className="pt-4 border-t border-theme-border/60 flex items-center justify-between">
                    <button
                      onClick={() => toggleExpand(project.id)}
                      onMouseEnter={playHover}
                      className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-theme-textSec hover:text-theme-text font-bold transition-colors"
                    >
                      TECHNICAL DETAILS 
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.div>
                    </button>

                    {/* Quick Link icons */}
                    <div className="flex items-center gap-3">
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={playHover}
                        onClick={playClick}
                        className="p-1.5 rounded-full border border-theme-border hover:border-theme-borderHover text-theme-textSec hover:text-theme-text transition-colors"
                        title="GitHub Codebase"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      <a 
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={playHover}
                        onClick={playClick}
                        className="p-1.5 rounded-full border border-theme-border hover:border-theme-borderHover text-theme-textSec hover:text-theme-text transition-colors"
                        title="Live Site"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Collapsible Architecture Details */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-4 text-xs leading-relaxed border-t border-theme-border/60 mt-4 text-theme-textSec font-light">
                          
                          {/* Key features list */}
                          <div className="space-y-2">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-theme-accent font-bold block">// KEY FEATURES</span>
                            <div className="grid grid-cols-1 gap-1.5 pl-1">
                              {project.features.map((feat) => (
                                <div key={feat} className="flex items-start gap-2 text-theme-textSec">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-theme-accent shrink-0 mt-0.5" />
                                  <span className="text-[11px]">{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Challenges solved */}
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-theme-accent font-bold block">// CHALLENGE SOLVED</span>
                            <p className="text-[11px] pl-1 font-light italic">
                              "{project.challenge}"
                            </p>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
