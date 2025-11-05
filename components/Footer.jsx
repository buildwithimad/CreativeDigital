'use client';

import React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-black text-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 xl:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-4">
              CreativeDigital
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-md">
              {t("footerDescription")}
            </p>
            <div className="flex gap-4">
              {[
                { href: "https://github.com", icon: Github, label: "GitHub" },
                { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
                { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
                { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
                { href: "https://facebook.com", icon: Facebook, label: "Facebook" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-accent transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-accent mb-6">{t("quickLinks")}</h3>
            <nav className="flex flex-col gap-3">
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
                  className="text-gray-300 hover:text-accent transition-colors duration-300 text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-accent mb-6">{t("getInTouch")}</h3>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">
                <span className="block font-medium text-white">{t("email")}</span>
                hello@creativeedigital.com
              </p>
              <p className="text-gray-300 text-sm">
                <span className="block font-medium text-white">{t("phone")}</span>
                +1 (555) 123-4567
              </p>
              <p className="text-gray-300 text-sm">
                <span className="block font-medium text-white">{t("address")}</span>
                123 Creative Street<br />
                Design City, DC 12345
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CreativeDigital. {t("allRightsReserved")}
            </p>
            <p className="text-gray-400 text-sm">
              {t("developedBy")}{' '}
              <a
                href="https://www.imadkhan.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-green-400 transition-colors duration-300 font-medium"
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