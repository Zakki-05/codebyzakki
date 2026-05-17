import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, ExternalLink, Github, Share2, Play, Volume2, VolumeX, Sparkles, Send, Award, Compass, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSound } from './SoundManager';

// Projects data localized for the Reels component
const REEL_PROJECTS = [
  {
    id: 1,
    title: 'Pernambut Connection',
    subtitle: 'Full Stack Community Platform',
    desc: 'The ultimate digital hub connecting Pernambut citizens. Highly scalable architecture featuring real-time announcements, localized API integrations, security, and a stunning contribution system.',
    tech: ['React JS', 'Tailwind CSS', 'Django', 'REST API'],
    likes: 384,
    comments: [
      { user: 'Sarah_HR_Tech', text: 'This dashboard is incredibly slick. Love the integration! 🔥' },
      { user: 'Sanjay_Lead_Dev', text: 'Clean Django REST API structure. Absolute masterpiece!' },
      { user: 'Emily_UX_Expert', text: 'The micro-interactions are pure joy. Awwwards level.' }
    ],
    github: 'https://github.com/Zakki-05/pernambut-connect-ui',
    live: 'https://pernambut-connection.netlify.app/',
    gradient: 'from-[#00f0ff] to-[#8b5cf6]',
    visualPattern: 'circles'
  },
  {
    id: 2,
    title: 'Pernambut Hub',
    subtitle: 'Local Portal & Directory',
    desc: 'A premium portal for local business directories, services, and mosque timings in Pernambut. Built with high-speed performance and interactive localized Google Map clusters.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Google Maps API'],
    likes: 247,
    comments: [
      { user: 'Adil_Pernambut', text: 'Super useful app for our local community. Thank you, Zakki!' },
      { user: 'Recruiter_Alpha', text: 'Highly practical tool showing authentic regional impact.' }
    ],
    github: 'https://github.com/Zakki-05',
    live: 'https://pernambut-hub.onrender.com/',
    gradient: 'from-[#8b5cf6] to-[#ec4899]',
    visualPattern: 'matrix'
  },
  {
    id: 3,
    title: 'Tech Zone Ecommerce',
    subtitle: 'Modern Electronic Storefront',
    desc: 'An immersive digital storefront featuring fluid shopping cart operations, local storage caching, custom currency filters, high-fidelity responsive catalogs, and Stripe secure checkouts.',
    tech: ['React JS', 'Redux Toolkit', 'Tailwind CSS', 'Stripe API'],
    likes: 312,
    comments: [
      { user: 'Jane_Product_Manager', text: 'That React Redux state management is rock solid! 👏' },
      { user: 'NodeCoder', text: 'Stripe integration works beautifully. Code quality is top-tier!' }
    ],
    github: 'https://github.com/Zakki-05',
    live: 'https://tech-zone-zakki-05.netlify.app/',
    gradient: 'from-[#ec4899] to-[#00f0ff]',
    visualPattern: 'cubes'
  },
  {
    id: 4,
    title: 'Al Huda Islamic School',
    subtitle: 'Educational Institution Portal',
    desc: 'A sophisticated academic platform designed for student enrolment, event logs, responsive galleries, and visual notifications. Built with luxurious aesthetic harmony.',
    tech: ['React JS', 'Framer Motion', 'Tailwind CSS'],
    likes: 198,
    comments: [
      { user: 'Principle_AlHuda', text: 'Wonderful layout, parents loved the intuitive interface!' },
      { user: 'Design_Guru', text: 'The typography choices are pristine. So clean.' }
    ],
    github: 'https://github.com/Zakki-05',
    live: 'https://al-huda-islamic-school.netlify.app/',
    gradient: 'from-[#00f0ff] to-[#10b981]',
    visualPattern: 'curves'
  },
  {
    id: 5,
    title: 'Digital Marketing Site',
    subtitle: 'High-Conversion Agency Landing Page',
    desc: 'A high-converting promotional platform optimized for client generation. Features dynamic landing layout variants, optimized media bundles, and fluid CTA triggers.',
    tech: ['HTML5', 'Tailwind CSS', 'Vanilla JavaScript'],
    likes: 215,
    comments: [
      { user: 'GrowthMarketer', text: 'This loading speed is insane. Instant load!' },
      { user: 'Startup_Founder', text: 'Love the floating elements. Exactly what agencies need.' }
    ],
    github: 'https://github.com/Zakki-05',
    live: 'https://digital-marketing-zakki.netlify.app/',
    gradient: 'from-[#f59e0b] to-[#ec4899]',
    visualPattern: 'grid'
  }
];

