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

// ⚡ EmailJS Configuration — Get yours at https://www.emailjs.com
// Replace these placeholders with your actual EmailJS keys to connect the pipeline!
const EMAILJS_SERVICE_ID = 'service_your_id';
const EMAILJS_TEMPLATE_ID = 'template_your_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

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

    // Check if real keys are configured. If not, run in interactive demo mode.
    if (EMAILJS_SERVICE_ID === 'service_your_id' || EMAILJS_PUBLIC_KEY === 'your_public_key') {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setIsSubmitted(true);
      playSuccess();
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
      setIsSending(false);
      return;
    }

    try {
      const payload = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || `Portfolio Contact from ${formData.name}`,
          message: formData.message,
        }
      };

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSubmitted(true);
        playSuccess();
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      } else {
        const text = await response.text();
        setSubmitError(text || 'Something went wrong. Please check your EmailJS credentials.');
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
      className="relative py-28 md:py-36 px-6 overflow-hidden bg-[#030303]"
    >
      {/* Background ambient blobs */}
      <div className="absolute top-[10%] right-[-15%] w-[450px] h-[450px] rounded-full bg-neon-blue/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-neon-purple/[0.02] blur-[120px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 tech-grid-cyan opacity-10 pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.01] text-[9px] font-mono tracking-widest text-neon-blue uppercase">
            <Terminal className="w-3 h-3" />
            INIT_CONTACT // SECURE_TRANSMISSION
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins tracking-tight text-white uppercase">
            Let's Build{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-sm font-black">
              Something Epic
            </span>
          </h2>

          <p className="text-text-gray max-w-xl mx-auto text-xs md:text-sm font-light leading-relaxed font-sans mt-3">
            Open for freelance opportunities, full-time React engineering vacancies, and creative SaaS UI collaborations.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Left Column: Info Cards + Socials */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">

            {/* Contact Info Cards */}
            {CONTACT_INFO.map((info, i) => (
              <motion.div
                key={info.label}
                variants={itemVariants}
                className="glass-card rounded-2xl p-4.5 flex items-start gap-4 group"
                onMouseEnter={playHover}
              >
                <div className={`p-2.5 rounded-xl bg-white/[0.01] border border-white/5 group-hover:border-neon-blue/20 transition-colors`}>
                  <info.icon className="w-4.5 h-4.5 text-white/75 group-hover:text-neon-blue transition-colors" />
                </div>
                <div className="space-y-0.5 text-left">
                  <span className="text-[8px] font-mono tracking-widest text-text-gray/50 uppercase block">
                    {info.label}
                  </span>
                  {info.href ? (
                    <a
                      href={info.href}
                      onClick={playClick}
                      className="block text-xs text-white hover:text-neon-blue transition-colors font-medium"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-xs text-white font-medium">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social Links Strip */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5 space-y-4">
              <span className="text-[8px] font-mono tracking-widest text-text-gray/50 uppercase flex items-center gap-1.5 text-left">
                <Sparkles className="w-3 h-3 text-neon-purple animate-spin-slow" />
                CONNECT_CHANNELS
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
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-neon-blue/20 hover:bg-white/[0.02] transition-all group"
                    aria-label={`Visit Mohammed Zakki's ${social.label} profile`}
                  >
                    <social.icon className="w-3.5 h-3.5 text-text-gray/70 group-hover:text-neon-blue transition-colors" />
                    <span className="text-[10px] font-mono text-text-gray/80 group-hover:text-white transition-colors">{social.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-text-gray/30 group-hover:text-neon-blue ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Terminal-style availability status */}
            <motion.div variants={itemVariants} className="p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-[9px] text-text-gray/80 space-y-1.5 text-left">
              <div className="flex gap-1.5 items-center pb-2 border-b border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                <span className="text-[7.5px] text-white/30 ml-1">availability_status.sh</span>
              </div>
              <p><span className="text-neon-purple">$</span> <span className="text-neon-blue">check</span> --freelance-status</p>
              <p className="text-emerald-500">✓ Currently accepting new projects</p>
              <p><span className="text-neon-purple">$</span> <span className="text-neon-blue">response</span> --avg-time</p>
              <p className="text-white/60">⚡ Typically within 24 hours</p>
            </motion.div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="glass-card rounded-[24px] p-6 md:p-8 relative overflow-hidden">

              {/* Decorative corner accents */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-neon-blue/[0.02] to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-neon-purple/[0.02] to-transparent pointer-events-none" />

              {/* Form Header */}
              <div className="mb-6 space-y-1.5 text-left">
                <h3 className="text-lg md:text-xl font-bold font-poppins text-white">
                  Send a Message
                </h3>
                <p className="text-[8px] font-mono text-text-gray/40 uppercase tracking-widest">
                  // secure messaging endpoint
                </p>
              </div>

              {isSubmitted ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-poppins">Message Sent!</h4>
                  <p className="text-xs text-text-gray/80 text-center max-w-xs">
                    Thank you for your feedback. Zakki will review your message and reach back within 24 hours.
                  </p>
                  <span className="text-[8px] font-mono text-neon-blue uppercase tracking-widest animate-pulse mt-2">
                    TRANSMISSION_SUCCESSFUL ✓
                  </span>
                </motion.div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-name" className="text-[8.5px] font-mono text-text-gray/50 uppercase tracking-widest block pl-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={playHover}
                        required
                        placeholder="John Doe"
                        className="w-full px-3.5 py-3 rounded-xl bg-white/[0.01] border border-white/5 text-white text-xs font-light placeholder:text-white/10 focus:outline-none focus:border-neon-blue/30 transition-all font-sans"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-email" className="text-[8.5px] font-mono text-text-gray/50 uppercase tracking-widest block pl-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={playHover}
                        required
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-3 rounded-xl bg-white/[0.01] border border-white/5 text-white text-xs font-light placeholder:text-white/10 focus:outline-none focus:border-neon-blue/30 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-subject" className="text-[8.5px] font-mono text-text-gray/50 uppercase tracking-widest block pl-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="contact-subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={playHover}
                      required
                      placeholder="Project Collaboration / Hiring Enquiry"
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.01] border border-white/5 text-white text-xs font-light placeholder:text-white/10 focus:outline-none focus:border-neon-blue/30 transition-all font-sans"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-message" className="text-[8.5px] font-mono text-text-gray/50 uppercase tracking-widest block pl-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="contact-message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={playHover}
                      required
                      rows={4}
                      placeholder="Describe your technical requirements, timelines, or hiring parameters..."
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.01] border border-white/5 text-white text-xs font-light placeholder:text-white/10 focus:outline-none focus:border-neon-blue/30 transition-all resize-none font-sans"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSending}
                    onMouseEnter={playHover}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-3 rounded-full bg-white hover:bg-neon-blue text-black hover:text-black font-mono text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {isSending ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        SEND MESSAGE
                      </>
                    )}
                  </motion.button>

                  {/* Bottom fine print */}
                  <p className="text-[7.5px] font-mono text-text-gray/40 text-center tracking-widest uppercase pt-2">
                    // secure communication pipe routed via EmailJS REST
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
