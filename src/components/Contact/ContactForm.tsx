'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Terminal, Phone, ExternalLink } from 'lucide-react';
import AnimatedSection from '@/components/Animation/AnimatedSection';

const CONTACT_EMAIL = 'kalathursomesh@gmail.com';
const CONTACT_PHONE = '+91 70328 34889';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'At least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Invalid email address';
        return '';
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'At least 5 characters';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'At least 10 characters';
        return '';
      case 'consent':
        if (!value) return 'Please accept the privacy policy';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    // Reset status on new input
    if (submitStatus !== 'idle') setSubmitStatus('idle');
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'honeypot') {
        const value = formData[key as keyof typeof formData];
        const error = validateField(key, value);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Free Web3Forms integration - Sends emails silently in the background
      // Note: Replace the access_key with your own key from https://web3forms.com/ (It's free)
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "4bd2811e-b70d-4849-a370-df070470b515",
          name: formData.name,
          email: formData.email,
          subject: `[Portfolio Query] ${formData.subject}`,
          message: formData.message,
          from_name: "Portfolio Notification",
        }),
      });

      const resData = await res.json();

      if (res.status === 200) {
        setSubmitStatus('success');
        setSubmitMessage("Message successfully sent! I'll get back to you soon.");
        setFormData({
          name: '', email: '', subject: '', message: '', honeypot: '', consent: false
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(resData.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setSubmitStatus('error');
      setSubmitMessage("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-xl
    bg-[#050510]/50 border border-white/10
    focus:border-[#00ff88]/50 focus:bg-[#00ff88]/5 focus:ring-0
    text-[#00ff88] placeholder-white/40 outline-none
    transition-all duration-300 disabled:opacity-50
    font-mono text-sm
  `;

  return (
    <section id="contact" className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #050510 0%, #060618 50%, #050510 100%)' }}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ff88]/3 blur-[200px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <div className="font-mono text-xs text-[#00ff88]/50 mb-3 inline-flex items-center gap-2">
            <span className="text-[#00ff88]">❯</span> ./send_message.sh
          </div>
          <h2 className="section-header mb-4">Get in touch.</h2>
          <p className="text-lg text-white/40 font-medium max-w-xl mx-auto">
            Have a project in mind, queries, or want to discuss an opportunity? Send me an email and I&apos;ll get back to you.
          </p>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Info Side */}
          <AnimatedSection animation="fadeInLeft" className="w-full lg:w-1/3 space-y-6">
            {/* Contact info window */}
            <div className="os-window">
              <div className="os-titlebar">
                <div className="os-titlebar-dots">
                  <div className="os-titlebar-dot bg-[#ff5f57]" />
                  <div className="os-titlebar-dot bg-[#febc2e]" />
                  <div className="os-titlebar-dot bg-[#28c840]" />
                </div>
                <span className="font-mono text-[10px] text-white/30 ml-3">contact.env</span>
              </div>

              <div className="p-6 space-y-6 font-mono text-sm">
                <div className="space-y-4">
                  <div className="text-[10px] text-[#00ff88]/40 uppercase tracking-widest">// endpoints</div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
                      <Mail className="w-4 h-4 text-[#00ff88]" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/20 uppercase tracking-wider">EMAIL</div>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-white/70 hover:text-[#00ff88] transition-colors text-xs">
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                      <Phone className="w-4 h-4 text-[#a855f7]" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/20 uppercase tracking-wider">PHONE</div>
                      <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="text-white/70 hover:text-[#a855f7] transition-colors text-xs">
                        {CONTACT_PHONE}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
                      <MapPin className="w-4 h-4 text-[#00d4ff]" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/20 uppercase tracking-wider">LOCATION</div>
                      <p className="text-white/70 text-xs">Bangalore, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response time + direct email CTA */}
            <div className="os-window">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4 text-[#00ff88]" />
                  <span className="font-mono text-xs text-[#00ff88]">response_time</span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed mb-5">
                  I typically respond within <span className="text-[#00ff88] font-bold">24 hours</span>. Whether it&apos;s a job opportunity, queries, or a collaborative project, I&apos;m always open to connecting.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('[Portfolio] Query')}`}
                  className="btn-matrix w-full py-3 text-sm justify-center group"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email me directly
                  <ExternalLink className="w-3 h-3 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Form Side */}
          <AnimatedSection animation="fadeInRight" className="w-full lg:w-2/3">
            <div className="os-window">
              <div className="os-titlebar">
                <div className="os-titlebar-dots">
                  <div className="os-titlebar-dot bg-[#ff5f57]" />
                  <div className="os-titlebar-dot bg-[#febc2e]" />
                  <div className="os-titlebar-dot bg-[#28c840]" />
                </div>
                <span className="font-mono text-[10px] text-white/30 ml-3">compose_message.sh</span>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                <input type="text" name="honeypot" value={formData.honeypot} onChange={handleInputChange} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-white/30 uppercase tracking-wider ml-1">name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`${inputClasses} ${errors.name ? '!border-[#ff3366]/50' : ''}`}
                      placeholder="your_name"
                    />
                    {errors.name && <p className="text-xs text-[#ff3366] font-mono ml-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-white/30 uppercase tracking-wider ml-1">email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`${inputClasses} ${errors.email ? '!border-[#ff3366]/50' : ''}`}
                      placeholder="you@email.com"
                    />
                    {errors.email && <p className="text-xs text-[#ff3366] font-mono ml-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-white/30 uppercase tracking-wider ml-1">subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`${inputClasses} ${errors.subject ? '!border-[#ff3366]/50' : ''}`}
                    placeholder="re: collaboration"
                  />
                  {errors.subject && <p className="text-xs text-[#ff3366] font-mono ml-1">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-white/30 uppercase tracking-wider ml-1">message</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`${inputClasses} ${errors.message ? '!border-[#ff3366]/50' : ''} resize-none`}
                    placeholder="Write your message or query here..."
                  />
                  {errors.message && <p className="text-xs text-[#ff3366] font-mono ml-1">{errors.message}</p>}
                </div>

                <div className="flex items-center gap-3 px-1">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    //@ts-ignore
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 accent-[#00ff88] cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-sm text-white/40 cursor-pointer select-none">
                    I agree to the privacy policy.
                  </label>
                </div>
                {errors.consent && <p className="text-xs text-[#ff3366] font-mono ml-1">{errors.consent}</p>}

                <AnimatePresence>
                  {submitStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: 10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      className={`p-4 rounded-xl flex items-center gap-3 font-mono text-sm ${
                        submitStatus === 'success'
                          ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20'
                          : 'bg-[#ff3366]/10 text-[#ff3366] border border-[#ff3366]/20'
                      }`}
                    >
                      {submitStatus === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                      <p>{submitMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-matrix w-full py-4 text-base justify-center"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-[#00ff88]/20 border-t-[#00ff88] rounded-full animate-spin" />
                      sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <Send className="w-5 h-5" />
                      ./send.sh
                    </span>
                  )}
                </motion.button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;