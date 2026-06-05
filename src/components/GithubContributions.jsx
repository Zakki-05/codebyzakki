import React from 'react';
import { motion } from 'framer-motion';
import { Github, Folder, Star, GitCommit, Sparkles, Terminal, ArrowUpRight } from 'lucide-react';
import { useSound } from './SoundManager';

export default function GithubContributions() {
  const { playHover, playClick } = useSound();

  return (
    <section id="github" className="relative py-28 px-6 overflow-hidden bg-[#030303]">
      
      {/* Background drifting glow */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-neon-blue/[0.02] blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-neon-purple/[0.02] blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Header Block */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-xs font-mono tracking-widest uppercase mb-4 animate-pulse-slow">
            <Terminal className="w-3.5 h-3.5" />
            GITHUB_ACTIVITY // SYSTEM_LOG
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-poppins tracking-tight text-white mb-4 uppercase">
            GitHub Contributions
          </h2>
          <p className="text-text-gray max-w-xl mx-auto text-sm md:text-base font-light font-sans">
            Recruiters value activity and consistency. Below is a real-time summary of my code repositories, development metrics, and commits log.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Profile HUD & Status Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Main profile card */}
            <div className="p-6 rounded-[24px] glass-card border-white/5 flex flex-col justify-between flex-1 relative overflow-hidden">
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-4.5">
                  <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 overflow-hidden relative glowing-ring shrink-0">
                    <img 
                      src="/my-pic.jpg" 
                      alt="Mohammad Zakki Adnaan" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <Github className="w-6 h-6 text-neon-blue absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-base font-extrabold font-poppins text-white leading-tight">Mohammad Zakki</h3>
                    <span className="text-[10px] font-mono text-neon-blue font-bold tracking-widest uppercase block">@Zakki-05</span>
                    <span className="text-[9px] font-mono text-text-gray/50 block">Pernambut, Tamil Nadu</span>
                  </div>
                </div>
                
                <p className="text-xs text-text-gray font-sans font-light leading-relaxed">
                  Frontend Developer engineering highly visual React systems, Tailwind UI components, and secure Python Django REST backends.
                </p>
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/5 mt-6 text-center">
                <div className="space-y-0.5">
                  <Folder className="w-4 h-4 text-neon-purple mx-auto mb-1" />
                  <span className="text-base font-mono font-bold text-white block">12+</span>
                  <span className="text-[8px] font-mono text-text-gray/50 uppercase tracking-wider">Repos</span>
                </div>
                <div className="space-y-0.5">
                  <GitCommit className="w-4 h-4 text-neon-blue mx-auto mb-1" />
                  <span className="text-base font-mono font-bold text-white block">200+</span>
                  <span className="text-[8px] font-mono text-text-gray/50 uppercase tracking-wider">Commits</span>
                </div>
                <div className="space-y-0.5">
                  <Star className="w-4 h-4 text-neon-pink mx-auto mb-1" />
                  <span className="text-base font-mono font-bold text-white block">5+</span>
                  <span className="text-[8px] font-mono text-text-gray/50 uppercase tracking-wider">Stars</span>
                </div>
              </div>

              {/* Action Link */}
              <a
                href="https://github.com/Zakki-05"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="mt-6 w-full py-2.5 rounded-xl border border-white/5 bg-white/[0.01] hover:border-neon-blue text-xs font-mono text-white flex items-center justify-center gap-1.5 transition-all uppercase tracking-widest font-bold"
              >
                GitHub Profile
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

            </div>

          </div>

          {/* Real-time GitHub Stats Visualizers */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Live Calendar Chart Card */}
            <div className="p-6 rounded-[24px] glass-card border-white/5 text-left flex flex-col justify-between flex-1 relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-extrabold font-poppins text-white uppercase tracking-wider">Contribution Graph</h3>
                  <span className="text-[8px] font-mono text-emerald-500 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">LIVE_CALENDAR</span>
                </div>
                
                {/* SVG Render from rshah chart tool */}
                <div className="rounded-xl border border-white/5 bg-black/40 p-4 flex items-center justify-center">
                  <img 
                    src="https://ghchart.rshah.org/00f0ff/Zakki-05" 
                    alt="Github Contribution Chart" 
                    className="w-full h-auto max-h-[110px] object-contain filter brightness-110 contrast-125"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* GitHub Readme Stats API Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                <div className="flex flex-col justify-center text-left space-y-1">
                  <span className="text-[9px] font-mono text-neon-blue font-bold uppercase tracking-wider">// CODEBASEMETRICS</span>
                  <h4 className="text-xs font-bold text-white font-poppins">Continuous System Deployment</h4>
                  <p className="text-[11px] text-text-gray/80 font-sans font-light leading-normal">
                    Code pushes are integrated automatically via Netlify and Render CD hooks for high-fidelity production staging.
                  </p>
                </div>
                
                <div className="flex items-center justify-center p-2 rounded-xl bg-black/20 border border-white/5">
                  <img 
                    src="https://github-readme-stats.vercel.app/api?username=Zakki-05&theme=transparent&title_color=00f0ff&text_color=8e9196&icon_color=8b5cf6&border_color=ffffff&border_radius=12&hide_rank=true&show_icons=true"
                    alt="GitHub Metrics Stats"
                    className="w-full h-auto max-h-[120px] object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
