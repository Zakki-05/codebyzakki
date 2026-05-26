import React from 'react';
import { motion } from 'framer-motion';
import { Database, Smartphone, Layers, Zap, GitPullRequest, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { useSound } from './SoundManager';

const HIGHLIGHTS = [
  {
    title: 'API Integration',
    category: 'Backend & Services',
    icon: Database,
    description: 'Expertise in building and consuming RESTful endpoints with secure architectures.',
    bulletPoints: [
      'Python Django REST framework endpoints integration',
      'Secure JWT authentication token middlewares & sessions',
      'High-speed structured queries with custom local caching',
      'Robust error boundary fallbacks and mock servers'
    ],
    accent: 'border-neon-blue/20 text-neon-blue'
  },
  {
    title: 'Responsive Design',
    category: 'Layout & Viewports',
    icon: Smartphone,
    description: 'Engineering fluid layout networks that conform instantly to any client workspace.',
    bulletPoints: [
      'Mobile-first responsive fluid grids & flex networks',
      'Dynamic viewport breakpoints matching precise metrics',
      'Cross-browser styling & SVG graphic vectors compatibility',
      'Consistent layouts from modern phones to ultrawide panels'
    ],
    accent: 'border-emerald-500/20 text-emerald-400'
  },
  {
    title: 'Reusable Components',
    category: 'Component Architecture',
    icon: Layers,
    description: 'Creating modular, dry, and scalable React design systems that reduce code redundancy.',
    bulletPoints: [
      'Strict atomic component structure & folder mappings',
      'Highly flexible, type-checked props & dynamic states',
      'Curated micro-interactions utilizing Tailwind classes',
      'Self-contained modular utilities & styles isolation'
    ],
    accent: 'border-neon-purple/20 text-neon-purple'
  },
  {
    title: 'Performance Optimization',
    category: 'Speed & Rendering',
    icon: Zap,
    description: 'Focusing on clean memory loads, sub-60fps fluid layouts, and GPU-driven rendering.',
    bulletPoints: [
      'GSAP / Framer Motion transitions with GPU acceleration',
      'Strict dependency auditing & memory cleanups on unmount',
      'Lazy loading code splits & image compression pipelines',
      'High diagnostic audits across core speed metrics'
    ],
    accent: 'border-neon-pink/20 text-neon-pink'
  },
  {
    title: 'Deployment Workflow',
    category: 'CI/CD & DevOps',
    icon: GitPullRequest,
    description: 'Establishing fast code checkouts, separated environments, and instant hosting pipelines.',
    bulletPoints: [
      'Automated build hooks utilizing Netlify CD triggers',
      'Render hosting deployment for secure Django kernels',
      'Separated environmental variable settings & CORS rules',
      'Clean domain routings & custom SSL certificates'
    ],
    accent: 'border-amber-500/20 text-amber-400'
  }
];

export default function TechnicalHighlights() {
  const { playHover, playClick } = useSound();

  return (
    <section id="highlights" className="relative py-28 px-6 overflow-hidden bg-[#030303]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-neon-glow rounded-full blur-[140px] pointer-events-none z-0 opacity-40"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/[0.02] text-neon-purple text-[10px] font-mono tracking-widest uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            ENGINEERING_PRINCIPLES // CORE_DOSSIER
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-poppins tracking-tight text-white uppercase">
            TECHNICAL HIGHLIGHTS
          </h2>
          <p className="text-text-gray max-w-xl text-xs md:text-sm font-light font-sans mt-4 leading-relaxed">
            Deep-dive operational architectural priorities engineered into every application to guarantee elite performance, responsiveness, and codebase integrity.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.08, type: 'spring', stiffness: 180, damping: 22 }}
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-6 rounded-[24px] glass-card border-white/5 flex flex-col justify-between group cursor-pointer relative overflow-hidden h-[340px] hover:scale-[1.01]"
              >
                
                {/* Accent top banner bar decoration */}
                <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-40 ${item.accent.split(' ')[1]}`} />
                
                {/* Header Section */}
                <div className="space-y-3.5 text-left">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[8px] text-text-gray/50 uppercase tracking-widest">// {item.category}</span>
                    <div className={`p-2 rounded-xl bg-white/[0.01] border border-white/5 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold font-poppins text-white tracking-wide uppercase transition-colors group-hover:text-neon-blue">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-text-gray/70 leading-normal font-sans font-light">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Technical detailed list bullet points */}
                <ul className="space-y-2 text-left pt-4 border-t border-white/[0.03] mt-auto">
                  {item.bulletPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 font-mono text-[9px] text-text-gray/80 leading-normal">
                      <span className="text-neon-blue mt-0.5 select-none">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
