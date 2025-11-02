'use client';

import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-primary bg-black text-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* Brand & Copyright */}
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              CreativeDigital
            </h2>
            <p className="text-sm text-primary/70 mt-4 tracking-wide">
              © {new Date().getFullYear()} ALL RIGHTS RESERVED
            </p>
            <p className="text-xs text-primary/50 mt-2">
              Crafting digital experiences with innovation and precision.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-accent mb-2">Quick Links</h3>
            {['HOME', 'ABOUT', 'SERVICES', 'CONTACT'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium tracking-wide hover:text-accent transition-all duration-300 hover:translate-x-1"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Social Icons & Contact */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-semibold text-accent mb-4">Connect With Us</h3>
              <div className="flex gap-6">
                {[
                  { href: "https://twitter.com", path: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4 0a9.06 9.06 0 01-2.88 1.1 4.52 4.52 0 00-7.72 4.13A12.85 12.85 0 013 1.67a4.51 4.51 0 001.4 6.03 4.48 4.48 0 01-2-.56v.06a4.53 4.53 0 003.63 4.44 4.52 4.52 0 01-2 .08 4.52 4.52 0 004.22 3.14A9.05 9.05 0 012 19.54a12.78 12.78 0 006.92 2.03c8.3 0 12.84-6.88 12.84-12.84l-.01-.58A9.22 9.22 0 0023 3z", label: "Twitter" },
                  { href: "https://linkedin.com", path: "M4.98 3.5C3.33 3.5 2 4.83 2 6.48c0 1.65 1.33 2.98 2.98 2.98S7.96 8.13 7.96 6.48c0-1.65-1.33-2.98-2.98-2.98zM2.4 21.5h5.16V9H2.4v12.5zM9.34 21.5h5.14v-6.61c0-3.27-4-3.02-4 0v6.61zm-4.97-12h5.14V7.5H4.37V9.5z", label: "LinkedIn" },
                  { href: "https://facebook.com", path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54v-2.2c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34V21.88C18.34 21.13 22 16.99 22 12z", label: "Facebook" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full hover:bg-accent hover:scale-110 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <svg className="w-5 h-5 fill-current group-hover:text-secondary transition-colors" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-primary/70">
                <span className="font-medium">Email:</span> hello@creativedigital.com
              </p>
              <p className="text-sm text-primary/70 mt-1">
                <span className="font-medium">Phone:</span> +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>

        {/* Fine print */}
        <div className="mt-12 pt-8 border-t border-accent/20 text-center">
          <p className="text-xs text-primary/60 tracking-widest uppercase">
            Crafted with Precision • Powered by Innovation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;