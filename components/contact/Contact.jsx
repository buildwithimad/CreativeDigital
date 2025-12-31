'use client';

import React, { useEffect, useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
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


    useEffect(() => {
  if (status.type === 'success') {
    const timer = setTimeout(() => {
      setStatus({ type: '', message: '' });
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }
}, [status.type]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        subject: `New Inquiry: ${formData.company || formData.name}`,
        message: formData.message,
      };

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: isArabic
            ? 'تم استلام رسالتك! سنتواصل معك قريباً.'
            : 'Message received! We will be in touch shortly.',
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        });
      } else {
        throw new Error('Failed');
      }
    } catch {
      setStatus({
        type: 'error',
        message: isArabic
          ? 'حدث خطأ. يرجى المحاولة مرة أخرى.'
          : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      dir={isArabic ? 'rtl' : 'ltr'}
      className="relative w-full py-24 md:py-32 bg-secondary overflow-hidden text-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* LEFT COLUMN */}
          <div>
            <ScrollBasedAnimation direction="up">
              <h2 className="text-5xl md:text-8xl font-light mb-6">
                {isArabic ? 'تواصل معنا.' : 'Get in touch.'}
              </h2>
            </ScrollBasedAnimation>

            <ScrollBasedAnimation direction="up" delay={0.1}>
              <p className="text-gray-400 text-lg mb-12 max-w-md">
                {isArabic
                  ? 'أخبرنا عنك وعن مشروعك.'
                  : "Tell us about you and your project."}
              </p>
            </ScrollBasedAnimation>

            <div className="space-y-6">
              <a href="tel:+966511267458" data-gtm="phone-click" className="flex items-center gap-4">
                <Phone /> +966 51 1267 458
              </a>

              <a
                href="mailto:info@creativeedigital.com"
                data-gtm="email-click"
                className="flex items-center gap-4"
              >
                <Mail /> info@creativeedigital.com
              </a>

              <div className="flex items-center gap-4">
                <MapPin />
                {isArabic
                  ? 'الرياض، المملكة العربية السعودية'
                  : 'Riyadh, Saudi Arabia'}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN – FORM */}
          <div className="p-4 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={isArabic ? 'الاسم' : 'Your Name'}
                className="w-full bg-[#211e24] px-8 py-5 rounded-full"
              />

              <input
                required
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={isArabic ? 'البريد الإلكتروني' : 'Email'}
                className="w-full bg-[#211e24] px-8 py-5 rounded-full"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={isArabic ? 'رقم الهاتف' : 'Phone'}
                className="w-full bg-[#211e24] px-8 py-5 rounded-full"
              />

              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={isArabic ? 'اسم الشركة' : 'Company'}
                className="w-full bg-[#211e24] px-8 py-5 rounded-full"
              />

              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder={isArabic ? 'كيف يمكننا مساعدتك؟' : 'Your Message'}
                className="w-full bg-[#211e24] px-8 py-5 rounded-3xl"
              />

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                data-gtm="contact-form-submit"
                className="w-full md:w-auto bg-white text-black px-10 py-5 rounded-full flex items-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    {isArabic ? 'جاري الإرسال' : 'Sending'}
                  </>
                ) : (
                  <>
                    {isArabic ? 'إرسال' : 'Send'}
                    <Send size={18} />
                  </>
                )}
              </button>

              {/* STATUS MESSAGE */}
              {status.message && (
                <div
                  data-gtm={
                    status.type === 'success'
                      ? 'contact-form-success'
                      : 'contact-form-error'
                  }
                  className={`flex items-center gap-2 text-sm ${
                    status.type === 'success'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {status.type === 'success'
                    ? <CheckCircle size={16} />
                    : <AlertCircle size={16} />}
                  <span>{status.message}</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
