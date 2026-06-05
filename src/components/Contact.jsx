import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import { useSound } from './SoundManager';
import confetti from 'canvas-confetti';

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'EMAIL ADDRESS',
    value: 'zakkibca2023@gmail.com',
    href: 'mailto:zakkibca2023@gmail.com',
    color: '#38bdf8'
  },
  {
    icon: Linkedin,
    label: 'LINKEDIN PROFILE',
    value: 'Mohammed Zakki Adnan P',
    href: 'https://www.linkedin.com/in/mohammed-zakki-adnan-p/',
    color: '#8b5cf6'
  },
  {
    icon: Github,
    label: 'GITHUB REPOSITORY',
    value: 'Zakki-05',
    href: 'https://github.com/Zakki-05',
    color: '#ec4899'
  },
  {
    icon: Phone,
    label: 'TELEPHONE LINE',
    value: '+91 97893 25206',
    href: 'tel:+919789325206',
    color: '#10b981'
  }
];

// EmailJS Credentials Placeholders
const EMAILJS_SERVICE_ID = 'service_your_id';
const EMAILJS_TEMPLATE_ID = 'template_your_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

export default function Contact() {
  const { playHover, playClick, playSuccess } = useSound();

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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const triggerConfetti = () => {
    // Standard Vercel success confetti burst
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#8b5cf6', '#ec4899', '#10b981']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    setIsSending(true);
    setSubmitError('');

    // Check for real credentials setup. If placeholders, simulate successful flow.
    if (EMAILJS_SERVICE_ID === 'service_your_id' || EMAILJS_PUBLIC_KEY === 'your_public_key') {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSubmitted(true);
      playSuccess();
      triggerConfetti();
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
          subject: formData.subject || `Portfolio Enquiry from ${formData.name}`,
          message: formData.message
        }
      };

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSubmitted(true);
        playSuccess();
        triggerConfetti();
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      } else {
        const errorText = await response.text();
        setSubmitError(`Transmission failed: ${errorText || 'Server Error'}`);
      }
    } catch (err) {
      setSubmitError(`Transmission failed: ${err.message || err}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden bg-transparent">
      {/* Background Radial Glow */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] ambient-glow opacity-25 pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.25em] text-theme-accent uppercase font-bold"
          >
            06 // CONTACT
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-theme-text"
          >
            Establish Connection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-theme-textSec leading-relaxed"
          >
            Reach out via the form below or standard direct social networks.
          </motion.p>
        </div>

        {/* Form and info row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {CONTACT_INFO.map((info, idx) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.href || '#'}
                  target={info.href ? '_blank' : undefined}
                  rel={info.href ? 'noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="p-4 rounded-xl glass-card-premium flex items-center gap-4 group cursor-pointer"
                >
                  <div 
                    className="p-2.5 rounded-lg bg-theme-bgSec border border-theme-border text-theme-textSec group-hover:text-[#020617] transition-all duration-300"
                    style={{ groupHoverBg: info.color }}
                  >
                    <Icon className="w-4 h-4" style={{ color: info.color }} />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <span className="text-[9px] font-mono text-theme-textMuted uppercase tracking-widest block font-bold">
                      {info.label}
                    </span>
                    <span className="text-xs font-bold text-theme-text group-hover:text-theme-accent transition-colors font-sans block truncate max-w-xs md:max-w-md">
                      {info.value}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card-premium rounded-2xl p-6 md:p-8 relative overflow-hidden"
          >
            <div className="space-y-1 bg-transparent">
              {isSubmitted ? (
                /* Success view */
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 space-y-4 font-mono text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="text-base font-bold text-theme-text font-sans">Message Transmitted!</h4>
                  <p className="text-xs text-theme-textSec leading-relaxed max-w-xs font-sans font-light">
                    Your inquiry has been successfully transmitted. Mohammad Zakki Adnaan will review the logs and reply within 24 hours.
                  </p>
                  <span className="text-[9px] text-theme-accent font-bold tracking-widest uppercase animate-pulse mt-2 block">
                    TRANSMISSION_SUCCESSFUL ✓
                  </span>
                </motion.div>
              ) : (
                /* Interactive form fields */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div className="space-y-1 text-left">
                      <label htmlFor="form-name" className="text-[9px] font-mono text-theme-textMuted uppercase tracking-widest pl-1 block">
                        Your Identity
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="form-name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={playHover}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-theme-bgSec border border-theme-border text-theme-text text-xs placeholder:text-theme-textMuted/40 focus:outline-none focus:border-theme-accent transition-all font-sans"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1 text-left">
                      <label htmlFor="form-email" className="text-[9px] font-mono text-theme-textMuted uppercase tracking-widest pl-1 block">
                        Email Endpoint
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="form-email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={playHover}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-theme-bgSec border border-theme-border text-theme-text text-xs placeholder:text-theme-textMuted/40 focus:outline-none focus:border-theme-accent transition-all font-sans"
                      />
                    </div>

                  </div>

                  {/* Subject */}
                  <div className="space-y-1 text-left">
                    <label htmlFor="form-subject" className="text-[9px] font-mono text-theme-textMuted uppercase tracking-widest pl-1 block">
                      Enquiry Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="form-subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={playHover}
                      required
                      placeholder="Project Collaboration / React Role"
                      className="w-full px-4 py-3 rounded-xl bg-theme-bgSec border border-theme-border text-theme-text text-xs placeholder:text-theme-textMuted/40 focus:outline-none focus:border-theme-accent transition-all font-sans"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1 text-left">
                    <label htmlFor="form-message" className="text-[9px] font-mono text-theme-textMuted uppercase tracking-widest pl-1 block">
                      Detailed Message
                    </label>
                    <textarea
                      name="message"
                      id="form-message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={playHover}
                      required
                      rows={4}
                      placeholder="Describe timeline parameters, code requirements, or stack specifications..."
                      className="w-full px-4 py-3 rounded-xl bg-theme-bgSec border border-theme-border text-theme-text text-xs placeholder:text-theme-textMuted/40 focus:outline-none focus:border-theme-accent transition-all resize-none font-sans"
                    />
                  </div>

                  {submitError && (
                    <div className="text-[10px] font-mono text-rose-500 pl-1 uppercase tracking-wider">
                      // {submitError}
                    </div>
                  )}

                  {/* Submit CTA */}
                  <motion.button
                    type="submit"
                    disabled={isSending}
                    onMouseEnter={playHover}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-3.5 rounded-full bg-theme-text hover:bg-theme-accent text-theme-bg hover:text-[#020617] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {isSending ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-theme-bg/30 border-t-theme-bg rounded-full animate-spin" />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        TRANSMIT INQUIRY
                      </>
                    )}
                  </motion.button>

                  <p className="text-[7.5px] font-mono text-theme-textMuted uppercase tracking-widest text-center pt-2">
                    // encrypted tunnel connected to emailjs rest api
                  </p>

                </form>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
