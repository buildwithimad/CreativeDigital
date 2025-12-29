'use client';

import React from 'react';
import Link from 'next/link';
import { Twitter, Linkedin, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ScrollBasedAnimation from '../components/ScrollBasedAnimation'; // Adjust path if needed

const FOOTER_TEXT = {
  en: {
    description: 'Crafting digital experiences with innovation and precision. We transform ideas into reality through cutting-edge design and technology.',
    quickLinks: 'Quick Links',
    getInTouch: 'Get In Touch',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    rights: 'All rights reserved.',
    developedBy: 'Developed by',
  },
  ar: {
    description: 'نصنع تجارب رقمية مبتكرة بدقة عالية. نحول الأفكار إلى واقع من خلال التصميم والتقنية المتقدمة.',
    quickLinks: 'روابط سريعة',
    getInTouch: 'تواصل معنا',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    address: 'العنوان',
    rights: 'جميع الحقوق محفوظة.',
    developedBy: 'تم التطوير بواسطة',
  },
};

const Footer = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const t = isArabic ? FOOTER_TEXT.ar : FOOTER_TEXT.en;

  // Design Constants
  const borderGradientHorizontal = "bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"; 

  const socialLinks = [
    { href: 'https://x.com/Creativedi74653', icon: Twitter },
    { href: 'https://www.linkedin.com/', icon: Linkedin },
    { href: 'https://www.instagram.com/creativedigitalsa', icon: Instagram },
    { href: 'https://www.facebook.com/CreativeDigitalKSA', icon: Facebook },
  ];

  const navLinks = [
    { name: isArabic ? 'الرئيسية' : 'HOME', href: '/' },
    { name: isArabic ? 'من نحن' : 'ABOUT', href: '/about' },
    { name: isArabic ? 'الخدمات' : 'SERVICES', href: '/services' },
    { name: isArabic ? 'أعمالنا' : 'OUR WORK', href: '/work' },
    { name: isArabic ? 'المدونة' : 'BLOGS', href: '/blogs' },
    { name: isArabic ? 'تواصل معنا' : 'CONTACT', href: '/contact' },
  ];

  return (
    <footer className="w-full text-white relative overflow-hidden pt-20" dir={isArabic ? 'rtl' : 'ltr'}
    style={{
          background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #000000 60%)' // Deep purple center fading to black
        }}
    >
      
      {/* --- Top Gradient Border --- */}
      <div className={`absolute top-0 left-0 w-full h-[1px] ${borderGradientHorizontal}`} />

      {/* --- Ambient Background Glow (Subtle) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">

          {/* --- Brand Column (4 Cols) --- */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <ScrollBasedAnimation direction="up">
              <Link href="/" className="mb-8 inline-block relative group">
                <div className="relative w-40 h-40 md:w-48 md:h-48 transition-transform duration-500 group-hover:scale-105">
                    <Image
                    src="/logo.png"
                    alt="Creative Digital Logo"
                    fill
                    className="object-contain object-left"
                    />
                </div>
              </Link>
            </ScrollBasedAnimation>

            <ScrollBasedAnimation direction="up" delay={0.1}>
              <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md font-light">
                {t.description}
              </p>
            </ScrollBasedAnimation>

            <ScrollBasedAnimation direction="up" delay={0.2}>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-accent hover:bg-accent transition-all duration-300 group"
                  >
                    <social.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </ScrollBasedAnimation>
          </div>

          {/* --- Quick Links (3 Cols) --- */}
          <div className="lg:col-span-3">
            <ScrollBasedAnimation direction="up" delay={0.1}>
              <h3 className="text-sm font-bold text-accent mb-8 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {t.quickLinks}
              </h3>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-white/60 hover:text-white transition-all duration-300 text-sm tracking-wide flex items-center gap-2 group w-fit"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-accent">
                        <ArrowUpRight className={`w-3 h-3 ${isArabic ? 'rotate-180' : ''}`} />
                    </span>
                    {link.name}
                  </Link>
                ))}
              </nav>
            </ScrollBasedAnimation>
          </div>

          {/* --- Contact Info (4 Cols) --- */}
          <div className="lg:col-span-4">
            <ScrollBasedAnimation direction="up" delay={0.2}>
              <h3 className="text-sm font-bold text-accent mb-8 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {t.getInTouch}
              </h3>

              <div className="space-y-8">
                <div className="group">
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-2">{t.email}</span>
                  <a href="mailto:info@creativeedigital.com" className="text-lg text-white font-light hover:text-accent transition-colors">
                    info@creativeedigital.com
                  </a>
                </div>

                <div className="group">
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-2">{t.phone}</span>
                  <a href="tel:+966511267458" className="text-lg text-white font-light hover:text-accent transition-colors">
                    +966 511 267 458
                  </a>
                </div>

                <div>
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-2">{t.address}</span>
                  <p className="text-lg text-white/80 font-light leading-relaxed">
                    Rifah Ibn Rafi Street<br />
                    Al Olaya, Riyadh<br />
                    Saudi Arabia
                  </p>
                </div>
              </div>
            </ScrollBasedAnimation>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="relative py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 font-mono uppercase tracking-wider">
            {/* Divider Line */}
            <div className={`absolute top-0 left-0 w-full h-[1px] ${borderGradientHorizontal}`} />
            
            <p>
                © {new Date().getFullYear()} CreativeDigital. {t.rights}
            </p>
            <p className="flex items-center gap-2">
                {t.developedBy}{' '}
                <a
                href="https://www.imadkhan.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors font-bold"
                >
                Imad Hussain Khan
                </a>
            </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;