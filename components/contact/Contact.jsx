'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import ScrollBasedAnimation from '../../components/ScrollBasedAnimation';
import { usePathname } from 'next/navigation';

export default function Contact() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Send fields separately for clean email formatting
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,      
        company: formData.company,  
        subject: `New Inquiry: ${formData.company || formData.name}`,
        message: formData.message   
      };

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: isArabic ? 'تم استلام رسالتك! سنتواصل معك قريباً.' : 'Message received! We will be in touch shortly.' 
        });
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: isArabic ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className="relative w-full py-24 md:py-32 bg-secondary overflow-hidden text-white" 
      id="contact"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background Assets */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      <div className={`absolute top-0 w-[800px] h-[800px] pointer-events-none opacity-10 bg-[radial-gradient(circle,theme(colors.accent)_0%,transparent_70%)] ${isArabic ? '-left-1/4' : '-right-1/4'} -translate-y-1/2`} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT COLUMN: INFO */}
          <div>
            <ScrollBasedAnimation direction="up">
              <h2 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-6">
                {isArabic ? (
                  <>تواصل <span className="text-accent">معنا.</span></>
                ) : (
                  <>Get in <span className="text-accent">touch.</span></>
                )}
              </h2>
            </ScrollBasedAnimation>

            <ScrollBasedAnimation direction="up" delay={0.1}>
              <p className="text-gray-400 text-lg md:text-xl font-light mb-12 max-w-md leading-relaxed">
                {isArabic 
                  ? 'أخبرنا عنك وعن مشروعك. لنبني شيئاً رقمياً ومؤثراً معاً.'
                  : "Tell us about you and your project. Let's build something digital and impactful together."}
              </p>
            </ScrollBasedAnimation>

            <div className="space-y-8 mb-12">
              <ScrollBasedAnimation direction="up" delay={0.2}>
                <a href="tel:+966573672733" className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300 flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">{isArabic ? 'اتصل بنا' : 'Call Us'}</span>
                    <span className="text-xl font-medium text-white" dir="ltr">+966 57 367 2733</span>
                  </div>
                </a>
              </ScrollBasedAnimation>

              <ScrollBasedAnimation direction="up" delay={0.3}>
                <a href="mailto:info@creativeedigital.com" className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300 flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">{isArabic ? 'راسلنا' : 'Email Us'}</span>
                    <span className="text-xl font-medium text-white">info@creativeedigital.com</span>
                  </div>
                </a>
              </ScrollBasedAnimation>

              <ScrollBasedAnimation direction="up" delay={0.4}>
                <div className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">{isArabic ? 'زورنا' : 'Visit Us'}</span>
                    <span className="text-xl font-medium text-white">{isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</span>
                  </div>
                </div>
              </ScrollBasedAnimation>
            </div>
          </div>

          {/* RIGHT COLUMN: FORM */}
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <ScrollBasedAnimation direction="up" delay={0.1}>
                <div className="relative group">
                  <input 
                    required name="name" value={formData.name} onChange={handleChange} type="text" 
                    placeholder={isArabic ? 'الاسم الكريم' : 'Tell us your name!'}
                    className="w-full bg-[#211e24] border border-white/10 text-white rounded-full px-8 py-5 outline-none focus:border-accent transition-colors duration-300 placeholder:text-gray-500 text-start"
                  />
                </div>
              </ScrollBasedAnimation>

              <ScrollBasedAnimation direction="up" delay={0.2}>
                <div className="relative group">
                  <input 
                    required name="email" value={formData.email} onChange={handleChange} type="email" 
                    placeholder={isArabic ? 'البريد الإلكتروني' : 'Your email'}
                    className="w-full bg-[#211e24] border border-white/10 text-white rounded-full px-8 py-5 outline-none focus:border-accent transition-colors duration-300 placeholder:text-gray-500 text-start"
                  />
                </div>
              </ScrollBasedAnimation>

              <ScrollBasedAnimation direction="up" delay={0.3}>
                <div className="relative group">
                  <input 
                    name="phone" value={formData.phone} onChange={handleChange} type="tel" 
                    placeholder={isArabic ? 'رقم الهاتف' : 'Your phone'}
                    className="w-full bg-[#211e24] border border-white/10 text-white rounded-full px-8 py-5 outline-none focus:border-accent transition-colors duration-300 placeholder:text-gray-500 text-start"
                    dir={isArabic ? 'rtl' : 'ltr'} 
                  />
                </div>
              </ScrollBasedAnimation>

              <ScrollBasedAnimation direction="up" delay={0.4}>
                <div className="relative group">
                  <input 
                    name="company" value={formData.company} onChange={handleChange} type="text" 
                    placeholder={isArabic ? 'اسم الشركة' : 'Your Company'}
                    className="w-full bg-[#211e24] border border-white/10 text-white rounded-full px-8 py-5 outline-none focus:border-accent transition-colors duration-300 placeholder:text-gray-500 text-start"
                  />
                </div>
              </ScrollBasedAnimation>

              <ScrollBasedAnimation direction="up" delay={0.5}>
                <div className="relative group">
                  <textarea 
                    required name="message" value={formData.message} onChange={handleChange} rows={4}
                    placeholder={isArabic ? 'كيف يمكننا مساعدتك؟' : 'What is your requirement?'}
                    className="w-full bg-[#211e24] border border-white/10 text-white rounded-3xl px-8 py-5 outline-none focus:border-accent transition-colors duration-300 placeholder:text-gray-500 resize-none text-start"
                  />
                </div>
              </ScrollBasedAnimation>

            

              <ScrollBasedAnimation direction="up" delay={0.7}>
                <div className="mt-8 flex flex-col items-start gap-4">
                  <button 
                    type="submit" disabled={isSubmitting}
                    className="w-full md:w-auto group flex items-center justify-center gap-4 bg-white text-black px-10 py-5 rounded-full font-medium hover:bg-accent disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform-gpu active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>{isArabic ? 'جاري الإرسال...' : 'Sending...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{isArabic ? 'إرسال الطلب' : 'Send Inquiry'}</span>
                        <Send size={18} className={`transition-transform duration-300 ${isArabic ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} group-hover:-translate-y-1`} />
                      </>
                    )}
                  </button>

                  {status.message && (
                    <div className={`flex items-center gap-2 text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                      <span>{status.message}</span>
                    </div>
                  )}
                </div>
              </ScrollBasedAnimation>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}