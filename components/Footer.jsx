'use client';

import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';
import { FaTiktok } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import Image from "next/image";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-black text-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16 lg:py-20">
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 auto-rows-auto">

          {/* Brand & Description */}
          <div className="lg:col-span-2 flex flex-col items-start justify-start">
            {/* Logo */}
            <Link href="/" className="mb-4 lg:mb-6 inline-block">
            <Image
              src="/CreativedigitalLogo.png"
              alt="Creative Digital Logo"
              width={120}
              height={1}
              className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-64 lg:h-64 object-cover"
            />
            </Link>

            {/* Description */}
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 lg:mb-8 max-w-md">
              {t("footerDescription")}
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { href: "https://x.com/Creativedi74653", icon: Twitter, label: "Twitter" },
                { href: "https://www.linkedin.com/company/109992491/admin/page-posts/published/?shareMsgArgs=null", icon: Linkedin, label: "LinkedIn" },
                { href: "https://www.tiktok.com/@creativeedigital?is_from_webapp=1&sender_device=pc", icon: FaTiktok, label: "Tiktok" },
                { href: "https://www.instagram.com/creativedigitalsa", icon: Instagram, label: "Instagram" },
                { href: "https://www.facebook.com/CreativeDigitalKSA", icon: Facebook, label: "Facebook" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#6EFF33] hover:bg-[#6EFF33]/10 transition-all duration-300 group rounded"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-[#6EFF33] transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#6EFF33] mb-4 lg:mb-6 uppercase tracking-wider">
              {t("quickLinks")}
            </h3>
            <nav className="flex flex-col gap-2.5 lg:gap-3">
              {[
                { name: t("home"), href: '/' },
                { name: t('about'), href: '/about' },
                { name: t('nav-service'), href: '/services' },
                { name: t('nav-ourWork'), href: '/work' },
                { name: t('blogs'), href: '/blogs' },
                { name: t('contact'), href: '/contact' }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-[#6EFF33] transition-all duration-300 text-sm sm:text-base hover:translate-x-1 inline-block"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#6EFF33] mb-4 lg:mb-6 uppercase tracking-wider">
              {t("getInTouch")}
            </h3>
            <div className="space-y-4 lg:space-y-5">
              
              {/* Email */}
              <div>
                <span className="block font-semibold text-white text-xs sm:text-sm mb-1">
                  {t("email")}
                </span>
                <a
                  href="mailto:info@creativeedigital.com"
                  className="text-gray-400 text-sm hover:text-[#6EFF33] transition-colors duration-300 break-all"
                >
                  info@creativeedigital.com
                </a>
              </div>

              {/* Phone */}
              <div>
                <span className="block font-semibold text-white text-xs sm:text-sm mb-1">
                  {t("phone")}
                </span>
                <a
                  href="tel:+966508538561"
                  className="text-gray-400 text-sm hover:text-[#6EFF33] transition-colors duration-300"
                >
                  +966508538561
                </a>
              </div>

              {/* Address */}
              <div>
                <span className="block font-semibold text-white text-xs sm:text-sm mb-1">
                  {t("address")}
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Rifah+Ibn+Rafi+Street+Al+Olaya+Riyadh+Saudi+Arabia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm hover:text-[#6EFF33] transition-colors duration-300 inline-block"
                >
                  Rifah Ibn Rafi Street<br />
                  Al Olaya, Riyadh<br />
                  Saudi Arabia
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-10 md:mt-12 lg:mt-16 pt-6 md:pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} CreativeDigital. {t("allRightsReserved")}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm text-center md:text-right">
              {t("developedBy")}{' '}
              <a
                href="https://www.imadkhan.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6EFF33] hover:text-[#5EEF23] transition-colors duration-300 font-semibold"
              >
                Imad Hussain Khan
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
