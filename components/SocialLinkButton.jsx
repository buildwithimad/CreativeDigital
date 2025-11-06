'use client';

import React, { useState } from 'react';
import { Twitter,Menu, Linkedin, Instagram, Facebook, X } from 'lucide-react';
import { FaTiktok, FaWhatsapp } from "react-icons/fa";

const SocialLinkButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    { href: "https://wa.me/966533805593", icon: FaWhatsapp, label: "WhatsApp", color: "#25D366" },
    { href: "https://x.com/CreativeDi91478", icon: Twitter, label: "Twitter", color: "#000000" },
    { href: "https://www.linkedin.com/company/109992491/admin/page-posts/published/?shareMsgArgs=null", icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
    { href: "https://www.tiktok.com/@creativeedigital?is_from_webapp=1&sender_device=pc", icon: FaTiktok, label: "Tiktok", color: "#000000" },
    { href: "https://www.instagram.com/creativedigital0/", icon: Instagram, label: "Instagram", color: "#E4405F" },
    { href: "https://www.facebook.com/profile.php?id=61583336764880", icon: Facebook, label: "Facebook", color: "#1877F2" }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Social Icons Menu */}
      <div className={`mb-3 flex flex-col gap-3 transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {socials.map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-12 h-12 bg-black flex items-center justify-center transition-all duration-300 overflow-hidden"
            style={{
              transitionDelay: isOpen ? `${idx * 50}ms` : '0ms'
            }}
            aria-label={social.label}
          >
            {/* Hover Background Effect */}
            <div 
              className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              style={{ backgroundColor: social.color }}
            />
            
            {/* Icon */}
            <social.icon className="relative z-10 w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
            
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-black border border-zinc-800 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
              {social.label}
            </span>
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 bg-accent hover:bg-[#5de829] text-black flex items-center justify-center  transition-all duration-300 overflow-hidden group"
        aria-label="Toggle social links"
        aria-expanded={isOpen}
      >
        {/* Rotating Icon Container */}
        <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </div>

        {/* Pulse Effect Ring */}
        {!isOpen && (
          <span className="absolute inset-0 border-2 border-[#6EFF33] animate-ping opacity-20" />
        )}
      </button>

      {/* Bottom Accent Line */}
      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#6EFF33] to-transparent" />
    </div>
  );
};

export default SocialLinkButton;