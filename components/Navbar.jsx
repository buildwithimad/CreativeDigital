'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import ScrollBasedAnimation from '../components/ScrollBasedAnimation';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/about' },
    { label: t('nav-service'), href: '/services' },
    { label: t('navWork'), href: '/work' },
    { label: t('blogs'), href: '/blogs' },
    { label: t('contact'), href: '/contact' },
  ];

  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  return (
   <nav
  className={`navbar-container fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
    scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
  }`}
>

      <div className="max-w-7xl mx-auto py-4 px-8 md:px-6">
        <div className="flex justify-between items-center h-20 lg:h-20">
        {/* ---------- Logo ---------- */}
<ScrollBasedAnimation direction="up" offset={50} delay={0}>
  <Link href="/" className="flex items-center gap-3 leading-none group">
    {/* Logo Image */}
    <Image
      src="/CreativedigitalLogo.png" // replace with your image path or URL
      alt="Creative Logo"
      width={140}
      height={140}
      className="w-20 h-20 md:w-36 md:h-36 object-contain"
    />
  </Link>
</ScrollBasedAnimation>


          {/* ---------- Desktop Menu ---------- */}
          <ScrollBasedAnimation direction="down" offset={50} delay={0.2}>
            <div className="hidden lg:flex items-center justify-end gap-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-white text-base font-bold tracking-wide px-4 py-2 transition-all hover:text-[#6EFF33] group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#6EFF33] transition-all group-hover:w-full"></span>
                </Link>
              ))}
              <LanguageSwitcher />
            </div>
          
          </ScrollBasedAnimation>

          {/* ---------- Mobile Menu Button ---------- */}
          <button
            className="lg:hidden z-50 text-[#6EFF33] focus:outline-none relative w-10 h-10 flex items-center justify-center transition-all hover:bg-[#6EFF33] hover:text-black"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="w-10 h-10" /> : <Menu className="w-10 h-10" />}
          </button>
        </div>
      </div>

      {/* ---------- Mobile Menu ---------- */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-sm transition-all duration-500 flex flex-col items-start px-6 py-12 gap-8 ${
          menuOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-full'
        }`}
      >
        {links.map((link, index) => (
          <ScrollBasedAnimation
            key={link.label}
            direction="right"
            offset={20}
            delay={index * 0.1}
          >
            <Link
              href={link.href}
              className="block text-3xl sm:text-4xl font-bold text-white hover:text-[#6EFF33] transition-all border-l-4 border-transparent hover:border-[#6EFF33] pl-4"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          </ScrollBasedAnimation>
        ))}

        {/* Language Switcher in Mobile Menu */}
        <ScrollBasedAnimation
          direction="right"
          offset={20}
          delay={links.length * 0.1}
        >
          <LanguageSwitcher isMobile={true} />
        </ScrollBasedAnimation>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6EFF33] to-transparent"></div>
      </div>
    </nav>
  );
};

export default Navbar;
