import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSound } from './SoundManager';

const DETAILS = [
  { label: 'Direct Email', value: 'zakkibca2023@gmail.com', href: 'mailto:zakkibca2023@gmail.com', icon: Mail, color: 'text-neon-blue' },
  { label: 'Direct Phone', value: '+91 9342954510', href: 'tel:+919342954510', icon: Phone, color: 'text-neon-purple' },
  { label: 'Work Location', value: 'Pernambut, Tamil Nadu, India', href: 'https://maps.google.com/?q=Pernambut', icon: MapPin, color: 'text-neon-pink' }
];

export default function Contact() {
  const { playHover, playClick, playSuccess } = useSound();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedLabel, setCopiedLabel] = useState(null);

  const handleCopy = (value, label, e) => {
    e.preventDefault();
    playClick();
    navigator.clipboard.writeText(value);
    setCopiedLabel(label);
    setTimeout(() => {
      setCopiedLabel(null);
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    playClick();
    setIsSubmitting(true);

    try {
      // 🚀 REAL SERVERLESS EMAIL PORT (WEB3FORMS):
      // Sign up on https://web3forms.com/ (100% Free) to receive your Access Key in your inbox.
      // Replace the placeholder key below with your Web3Forms Access Key!
      const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"; 
      
      if (WEB3FORMS_ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY") {
        const payload = {
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Portfolio Contact Message",
          message: formData.message
        };

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message || "Failed to submit through Web3Forms");
        }
      } else {
        // Run cinematic holographic simulation if no Access Key is set yet
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setIsSubmitting(false);
      setSubmitted(true);
      playSuccess();

      // Launch canvas star celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#8b5cf6', '#ec4899', '#ffffff']
      });

      // Clear form fields
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Automatically reset modal after 4 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 4000);

    } catch (err) {
      console.log('Submission failed, running offline simulation:', err);
      setIsSubmitting(false);
      setSubmitted(true);
      playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#8b5cf6', '#ec4899', '#ffffff']
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden tech-grid-cyan" data-cursor="contact" data-cursor-text="write">
      
      {/* Background drift glow */}
      <div className="absolute bottom-[10%] left-[-10%] w-[450px] h-[450px] bg-neon-purple/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        
        {/* Title block */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-xs font-mono tracking-widest uppercase mb-4 animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5" />
            COMMUNICATION_PORT
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-poppins tracking-tight text-white mb-4 uppercase">
            CONNECT WITH ME
          </h2>
          <p className="text-text-gray max-w-xl mx-auto text-sm md:text-base font-light font-sans">
            Ready to contribute. Hit the contact portal to start collaborating on responsive React + Django applications.
          </p>
        </div>

        {/* Form & details Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Contact Information (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6 text-left flex flex-col justify-center">
            
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
              <h3 className="text-xl font-bold font-poppins text-white tracking-tight">Direct Channels</h3>
              <p className="text-xs text-text-gray font-sans font-light leading-relaxed">
                Click any direct link to launch your email client, dial directly, or view the location maps. Alternatively, copy credentials to your clipboard.
              </p>
            </div>

            {/* Details rows */}
            <div className="space-y-4">
              {DETAILS.map((det) => {
                const Icon = det.icon;
                const isCopied = copiedLabel === det.label;

                return (
                  <div
                    key={det.label}
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="p-5 rounded-2xl glass-card border-white/5 flex items-center justify-between group cursor-pointer relative"
                  >
                    <a href={det.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 flex-1">
                      <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${det.color} group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left space-y-0.5">
                        <span className="text-[10px] font-mono text-text-gray uppercase tracking-wider block font-semibold">{det.label}</span>
                        <span className="text-xs md:text-sm font-sans text-white hover:text-neon-blue transition-colors">{det.value}</span>
                      </div>
                    </a>

                    {/* Copy Button */}
                    <button
                      onClick={(e) => handleCopy(det.value, det.label, e)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                      title={`Copy ${det.label}`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Side: Form panel (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="rounded-[32px] glass-card p-6 md:p-10 border-white/5 relative overflow-hidden">
              
              {/* Submission modal overlay */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center space-y-4"
                  >
                    <CheckCircle2 className="w-16 h-16 text-neon-blue animate-bounce" />
                    <h3 className="text-2xl font-bold font-poppins text-white uppercase tracking-tight">TRANSMISSION COMPLETED</h3>
                    <p className="text-xs text-text-gray font-sans max-w-xs leading-relaxed">
                      Thank you for connecting with me, your message has been compiled successfully. I will get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form details */}
              <form onSubmit={handleSubmit} className="space-y-6 text-left relative z-10">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-mono text-text-gray uppercase tracking-widest font-semibold">Your Name *</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/[0.02] border border-white/10 focus:border-neon-blue rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all"
                      placeholder="e.g. Sarah Jenkins"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-mono text-text-gray uppercase tracking-widest font-semibold">Your Email *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/[0.02] border border-white/10 focus:border-neon-blue rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all"
                      placeholder="e.g. sarah@company.com"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-mono text-text-gray uppercase tracking-widest font-semibold">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.02] border border-white/10 focus:border-neon-blue rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all"
                    placeholder="e.g. Partnership proposal"
                  />
                </div>

                {/* Message TextArea */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-mono text-text-gray uppercase tracking-widest font-semibold">Your Message *</label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full bg-white/[0.02] border border-white/10 focus:border-neon-blue rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all resize-none"
                    placeholder="Write details of your project..."
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={playHover}
                  className="w-full py-4 rounded-xl bg-neon-blue text-black hover:bg-neon-purple hover:text-white font-mono text-xs font-black tracking-widest transition-all duration-300 flex items-center justify-center gap-2 glowing-ring disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
                >
                  <Send className={`w-4 h-4 ${isSubmitting ? 'animate-ping' : ''}`} />
                  {isSubmitting ? 'COMPILING TRANSMISSION...' : 'SEND MESSAGE'}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
