import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal, ShoppingBag, GraduationCap, Coffee, BookOpen, Network, Sparkles } from 'lucide-react';
import { useSound } from './SoundManager';

const PROJECTS = [
  {
    title: 'Pernambut Hub',
    subtitle: 'Civic Issue Reporting System',
    desc: 'Developed a full-stack civic reporting web application using Django, implementing secure authentication, database CRUD operations, and cross-browser rendering deployed on Render.',
    problemSolved: 'Simplifies public grievance reporting and municipal database tracking.',
    features: ['Authentication', 'Database CRUD', 'Render Deployment'],
    tech: ['Python Django', 'HTML5', 'CSS3', 'JavaScript'],
    icon: Terminal,
    live: 'https://pernambut-hub.onrender.com/',
    github: 'https://github.com/Zakki-05',
    color: 'from-[#00f0ff] to-[#8b5cf6]',
    shadow: 'rgba(0, 240, 255, 0.15)',
    filterTags: ['Django', 'JavaScript']
  },
  {
    title: 'Tech Zone Ecommerce',
    subtitle: 'Electronics Storefront Application',
    desc: 'Developed a responsive e-commerce web application for selling smartphones, smartwatches, and earbuds. Designed custom categorization lists, pagination controls, and active sessions scaling.',
    problemSolved: 'Provides a responsive, smooth interface for electronic sales.',
    features: ['Active Sessions', 'Custom Categorization', 'Pagination Controls'],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
    icon: ShoppingBag,
    live: 'https://tech-zone-zakki-05.netlify.app/',
    github: 'https://github.com/Zakki-05',
    color: 'from-[#8b5cf6] to-[#ec4899]',
    shadow: 'rgba(139, 92, 246, 0.15)',
    filterTags: ['JavaScript']
  },
  {
    title: 'Al Huda Islamic School',
    subtitle: 'Educational Institution Portal',
    desc: 'Created a multi-page educational school website showcasing academic curriculum structures, dynamic image galleries, and event notice layouts optimized for mobile and desktop screens.',
    problemSolved: 'Displays school notice boards and curriculum structures digitally.',
    features: ['Dynamic Image Gallery', 'Event Notice Boards', 'Mobile Optimization'],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Clean Architecture'],
    icon: GraduationCap,
    live: 'https://al-huda-islamic-school.netlify.app/',
    github: 'https://github.com/Zakki-05',
    color: 'from-[#ec4899] to-[#00f0ff]',
    shadow: 'rgba(236, 72, 153, 0.15)',
    filterTags: ['JavaScript']
  },
  {
    title: 'Al Br Cafe',
    subtitle: 'Modern Cafe Web Application',
    desc: 'Custom-developed a responsive single-page restaurant platform featuring a seamless customer reservation system, Bootstrap grids, and mobile-first visual branding blocks.',
    problemSolved: 'Offers customers online cafe menu browsing and reservation bookings.',
    features: ['Booking System', 'Bootstrap Grids', 'Branding Blocks'],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap Framework'],
    icon: Coffee,
    live: 'https://github.com/Zakki-05',
    github: 'https://github.com/Zakki-05',
    color: 'from-[#f59e0b] to-[#ec4899]',
    shadow: 'rgba(245, 158, 11, 0.15)',
    filterTags: ['JavaScript']
  },
  {
    title: 'Library Management System',
    subtitle: 'Database Transaction Hub',
    desc: 'A secure relational management backend streamlining book borrowing workflows, QR code transactions, and clean inventory dashboards.',
    problemSolved: 'Automates manual book issue, return, and inventory management logs.',
    features: ['Relational Database Schemas', 'QR Code Transactions', 'Inventory Dashboard'],
    tech: ['Python Django', 'SQLite', 'Bootstrap', 'QR API'],
    icon: BookOpen,
    live: 'https://github.com/Zakki-05/library-management-zakki-05',
    github: 'https://github.com/Zakki-05/library-management-zakki-05',
    color: 'from-[#10b981] to-[#00f0ff]',
    shadow: 'rgba(16, 185, 129, 0.15)',
    filterTags: ['Django']
  },
  {
    title: 'Pernambut Connects Admin',
    subtitle: 'Relational Control Panel',
    desc: 'An advanced operational administrator dashboard managing local announcements, verified GOLD status credentials, custom prayer timings, and citizen donation charts.',
    problemSolved: 'Provides administrators with verified regional citizen management tools.',
    features: ['Verified Status Loops', 'Local Announcements', 'Citizen Donation Charts'],
    tech: ['React JS', 'Django REST', 'Recharts', 'Tailwind CSS'],
    icon: Network,
    live: 'https://github.com/Zakki-05',
    github: 'https://github.com/Zakki-05',
    color: 'from-[#00f0ff] to-[#ec4899]',
    shadow: 'rgba(0, 240, 255, 0.15)',
    filterTags: ['React', 'Django']
  }
];

