'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
    const [status, setStatus] = useState({ loading: false, message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus({ loading: true, message: 'Sending message...' });

  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus({ loading: false, message: '✅ Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus({
        loading: false,
        message: `❌ Failed to send: ${data.error || 'Please try again later.'}`,
      });
    }
  } catch (error) {
    console.error(error);
    setStatus({ loading: false, message: '❌ Something went wrong.' });
  }
};


  return (
    <section className=" items-stretch min-h-screen max-w-[1400px] mx-auto bg-white relative z-30">

      {/* Header */}
      <div className="text-center w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-12 md:py-16 lg:py-20 bg-black">
        <ScrollBasedAnimation direction="up" offset={50}>
          <span className="text-white text-sm sm:text-base font-bold tracking-widest uppercase mb-2 inline-block">
            {t("contactUs")}
          </span>
        </ScrollBasedAnimation>

        <ScrollBasedAnimation direction="up" offset={50} delay={0.1}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-tight">
            {t("letsStartAConversation")}
          </h1>
        </ScrollBasedAnimation>

        <ScrollBasedAnimation direction="up" offset={50} delay={0.2}>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl lg:max-w-3xl mx-auto mt-4 px-4">
            {t("contactDescription")}
          </p>
        </ScrollBasedAnimation>
      </div>

<div className='flex flex-col md:flex-row items-stretch min-h-screen max-w-[1400px] mx-auto bg-white relative z-30'>
   {/* Left Column – Contact Info */}
      <div className="lg:w-1/2 w-full bg-black text-white flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-16">
        <ScrollBasedAnimation direction="right" offset={50}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-10 leading-tight text-[#6EFF33]">
            {t("getInTouch")}
          </h2>
        </ScrollBasedAnimation>

        <ScrollBasedAnimation direction="left" offset={50}>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 font-light">
            {t("contactInfoDescription")}
          </p>
        </ScrollBasedAnimation>

        <div className="space-y-6">
          <ScrollBasedAnimation direction="up" offset={50}>
            <div className="flex items-center gap-4">
              <div className="p-3 border border-[#6EFF33] rounded-full">
                <Mail className="w-5 h-5 text-[#6EFF33]" />
              </div>
              <a
                href="mailto:hello@creativeedigital.com"
                className="text-gray-200 hover:text-[#6EFF33] transition-colors"
              >
                hello@creativeedigital.com
              </a>
            </div>
          </ScrollBasedAnimation>

          <ScrollBasedAnimation direction="up" offset={50} delay={0.1}>
            <div className="flex items-center gap-4">
              <div className="p-3 border border-[#6EFF33] rounded-full">
                <Phone className="w-5 h-5 text-[#6EFF33]" />
              </div>
              <a
                href="tel:+15551234567"
                className="text-gray-200 hover:text-[#6EFF33] transition-colors"
              >
                +1 (555) 123-4567
              </a>
            </div>
          </ScrollBasedAnimation>

          <ScrollBasedAnimation direction="up" offset={50} delay={0.2}>
            <div className="flex items-center gap-4">
              <div className="p-3 border border-[#6EFF33] rounded-full">
                <MapPin className="w-5 h-5 text-[#6EFF33]" />
              </div>
              <p className="text-gray-200">
                123 Creative Street, Design City, DC 12345
              </p>
            </div>
          </ScrollBasedAnimation>
        </div>
      </div>

      {/* Right Column – Contact Form */}
      <div className="lg:w-1/2 w-full bg-primary flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-16">
        <ScrollBasedAnimation direction="left" offset={50}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-10 leading-tight">
            {t("contactForm")}
          </h2>
        </ScrollBasedAnimation>

        <ScrollBasedAnimation direction="left" offset={50}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder={t("yourName")}
              value={formData.name}
              onChange={handleChange}
              className="w-full border text-secondary border-gray-300 focus:border-[#6EFF33] px-5 py-3 text-base outline-none transition-all duration-200"
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t("yourEmail")}
              value={formData.email}
              onChange={handleChange}
              className="w-full border text-secondary  border-gray-300 focus:border-[#6EFF33] px-5 py-3 text-base outline-none transition-all duration-200"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder={t("subject")}
              value={formData.subject}
              onChange={handleChange}
              className="w-full border text-secondary  border-gray-300 focus:border-[#6EFF33] px-5 py-3 text-base outline-none transition-all duration-200"
            />
            <textarea
              name="message"
              placeholder={t("yourMessage")}
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full border text-secondary  border-gray-300 focus:border-[#6EFF33] px-5 py-3 text-base outline-none resize-none transition-all duration-200"
              required
            ></textarea>
            <button
              type="submit"
              disabled={status.loading}
              className="bg-[#6EFF33] text-black px-8 py-4 font-semibold text-lg hover:bg-[#5AE02B] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#6EFF33]"
            >
              {status.loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t("sendMessage")}
                </>
              )}
            </button>
            {status.message && (
  <p
    className={`text-sm mt-2 ${
      status.message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
    }`}
  >
    {status.message}
  </p>
)}

          </form>
        </ScrollBasedAnimation>
      </div>
</div>
     
    </section>
  );
};

export default Contact;
