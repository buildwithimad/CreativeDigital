"use client";

import React, { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const SocialLinkButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Event Track Function using GTM dataLayer
  const trackEvent = (eventName) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        page_url: window.location.href,
      });
      console.log("🔔 Event Tracked:", eventName);
    }
  };

  const socials = [
    {
      href: "https://wa.me/966511267458",
      icon: FaWhatsapp,
      label: "WhatsApp",
      color: "#25D366",
      event: "whatsapp_click",
    },
    {
      href: "tel:+966511267458",
      icon: Phone,
      label: "Call",
      color: "#d36d25",
      event: "call_click",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`mb-3 flex flex-col gap-3 transition-all duration-500 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {socials.map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent(social.event)}
            className="group relative w-12 h-12 bg-black flex items-center justify-center transition-all duration-300 overflow-hidden rounded-full"
            style={{
              transitionDelay: isOpen ? `${idx * 50}ms` : "0ms",
            }}
            aria-label={social.label}
          >
            <div
              className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              style={{ backgroundColor: social.color }}
            />

            <social.icon className="relative z-10 w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />

            <span className="absolute right-full mr-3 px-3 py-1.5 bg-black border border-zinc-800 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
              {social.label}
            </span>
          </a>
        ))}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 bg-accent hover:bg-[#5de829] text-black flex items-center justify-center transition-all duration-300 overflow-hidden group rounded-full"
        aria-label="Toggle social links"
        aria-expanded={isOpen}
      >
        <div
          className={`transition-transform duration-500 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </div>

        {!isOpen && (
          <span className="absolute inset-0 border-2 border-[#6EFF33] animate-ping opacity-20" />
        )}
      </button>

      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#6EFF33] to-transparent" />
    </div>
  );
};

export default SocialLinkButton;