export default function Projects() {
  const { playHover, playClick } = useSound();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Card Tilt Handler utilizing mouse coordinates
  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const factorX = x / (box.width / 2);
    const factorY = y / (box.height / 2);

    card.style.transform = `perspective(800px) rotateX(${-factorY * 10}deg) rotateY(${factorX * 10}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `0 15px 35px -5px ${PROJECTS[index].shadow}`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
    setHoveredIndex(null);
  };

  const filteredProjects = PROJECTS.filter(proj => {
    if (activeFilter === 'All') return true;
    return proj.filterTags && proj.filterTags.includes(activeFilter);
  });

  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden bg-[#030303]">
      
      {/* Background radial glow */}
      <div className="absolute top-[40%] left-[-10%] w-[450px] h-[450px] rounded-full bg-neon-purple/5 blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/5 text-neon-purple text-xs font-mono tracking-widest uppercase mb-4 animate-pulse-slow">
              <Sparkles className="w-3.5 h-3.5" />
              PRODUCT_DIRECTORY
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-poppins tracking-tight text-white uppercase leading-none">
              ADDITIONAL PROJECTS
            </h2>
            <p className="text-text-gray max-w-xl text-sm md:text-base font-light font-sans mt-4">
              A comprehensive showcase of creative portals, landing layouts, and database systems displaying versatile frontend capability.
            </p>
          </div>

          {/* Project Filters */}
          <div className="flex flex-wrap gap-2 justify-start md:justify-end shrink-0">
            {['All', 'React', 'JavaScript', 'Django'].map(filter => (
              <button
                key={filter}
                onClick={() => { playClick(); setActiveFilter(filter); }}
                onMouseEnter={playHover}
                className={`px-4 py-1.5 rounded-full border text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-neon-blue border-neon-blue text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.2)] scale-105'
                    : 'bg-white/[0.01] border-white/5 text-text-gray hover:border-white/10 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj, idx) => {
            const Icon = proj.icon;
            
            return (
              <div
                key={proj.title}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => { playHover(); setHoveredIndex(idx); }}
                onClick={playClick}
                className="rounded-[24px] glass-card p-5 flex flex-col justify-between min-h-[500px] relative select-none cursor-grab active:cursor-grabbing"
                style={{
                  transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
                  transformStyle: 'preserve-3d'
                }}
              >
                
                {/* 1. Card Image Mockup Viewport */}
                <div 
                  className={`h-[150px] rounded-2xl bg-[#09090b] border border-white/5 p-4 flex flex-col justify-between overflow-hidden relative group/mock`}
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {/* Grid Lines inside Mockup */}
                  <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />

                  {/* Top Bar details */}
                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-[7.5px] font-mono bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded text-white/50 tracking-widest uppercase">
                      BUILD.LOG // v1.0
                    </span>
                    <Icon className="w-3.5 h-3.5 text-white/30 group-hover/mock:text-neon-blue transition-colors animate-pulse" />
                  </div>

                  {/* Core Icon illustration */}
                  <div className="flex-1 flex items-center justify-center relative z-10 group-hover/mock:scale-105 transition-transform duration-500">
                    <div className="w-11 h-11 rounded-xl bg-black border border-white/5 flex items-center justify-center shadow-lg relative">
                      {/* Subtly glowing top line on hover */}
                      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent opacity-0 group-hover/mock:opacity-100 transition-opacity" />
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Bottom details block */}
                  <div className="relative z-10 flex justify-between items-center text-[8px] font-mono text-white/30">
                    <span>STATE: STABLE</span>
                    <span>READY</span>
                  </div>

                  {/* Subtle vector lines design */}
                  <div className="absolute -right-4 -bottom-4 w-20 h-20 border border-white/5 rounded-full scale-110 pointer-events-none" />
                </div>

                {/* 2. Text Details */}
                <div className="flex-1 flex flex-col justify-between pt-4 space-y-3.5" style={{ transform: 'translateZ(30px)' }}>
                  
                  {/* Metadata and Title */}
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-neon-blue uppercase tracking-widest font-bold">
                        {proj.subtitle}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold font-poppins text-white tracking-wide leading-tight">
                      {proj.title}
                    </h3>
                    <p className="text-[10px] text-text-gray/70 leading-relaxed font-sans font-light">
                      {proj.desc}
                    </p>

                    {/* Problem Solved */}
                    <div className="text-[10px] text-white/80 leading-normal font-sans pt-0.5">
                      <strong className="text-neon-purple font-semibold">Problem Solved: </strong>
                      {proj.problemSolved}
                    </div>

                    {/* Key Features */}
                    <div className="space-y-0.5">
                      <span className="text-[8px] font-mono text-text-gray/50 uppercase tracking-widest block font-bold">Key Features:</span>
                      <div className="flex flex-wrap gap-x-2.5 gap-y-0.5">
                        {proj.features.map(f => (
                          <span key={f} className="text-[9px] text-emerald-400 font-sans flex items-center gap-1 font-medium">
                            <span className="text-neon-teal text-[8px]">✔</span> {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1">
                    {proj.tech.map(t => (
                      <span key={t} className="text-[8px] font-mono bg-white/[0.01] border border-white/5 px-2 py-0.5 rounded text-white/80">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons footer */}
                  <div className="flex justify-between items-center pt-3 border-t border-white/[0.03]">
                    
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => { playClick(); e.stopPropagation(); }}
                      onMouseEnter={playHover}
                      className="py-2 px-3 -my-2 -mx-3 text-[10px] font-mono text-text-gray hover:text-white flex items-center gap-1.5 transition-colors uppercase tracking-widest font-bold"
                      aria-label={`View GitHub repository for project ${proj.title}`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      Repository
                    </a>

                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => { playClick(); e.stopPropagation(); }}
                      onMouseEnter={playHover}
                      className="py-2 px-3 -my-2 -mx-3 text-[10px] font-mono text-neon-blue font-bold flex items-center gap-1 hover:text-neon-purple transition-colors uppercase tracking-widest"
                      aria-label={`View live demo for project ${proj.title}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Preview
                    </a>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
