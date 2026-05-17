import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Instagram, ArrowUpRight, Sparkles, Terminal, CheckCircle } from 'lucide-react';
import { useSound } from './SoundManager';

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'EMAIL',
    value: 'zakkibca2023@gmail.com',
    href: 'mailto:zakkibca2023@gmail.com',
    color: 'neon-blue'
  },
  {
    icon: MapPin,
    label: 'LOCATION',
    value: 'Pernambut, Tamil Nadu, India',
    href: null,
    color: 'neon-purple'
  },
  {
    icon: Phone,
    label: 'AVAILABILITY',
    value: 'Open for Freelance & Full-Time',
    href: null,
    color: 'neon-blue'
  }
];

const SOCIAL_LINKS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Zakki-05' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammed-zakki-adnan-p/' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/mr_zakki_05/' },
  { icon: Mail, label: 'Email', href: 'mailto:zakkibca2023@gmail.com' }
];

// ⚡ Web3Forms Access Key — Get yours free at https://web3forms.com
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';

export default function Contact() {
  const { playHover, playClick, playSuccess } = useSound();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    setIsSending(true);
    setSubmitError('');

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        subject: formData.subject || `Portfolio Contact from ${formData.name}`,
        message: formData.message,
        from_name: 'Portfolio Contact Form',
        botcheck: '', // Honeypot spam protection
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        playSuccess();
        // Reset after showing success
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSending(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Background ambient blobs */}
      <div className="absolute top-[10%] right-[-15%] w-[500px] h-[500px] rounded-full bg-neon-blue/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 tech-grid-cyan opacity-30 pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-neon-blue uppercase">
            <Terminal className="w-3 h-3" />
            INIT_CONTACT // ESTABLISH_CONNECTION
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-poppins tracking-tight text-white">
            Let's Build{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple text-neon-glow">
              Something Epic
            </span>
          </h2>

          <p className="text-text-gray max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
            Got a project in mind, an idea to collaborate, or just want to say hello?
            I'm always open to discussing new opportunities and creative ventures.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column: Info Cards + Socials */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">

            {/* Contact Info Cards */}
            {CONTACT_INFO.map((info, i) => (
              <motion.div
                key={info.label}
                variants={itemVariants}
                className="glass-card rounded-2xl p-5 flex items-start gap-4 group"
                onMouseEnter={playHover}
              >
                <div className={`p-3 rounded-xl bg-${info.color}/10 border border-${info.color}/20 group-hover:border-${info.color}/40 transition-colors`}>
                  <info.icon className={`w-5 h-5 text-${info.color}`} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-text-gray uppercase">
                    {info.label}
                  </span>
                  {info.href ? (
                    <a
                      href={info.href}
                      onClick={playClick}
                      className="block text-sm text-white hover:text-neon-blue transition-colors font-medium"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm text-white font-medium">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social Links Strip */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-text-gray uppercase flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-neon-purple animate-spin-slow" />
                CONNECT_ON_SOCIALS
              </span>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_LINKS.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-neon-blue/30 hover:bg-white/5 transition-all group"
                  >
                    <social.icon className="w-4 h-4 text-text-gray group-hover:text-neon-blue transition-colors" />
                    <span className="text-xs font-mono text-text-gray group-hover:text-white transition-colors">{social.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-text-gray group-hover:text-neon-blue ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Terminal-style availability status */}
            <motion.div variants={itemVariants} className="p-4 bg-black/60 rounded-xl border border-white/5 font-mono text-[10px] text-text-gray space-y-1.5">
              <div className="flex gap-1.5 items-center pb-2 border-b border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[8px] text-white/40 ml-1">availability_status.sh</span>
              </div>
              <p><span className="text-neon-purple">$</span> <span className="text-neon-blue">check</span> --freelance-status</p>
              <p className="text-emerald-400">✓ Currently accepting new projects</p>
              <p><span className="text-neon-purple">$</span> <span className="text-neon-blue">response</span> --avg-time</p>
              <p className="text-white/60">⚡ Typically within 24 hours</p>
            </motion.div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden">

              {/* Decorative corner accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-neon-blue/5 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-neon-purple/5 to-transparent pointer-events-none" />

              {/* Form Header */}
              <div className="mb-8 space-y-2">
                <h3 className="text-xl md:text-2xl font-bold font-poppins text-white">
                  Send a Message
                </h3>
                <p className="text-[11px] font-mono text-text-gray uppercase tracking-wider">
                  // Fill out the form below and I'll get back to you ASAP
                </p>
              </div>

              {isSubmitted ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-poppins">Message Sent!</h4>
                  <p className="text-sm text-text-gray text-center max-w-sm">
                    Thanks for reaching out. I'll review your message and respond within 24 hours.
                  </p>
                  <span className="text-[10px] font-mono text-neon-blue uppercase tracking-widest animate-pulse">
                    TRANSMISSION_CONFIRMED ✓
                  </span>
                </motion.div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-text-gray uppercase tracking-widest">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={playHover}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm font-light placeholder:text-white/20 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/20 transition-all"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-text-gray uppercase tracking-widest">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={playHover}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm font-light placeholder:text-white/20 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-text-gray uppercase tracking-widest">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={playHover}
                      required
                      placeholder="Project Collaboration / Freelance / Hiring"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm font-light placeholder:text-white/20 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/20 transition-all"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-text-gray uppercase tracking-widest">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={playHover}
                      required
                      rows={5}
                      placeholder="Tell me about your project, idea, or just say hi..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm font-light placeholder:text-white/20 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/20 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSending}
                    onMouseEnter={playHover}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-black font-mono text-xs font-black tracking-widest uppercase flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        SEND MESSAGE
                      </>
                    )}
                  </motion.button>

                  {/* Bottom fine print */}
                  <p className="text-[9px] font-mono text-text-gray text-center tracking-wider uppercase">
                    // Your message will be sent to zakkibca2023@gmail.com
                  </p>
                </form>
              )}

            </div>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}
