import React from 'react';
import { motion } from 'framer-motion';
import { Code, Monitor, Compass, Sparkles, Rocket, RefreshCw } from 'lucide-react';
import { useSound } from './SoundManager';

const SERVICES = [
  {
    title: 'Frontend Development',
    desc: 'Crafting lightweight, blazing-fast, and responsive single-page applications using modern React, Redux systems, and client routing.',
    icon: Code,
    color: 'group-hover:text-neon-blue border-neon-blue/10 bg-neon-blue/5',
    shadow: 'rgba(0, 240, 255, 0.15)'
  },
  {
    title: 'Responsive Websites',
    desc: 'Engineering liquid fluid layouts that conform perfectly to all device screen viewports from small mobile screens up to desktop monitors.',
    icon: Monitor,
    color: 'group-hover:text-neon-purple border-neon-purple/10 bg-neon-purple/5',
    shadow: 'rgba(139, 92, 246, 0.15)'
  },
  {
    title: 'UI/UX Design',
    desc: 'Designing user-centered, clean visual flow systems, customized component wireframes, typography structures, and modern assets.',
    icon: Compass,
    color: 'group-hover:text-neon-pink border-neon-pink/10 bg-neon-pink/5',
    shadow: 'rgba(236, 72, 153, 0.15)'
  },
  {
    title: 'Portfolio Websites',
    desc: 'Creating custom, luxury, Awwwards-level interactive portfolio websites displaying your engineering masteries to land dream job offers.',
    icon: Sparkles,
    color: 'group-hover:text-emerald-400 border-emerald-400/10 bg-emerald-400/5',
    shadow: 'rgba(16, 185, 129, 0.15)'
  },
  {
    title: 'Landing Pages',
    desc: 'Optimizing high-conversion landing pages featuring clean CTA blocks, rapid loading times, and organic SEO-friendly meta architectures.',
    icon: Rocket,
    color: 'group-hover:text-neon-blue border-neon-blue/10 bg-neon-blue/5',
    shadow: 'rgba(0, 240, 255, 0.15)'
  },
  {
    title: 'Website Redesign',
    desc: 'Modernizing outdated structural platforms to high-performance Next.js or React tech stacks with pristine cinematic designs.',
    icon: RefreshCw,
    color: 'group-hover:text-neon-purple border-neon-purple/10 bg-neon-purple/5',
    shadow: 'rgba(139, 92, 246, 0.15)'
  }
];

export default function Services() {
  const { playHover, playClick } = useSound();

  return (
    <section id="services" className="relative py-28 px-6 overflow-hidden tech-grid">
      
      {/* Background radial highlight */}
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] rounded-full bg-neon-blue/5 blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        
        {/* Title Details */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-xs font-mono tracking-widest uppercase mb-4 animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5" />
            CAPABILITIES_LOG
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-poppins tracking-tight text-white mb-4 uppercase">
            PROFESSIONAL SERVICES
          </h2>
          <p className="text-text-gray max-w-xl mx-auto text-sm md:text-base font-light font-sans">
            High-fidelity consulting services tailored to convert creative user designs into reliable, fully functional frontend realities.
          </p>
        </div>

        {/* Services Bento Grid wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((serv, idx) => {
            const Icon = serv.icon;

            return (
              <motion.div
                key={serv.title}
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.05, type: 'spring', stiffness: 200, damping: 22 }}
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-8 rounded-[32px] glass-card flex flex-col items-start text-left h-[260px] justify-between group cursor-pointer relative overflow-hidden hover:scale-[1.02]"
                style={{
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Custom inner glow ring */}
                <div className="absolute inset-0 rounded-[32px] border border-white/0 group-hover:border-white/10 transition-colors" />

                {/* Top Section: Icon badge & Title */}
                <div className="space-y-4">
                  
                  {/* Dynamic Badge Icon */}
                  <div className={`p-3.5 rounded-2xl border text-white transition-all duration-300 ${serv.color}`}>
                    <Icon className="w-5 h-5 animate-pulse" />
                  </div>

                  <h3 className="text-xl font-bold font-poppins text-white tracking-tight group-hover:text-neon-blue transition-colors duration-300">
                    {serv.title}
                  </h3>
                </div>

                {/* Bottom Section: Description details */}
                <p className="text-xs text-text-gray font-sans font-light leading-relaxed">
                  {serv.desc}
                </p>

              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
