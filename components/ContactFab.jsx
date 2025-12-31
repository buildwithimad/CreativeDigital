'use client';

import { useState } from "react";
import { Phone, Plus, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactFab() {
  const [open, setOpen] = useState(false);

  const transition = { type: "spring", stiffness: 260, damping: 20 };

 
  return (
    <div
      dir="ltr"
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-4"
    >
      <AnimatePresence>
        {open && (
          <>
            {/* WhatsApp Button */}
            <motion.button
  type="button"
  onClick={() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_click",
      contact_location: "fab",
    });

    window.open("https://wa.me/966511267458", "_blank");
  }}
  className="
    group relative flex items-center justify-center 
    w-12 h-12 rounded-full 
    bg-green-600 text-white 
    border border-white/10 
    shadow-2xl 
    hover:scale-105 
    transition-all duration-300
  "
>
  <FaWhatsapp size={30} />
</motion.button>



            {/* Call Button */}
         <motion.button
  type="button"
  onClick={() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "call_click",
      contact_location: "fab",
    });

    window.location.href = "tel:+966511267458";
  }}
  className="
    group relative flex items-center justify-center 
    w-12 h-12 rounded-full 
    bg-[#06091c] text-white 
    border border-white/10 
    shadow-2xl 
    hover:border-blue-500 hover:text-blue-500 
    transition-all duration-300
  "
>
  <Phone size={25} />
</motion.button>


          </>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open contact options"
        className={`
          relative flex items-center justify-center 
          w-14 h-14 rounded-full 
          shadow-2xl border border-white/20 
          transition-all duration-300 group z-50
          ${open ? 'bg-white text-black rotate-90' : 'bg-[#06091c] hover:border-accent text-white'}
        `}
      >
        {!open && (
          <span className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20 pointer-events-none" />
        )}

        {open ? (
          <X size={24} strokeWidth={2} />
        ) : (
          <Plus
            size={24}
            strokeWidth={2}
            className="group-hover:rotate-90 transition-transform duration-500"
          />
        )}
      </motion.button>
    </div>
  );
}
