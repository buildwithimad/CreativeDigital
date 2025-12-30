'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react'; // Added ShieldCheck icon
import Link from 'next/link';

// --- Custom Styling for Sanity Rich Text ---
const RichTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-5xl font-light text-white mt-16 mb-8 leading-tight tracking-tight border-l-4 border-accent pl-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-normal text-white mt-12 mb-6">
        <span className="text-accent">#</span> {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-gray-300 text-lg md:text-xl leading-8 mb-6 font-light">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="bg-white/5 p-8 rounded-2xl border-l-2 border-accent text-xl italic text-gray-200 my-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-serif">"</div>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-4 mb-10 ml-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-4 mb-10 ml-8 text-gray-300">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-4 text-gray-300 text-lg">
        <span className="mt-2 w-2 h-2 rounded-full bg-accent flex-shrink-0 shadow-[0_0_10px_theme(colors.accent.DEFAULT)]" />
        <span>{children}</span>
      </li>
    ),
  },
  types: {
    image: ({ value }) => {
      // Safe guard for image URL
      const imageUrl = value?.asset?.url; 
      return (
        <div className="relative w-full h-[400px] my-12 rounded-2xl overflow-hidden border border-white/10 group">
           {imageUrl ? (
             <Image 
                src={imageUrl} 
                alt="Content Image" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
             />
           ) : (
             <div className="bg-white/5 w-full h-full flex items-center justify-center text-white/20">
               Image
             </div>
           )}
        </div>
      );
    },
  },
};

export default function ServiceDetailContent({ service }) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  if (!service) return null;

  // Data Extraction
  const title = isArabic ? service.titleAr : service.title;
  const excerpt = isArabic ? service.excerptAr : service.excerpt;
  const content = isArabic ? service.contentAr : service.content;
  const imageUrl = service.mainImage?.asset?.url;

  return (
    <main className="bg-[#06091c] min-h-screen relative" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* ================= 1. CINEMATIC HERO ================= */}
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden border-b border-white/10">
        
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title || 'Service Image'}
              fill
              className="object-cover opacity-50 scale-105"
              priority
              quality={90}
            />
          )}
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-[#06091c]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06091c] via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1400px] px-4 md:px-8 pt-20 mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Back Link */}
            <Link 
              href={isArabic ? "/ar/services" : "/en/services"} 
              className="inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-[0.2em] mb-8 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
              {isArabic ? "العودة للخدمات" : "Back to Services"}
            </Link>

            <h1 className="text-5xl md:text-7xl font-light text-white leading-[1] mb-6 tracking-tight">
              {title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl">
              {excerpt}
            </p>
          </motion.div>
        </div>
      </div>


      {/* ================= 2. MAIN LAYOUT (Fixed Grid) ================= */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 relative z-20">
        
        {/* Using Flexbox on Tablet, Grid on Desktop for stability */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* --- LEFT COLUMN: CONTENT (Span 8) --- */}
          <div className="lg:col-span-8 order-2 lg:order-1">
             <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
               className="prose prose-invert prose-lg md:prose-xl max-w-none"
             >
                {content ? (
                  <PortableText value={content} components={RichTextComponents} />
                ) : (
                  <div className="p-10 border border-dashed border-white/20 rounded-xl text-center text-white/40">
                    {isArabic ? "لا يوجد تفاصيل إضافية." : "No additional content available."}
                  </div>
                )}
             </motion.div>
          </div>


          {/* --- RIGHT COLUMN: STICKY SIDEBAR (Span 4) --- */}
          <div className="lg:col-span-4 order-1 lg:order-2">
             <div className="sticky top-10 space-y-6">
                
                {/* 1. "Why Choose Us" Card */}
                <div className="bg-[#121629] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden relative group">
                   {/* Glow Effect */}
                   <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500" />

                   <div className="flex items-center gap-3 mb-6">
                      <ShieldCheck className="w-6 h-6 text-accent" />
                      <h4 className="text-white text-lg font-bold tracking-wide">
                        {isArabic ? "لماذا نحن؟" : "Why Choose Us?"}
                      </h4>
                   </div>

                   <ul className="space-y-4">
                      {[
                        isArabic ? "خبرة واسعة في المجال" : "Proven Industry Expertise",
                        isArabic ? "حلول مخصصة لعلامتك" : "Custom Tailored Solutions",
                        isArabic ? "نتائج قابلة للقياس" : "Measurable Results & ROI",
                        isArabic ? "دعم فني مستمر" : "Dedicated 24/7 Support"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-400 text-sm md:text-base border-b border-white/5 last:border-0 pb-3 last:pb-0">
                           <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                           {item}
                        </li>
                      ))}
                   </ul>
                </div>

                {/* 2. CTA / Action Card */}
                <div className="bg-gradient-to-br from-accent to-[#8b5cf6] rounded-2xl p-8 text-white shadow-lg shadow-accent/20 relative overflow-hidden">
                   <div className="relative z-10">
                     <h3 className="text-2xl font-bold mb-3">
                       {isArabic ? "ابدأ مشروعك اليوم" : "Ready to scale?"}
                     </h3>
                     <p className="text-white/80 text-sm mb-6 leading-relaxed">
                       {isArabic 
                         ? "تواصل معنا لتحويل أفكارك إلى واقع رقمي مبهر." 
                         : "Let's build something extraordinary together. Book your free consultation now."}
                     </p>
                     
                     <Link 
                       href={isArabic ? '/ar/contact' : '/en/contact'} 
                       className="block w-full py-4 bg-white text-black font-bold text-center rounded-xl hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                     >
                       <span>{isArabic ? "احجز استشارة" : "Start Project"}</span>
                       <ArrowUpRight className={`w-5 h-5 ${isArabic ? 'scale-x-[-1]' : ''}`} />
                     </Link>
                   </div>

                   {/* Decorative background circle */}
                   <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
                </div>

             </div>
          </div>

        </div>
      </div>
    </main>
  );
}