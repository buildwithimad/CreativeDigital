'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Menu, Globe } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  const isSanity = pathname?.startsWith('/studio');

  if(isSanity){
    return null
  };

  const links = [
    { label: isArabic ? 'الرئيسية' : 'Home', href: isArabic ? '/ar' : '/en' },
    { label: isArabic ? 'من نحن' : 'About', href: isArabic ? '/ar/about' : '/en/about' },
    { label: isArabic ? 'الخدمات' : 'Services', href: isArabic ? '/ar/services' : '/en/services' },
    { label: isArabic ? 'أعمالنا' : 'Work', href: isArabic ? '/ar/work' : '/en/work' },
    { label: isArabic ? 'المدونة' : 'Blogs', href: isArabic ? '/ar/blogs' : '/en/blogs' },
    { label: isArabic ? 'تواصل معنا' : 'Contact', href: isArabic ? '/ar/contact' : '/en/contact' },
  ];

  // ---------------- SOCIAL MEDIA LINKS ----------------
  const socialLinks = [
    { 
      name: 'Facebook', 
      mobileLabel: 'FB', 
      href: 'https://www.facebook.com/CreativeDigitalKSA' // Replace with your URL
    },
    { 
      name: 'Instagram', 
      mobileLabel: 'IG', 
      href: 'https://www.instagram.com/creativedigitalsa' // Replace with your URL
    },
    { 
      name: 'Twitter', 
      mobileLabel: 'X', 
      href: 'https://x.com/Creativedi74653' // Replace with your URL
    }
  ];

  // Scroll Logic
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body Lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  // ---------------- LANGUAGE SWITCHER LOGIC ----------------
  const switchLanguage = () => {
    if (!pathname) return '/';
    const segments = pathname.split('/'); 
    segments[1] = isArabic ? 'en' : 'ar';
    return segments.join('/');
  };

  // ---------------- ANIMATION VARIANTS ----------------
  const menuVariants = {
    initial: { scaleY: 0 },
    animate: { 
      scaleY: 1, 
      transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] } 
    },
    exit: { 
      scaleY: 0, 
      transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
  };

  const mobileLinkVars = {
    initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
    open: { y: 0, transition: { ease: [0, 0.55, 0.45, 1], duration: 0.7 } }
  };

  return (
    <>
      {/* ---------------- NAVBAR HEADER ---------------- */}
      <nav
        className={`absolute top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled && !menuOpen 
            ? 'bg-secondary' 
            : 'bg-transparent py-6'
        }`}
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo Image */}
          <Link href={isArabic ? '/ar' : '/en'} className="relative z-50 group block" onClick={() => setMenuOpen(false)}>
            <div className="relative w-32 h-10 md:w-40 md:h-12 transition-transform duration-300 group-hover:scale-105">
               <Image
                 src="/logo.png" 
                 alt={isArabic ? 'الشعار' : 'Logo'} 
                 fill
                 className="object-contain object-left rtl:object-right" 
                 priority 
                 sizes="(max-width: 768px) 100px, 160px"
               />
            </div>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 md:gap-8 relative z-50">
            
            {/* Language Switcher (Desktop) */}
            <Link 
               href={switchLanguage()}
               className="hidden md:flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
               <Globe size={16} />
               <span>{isArabic ? 'English' : 'عربي'}</span>
            </Link>

            {/* Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="group flex items-center gap-3 cursor-pointer focus:outline-none"
            >
              <span className="hidden md:block text-sm font-medium uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
                {menuOpen ? (isArabic ? 'إغلاق' : 'Close') : (isArabic ? 'القائمة' : 'Menu')}
              </span>
              <div className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 transition-all duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-black text-white ${menuOpen ? 'bg-white text-black rotate-90' : ''}`}>
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
          </div>

        </div>
      </nav>

      {/* ---------------- FULL SCREEN MENU OVERLAY ---------------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-secondary z-40 origin-top overflow-hidden"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
             {/* Background Texture */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
             
             <div className="h-full w-full max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col justify-between py-32 md:py-12 relative z-10">
                
                {/* MENU CONTENT GRID */}
                <div className="flex flex-col md:flex-row h-full">
                  
                  {/* LEFT: LINKS */}
                  <div className="flex-1 flex flex-col justify-center">
                    <motion.div
                      variants={containerVars}
                      initial="initial"
                      animate="open"
                      exit="initial"
                      className="flex flex-col gap-2 md:gap-4"
                    >
                      {links.map((link) => (
                        <div key={link.label} className="overflow-hidden">
                          <motion.div variants={mobileLinkVars}>
                            <Link
                              href={link.href}
                              onClick={() => setMenuOpen(false)}
                              className="group flex items-center gap-6 md:gap-8 text-5xl md:text-6xl font-light text-white/50 hover:text-white transition-colors duration-300"
                            >
                              <span className="relative">
                                {link.label}
                                {/* Underline on hover */}
                                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full" />
                              </span>
                              <ArrowUpRight 
                                size={32} 
                                className={`opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 text-accent hidden md:block ${isArabic ? 'rotate-180' : ''}`} 
                              />
                            </Link>
                          </motion.div>
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* RIGHT: INFO (Desktop Only) */}
                  <div className="hidden md:flex flex-col justify-center items-start border-l border-white/10 pl-12 gap-12 w-1/3">
                      
                      {/* Language Switcher inside Menu */}
                      <motion.div 
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.4, duration: 0.5 }}
                      >
                         <Link 
                            href={switchLanguage()}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2 text-lg font-medium text-white hover:text-accent transition-colors mb-8"
                          >
                            <Globe size={20} />
                            <span>{isArabic ? 'Switch to English' : 'تصفح بالعربية'}</span>
                         </Link>
                      </motion.div>

                      <motion.div 
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.5, duration: 0.5 }}
                         className="space-y-2"
                      >
                         <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-4">
                           {isArabic ? 'تواصل معنا' : 'Contact'}
                         </h4>
                         <p className="text-xl text-white">info@creativeedigital.com</p>
                         <p className="text-xl text-white" dir="ltr">+966 51 1267 458</p>
                      </motion.div>

                      <motion.div 
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.6, duration: 0.5 }}
                         className="space-y-2"
                      >
                         <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-4">
                           {isArabic ? 'العنوان' : 'Address'}
                         </h4>
                         <p className="text-lg text-white max-w-xs leading-relaxed">
                           {isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                         </p>
                      </motion.div>

                      {/* SOCIAL MEDIA (DESKTOP) */}
                      <motion.div 
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.7, duration: 0.5 }}
                         className="flex gap-4"
                      >
                         {socialLinks.map((social) => (
                           <a 
                             key={social.name} 
                             href={social.href}
                             target="_blank"
                             rel="noopener noreferrer" 
                             className="text-sm text-white/50 hover:text-accent transition-colors uppercase tracking-widest"
                           >
                             {social.name}
                           </a>
                         ))}
                      </motion.div>

                  </div>

                </div>

                {/* MOBILE FOOTER */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="md:hidden mt-12 pt-8 border-t border-white/10 flex flex-col gap-6"
                >
                   {/* Mobile Language Switcher */}
                   <Link 
                      href={switchLanguage()}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 text-white/80 hover:text-white"
                   >
                      <Globe size={18} />
                      <span>{isArabic ? 'Switch to English' : 'تصفح بالعربية'}</span>
                   </Link>

                   <p className="text-white/60 text-sm">info@creativeedigital.com</p>
                   
                   {/* SOCIAL MEDIA (MOBILE) */}
                   <div className="flex gap-4">
                      {socialLinks.map((social) => (
                           <a 
                             key={social.name} 
                             href={social.href}
                             target="_blank"
                             rel="noopener noreferrer" 
                             className="text-xs text-white/50 hover:text-white uppercase"
                           >
                             {social.mobileLabel}
                           </a>
                      ))}
                   </div>
                </motion.div>

             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;