export default function ReelShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [likedStates, setLikedStates] = useState({});
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [typedComment, setTypedComment] = useState('');
  const [customComments, setCustomComments] = useState({});
  
  const { playHover, playClick, playTransition, playSuccess } = useSound();
  const containerRef = useRef(null);

  // Spark confetti explosion when Liking a reel
  const handleLike = (id, event) => {
    event.stopPropagation();
    playClick();
    
    const isAlreadyLiked = likedStates[id];
    setLikedStates(prev => ({ ...prev, [id]: !prev[id] }));

    if (!isAlreadyLiked) {
      // Fire confetti from the click coordinates if possible, or center
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00f0ff', '#8b5cf6', '#ffffff']
      });
      playSuccess();
    }
  };

  const handleShare = (title, url, event) => {
    event.stopPropagation();
    playClick();
    navigator.clipboard.writeText(url);
    setShowShareNotification(true);
    setTimeout(() => {
      setShowShareNotification(false);
    }, 2500);
  };

  // Simulated custom user comments
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!typedComment.trim()) return;
    
    playClick();
    const activeProjId = REEL_PROJECTS[activeIndex].id;
    const currentList = customComments[activeProjId] || [];
    
    setCustomComments({
      ...customComments,
      [activeProjId]: [...currentList, { user: 'You_Recruiter', text: typedComment }]
    });
    setTypedComment('');
    playSuccess();
  };

  const nextReel = () => {
    if (activeIndex < REEL_PROJECTS.length - 1) {
      playTransition();
      setActiveIndex(prev => prev + 1);
    } else {
      // Loop back to start
      playTransition();
      setActiveIndex(0);
    }
  };

  const prevReel = () => {
    if (activeIndex > 0) {
      playTransition();
      setActiveIndex(prev => prev - 1);
    } else {
      playTransition();
      setActiveIndex(REEL_PROJECTS.length - 1);
    }
  };

  const activeProject = REEL_PROJECTS[activeIndex];
  const allComments = [
    ...activeProject.comments,
    ...(customComments[activeProject.id] || [])
  ];

  return (
    <section id="reels-showcase" className="relative py-24 px-4 overflow-hidden tech-grid-cyan">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-glow rounded-full blur-[100px] pointer-events-none z-0 opacity-40"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-xs font-mono tracking-widest uppercase mb-4 animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5" />
            Recruiter Addiction
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight font-poppins mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-text-gray to-neon-blue uppercase">
            Cinematic Reels
          </h2>
          <p className="text-text-gray max-w-xl mx-auto text-sm md:text-base font-light font-sans">
            Swipe through premium vertical showcase decks mimicking luxury video reels. Interactive codes, simulated feedback, and direct live deployment links.
          </p>
        </div>

        {/* Swipe Core Wrapper */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          
          {/* Left instructions board */}
          <div className="w-full lg:w-5/12 text-left space-y-6">
            <div className="p-6 rounded-2xl glass-card border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <Compass className="w-6 h-6 text-neon-blue animate-spin-slow" />
                <h3 className="font-poppins text-lg font-bold text-white">Reel Interaction Console</h3>
              </div>
              
              <p className="text-xs text-text-gray leading-relaxed font-sans">
                Experience web projects styled exactly like viral tech showcase videos. Hover over cards to warp your custom cursor, hit <span className="text-neon-pink">Like</span> to celebrate with starbursts, or inspect the interactive <span className="text-neon-blue">recruiters comment section</span>.
              </p>

              {/* Navigation Indicators */}
              <div className="pt-4 flex flex-wrap gap-2">
                {REEL_PROJECTS.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => { playClick(); setActiveIndex(idx); }}
                    onMouseEnter={playHover}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? 'w-8 bg-neon-blue glowing-ring' : 'w-2.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-4 font-mono">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-center">
                <span className="text-text-gray text-[10px] uppercase tracking-wider">Active Reel</span>
                <span className="text-xl font-bold text-white mt-1">0{activeIndex + 1} / 0{REEL_PROJECTS.length}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-center">
                <span className="text-text-gray text-[10px] uppercase tracking-wider">Social Actions</span>
                <span className="text-xl font-bold text-neon-purple mt-1">{(likedStates[activeProject.id] ? activeProject.likes + 1 : activeProject.likes) + allComments.length} Reacts</span>
              </div>
            </div>

            {/* Direction Navigation buttons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={prevReel}
                onMouseEnter={playHover}
                className="px-6 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-neon-blue hover:text-black hover:border-neon-blue text-xs font-mono font-bold tracking-widest transition-all duration-300 flex-1 text-center"
              >
                SWIPE PREV
              </button>
              <button 
                onClick={nextReel}
                onMouseEnter={playHover}
                className="px-6 py-3 rounded-lg border border-white/10 bg-neon-blue text-black font-mono font-bold tracking-widest transition-all duration-300 flex-1 text-center glowing-ring hover:bg-neon-purple hover:text-white"
              >
                SWIPE NEXT
              </button>
            </div>
          </div>

          {/* Central Instagram Reel Smart Phone Shell */}
          <div className="relative w-[340px] h-[640px] sm:w-[360px] sm:h-[680px] bg-black rounded-[52px] p-3 border-4 border-white/10 shadow-[0_0_80px_rgba(0,240,255,0.15)] flex flex-col select-none z-10">
            
            {/* Phone Front Camera notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10"></div>
            </div>

            {/* Main Inside Viewport */}
            <div className="relative flex-1 bg-background-secondary rounded-[42px] overflow-hidden flex flex-col border border-white/5">
              
              {/* Active project card wrapper with parallax */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 120, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -120, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="absolute inset-0 flex flex-col"
                >
                  {/* Dynamic Project Visualizer Panel representing vertical video */}
                  <div className={`relative h-2/3 bg-gradient-to-br ${activeProject.gradient} p-6 flex flex-col justify-between overflow-hidden group`}>
                    
                    {/* Visualizer animation details depending on pattern type */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      {activeProject.visualPattern === 'circles' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-48 h-48 border border-white rounded-full animate-ping"></div>
                          <div className="absolute w-72 h-72 border border-white/50 rounded-full animate-spin-slow"></div>
                        </div>
                      )}
                      {activeProject.visualPattern === 'matrix' && (
                        <div className="tech-grid w-full h-full animate-pulse-slow"></div>
                      )}
                      {activeProject.visualPattern === 'cubes' && (
                        <div className="absolute w-full h-full flex flex-wrap gap-4 p-4">
                          {Array.from({ length: 32 }).map((_, i) => (
                            <div key={i} className="w-8 h-8 rounded border border-white/30 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                          ))}
                        </div>
                      )}
                      {activeProject.visualPattern === 'curves' && (
                        <div className="absolute inset-0 border-[20px] border-white/10 rounded-full scale-125 animate-float"></div>
                      )}
                      {activeProject.visualPattern === 'grid' && (
                        <div className="tech-grid-cyan w-full h-full"></div>
                      )}
                    </div>

                    {/* Floating top bar info */}
                    <div className="relative flex justify-between items-center z-10 pt-4">
                      <span className="text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded-full text-white tracking-widest uppercase flex items-center gap-1.5 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                        LIVE PREVIEW
                      </span>
                      <div className="flex gap-2">
                        <a 
                          href={activeProject.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => { playClick(); e.stopPropagation(); }}
                          onMouseEnter={playHover}
                          className="p-1.5 rounded-full bg-black/40 hover:bg-neon-blue hover:text-black transition-colors"
                          title="Open Live Website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <a 
                          href={activeProject.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => { playClick(); e.stopPropagation(); }}
                          onMouseEnter={playHover}
                          className="p-1.5 rounded-full bg-black/40 hover:bg-neon-purple hover:text-white transition-colors"
                          title="Open Github Code"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Animated central project visual logo/title block */}
                    <div className="relative flex flex-col items-center justify-center text-center py-4 z-10 group-hover:scale-105 transition-transform duration-500">
                      <div className="w-16 h-16 rounded-2xl bg-black/50 border border-white/20 flex items-center justify-center mb-3 shadow-lg backdrop-blur-md">
                        <Award className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <h4 className="text-xl font-black font-poppins text-white drop-shadow-md tracking-tight">
                        {activeProject.title}
                      </h4>
                      <p className="text-[10px] font-mono text-white/70 uppercase tracking-widest mt-1">
                        {activeProject.subtitle}
                      </p>
                    </div>

                    {/* Technical badge overlay */}
                    <div className="relative z-10 flex flex-wrap gap-1.5 max-w-[90%]">
                      {activeProject.tech.map(t => (
                        <span key={t} className="text-[9px] font-mono bg-black/60 px-2 py-0.5 rounded text-neon-blue border border-neon-blue/10 backdrop-blur-md">
                          #{t.replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>

                    {/* Bottom gradient fade */}
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
                  </div>

                  {/* Reel Metadata Details & Bottom Panel (simulated player details) */}
                  <div className="h-1/3 bg-black/95 p-4 flex flex-col justify-between border-t border-white/5 relative">
                    
                    {/* Main description section */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-neon-blue/10 border border-neon-blue/40 flex items-center justify-center font-mono text-[9px] font-bold text-neon-blue">
                          MZ
                        </div>
                        <span className="text-xs font-bold text-white font-poppins">codebyzakki.in</span>
                        <span className="text-[9px] bg-neon-blue/10 text-neon-blue border border-neon-blue/30 px-1.5 py-0.2 rounded font-mono font-bold animate-pulse">DEV</span>
                      </div>
                      <p className="text-[10px] text-text-gray font-light font-sans line-clamp-3 leading-relaxed">
                        {activeProject.desc}
                      </p>
                    </div>

                    {/* Scrolling Audio Marquee bar mimicking Instagram */}
                    <div className="flex justify-between items-center pt-2 border-t border-white/5 font-mono text-[9px] text-text-gray">
                      <div className="flex items-center gap-1.5 overflow-hidden w-2/3">
                        <span className="animate-pulse">🎵</span>
                        <div className="whitespace-nowrap overflow-hidden relative w-full">
                          <span className="inline-block animate-marquee uppercase tracking-wider">Original Audio - CodeByZakki.in</span>
                        </div>
                      </div>
                      <span className="text-white/60 font-bold bg-white/5 px-2 py-0.5 rounded text-[8px]">
                        SWIPE FOR MORE
                      </span>
                    </div>

                    {/* Right vertical action bar floating on phone overlay */}
                    <div className="absolute right-4 bottom-20 flex flex-col items-center gap-4 z-20">
                      
                      {/* Heart Like button */}
                      <div className="flex flex-col items-center">
                        <button
                          onClick={(e) => handleLike(activeProject.id, e)}
                          onMouseEnter={playHover}
                          className={`p-2.5 rounded-full transition-all duration-300 shadow-md ${
                            likedStates[activeProject.id] 
                              ? 'bg-neon-pink text-white scale-125' 
                              : 'bg-black/60 text-white hover:text-neon-pink hover:bg-black/80'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${likedStates[activeProject.id] ? 'fill-current' : ''}`} />
                        </button>
                        <span className="text-[9px] font-mono text-white/80 mt-1">
                          {likedStates[activeProject.id] ? activeProject.likes + 1 : activeProject.likes}
                        </span>
                      </div>

                      {/* Comment Drawer button */}
                      <div className="flex flex-col items-center">
                        <button
                          onClick={(e) => { playClick(); e.stopPropagation(); setCommentsVisible(true); }}
                          onMouseEnter={playHover}
                          className="p-2.5 rounded-full bg-black/60 text-white hover:text-neon-blue hover:bg-black/80 shadow-md transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <span className="text-[9px] font-mono text-white/80 mt-1">
                          {allComments.length}
                        </span>
                      </div>

                      {/* Share Copy button */}
                      <div className="flex flex-col items-center">
                        <button
                          onClick={(e) => handleShare(activeProject.title, activeProject.live, e)}
                          onMouseEnter={playHover}
                          className="p-2.5 rounded-full bg-black/60 text-white hover:text-neon-purple hover:bg-black/80 shadow-md transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <span className="text-[9px] font-mono text-white/80 mt-1">Share</span>
                      </div>

                      {/* Spinning audio vinyl disc */}
                      <div className="w-8 h-8 rounded-full border border-white/20 bg-gradient-to-br from-neon-blue to-neon-purple p-0.5 animate-spin-slow shadow-lg">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[7px]">⚡</div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

                {/* Inside simulated smartphone: Recruiters Comment Drawer Overlay */}
                <AnimatePresence>
                  {commentsVisible && (
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                      className="absolute inset-x-0 bottom-0 h-4/5 bg-black/95 border-t border-white/10 rounded-t-[32px] p-4 flex flex-col justify-between z-30 shadow-[0_-10px_30px_rgba(0,240,255,0.15)]"
                    >
                      {/* Comments Drawer Header */}
                      <div className="flex justify-between items-center pb-2 border-b border-white/5 font-poppins">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5 text-neon-blue" />
                          Recruiter Reviews
                        </span>
                        <button
                          onClick={() => { playClick(); setCommentsVisible(false); }}
                          onMouseEnter={playHover}
                          className="text-[10px] font-mono text-neon-pink hover:underline uppercase tracking-wider"
                        >
                          Close
                        </button>
                      </div>

                      {/* Comments List scrollbox */}
                      <div className="flex-1 overflow-y-auto py-3 space-y-3 no-scrollbar">
                        {allComments.map((comm, idx) => (
                          <div key={idx} className="text-[10px] space-y-0.5 bg-white/[0.02] p-2 rounded-lg border border-white/5">
                            <span className="font-bold text-neon-blue font-mono block">@{comm.user}</span>
                            <p className="text-text-gray font-sans">{comm.text}</p>
                          </div>
                        ))}
                      </div>

                      {/* Add comment Form */}
                      <form onSubmit={handleAddComment} className="flex gap-1.5 pt-2 border-t border-white/5">
                        <input
                          type="text"
                          placeholder="Add recommendation..."
                          value={typedComment}
                          onChange={(e) => setTypedComment(e.target.value)}
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-neon-blue transition-colors font-sans"
                        />
                        <button
                          type="submit"
                          onMouseEnter={playHover}
                          className="p-1.5 rounded-xl bg-neon-blue hover:bg-neon-purple text-black hover:text-white transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </div>

        </div>

      {/* Floating Clipboard Copy Success Overlay */}
      <AnimatePresence>
        {showShareNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[999] px-6 py-3 rounded-full bg-neon-purple text-white text-xs font-mono font-bold tracking-widest shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            LIVE LINK COPIED TO CLIPBOARD
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tailwind animation helper style block */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </section>
  );
}
