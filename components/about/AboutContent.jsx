'use client';

import React from 'react';
import Image from 'next/image';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { usePathname } from 'next/navigation';

// Static Gradients (Zero Performance Cost)
const borderGradientVertical = "bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-purple-500/20"; 

const AboutUs = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <section 
      className="relative bg-secondary w-full text-white overflow-hidden flex items-center" 
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      
      {/* --- BACKGROUND IMAGE LAYER --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dlsudrq9q/image/upload/v1766929208/pic-8_r2xqiz.png"
          alt="Background"
          fill
          className="object-cover opacity-20" // Lower opacity for background
          quality={90}
          priority
        />
        {/* Heavy Overlay to make text pop against the image */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06091c]/95 via-[#1e1b4b]/90 to-[#06091c]/95" />
        
        {/* Optional: Dot Texture on top of image */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      <div className="max-w-[1920px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 relative z-10">

        {/* --- LEFT COLUMN: VISION --- */}
        <div className="relative p-8 md:p-16 lg:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5">
          
          {/* Vertical Laser Spine (Center) */}
          <div className={`hidden lg:block absolute top-0 right-0 h-full w-[1px] ${borderGradientVertical} z-20`} />

          <div className="max-w-2xl mx-auto lg:mx-0">
            <ScrollBasedAnimation direction="up" delay={0.1}>
              <h2 className="text-4xl md:text-6xl font-light leading-[0.9] tracking-tighter mb-8 text-white">
                {isArabic ? (
                  <>رؤيتنا <br/><span className="text-accent">للمستقبل</span></>
                ) : (
                  <>Our <br/><span className="text-accent">Vision</span></>
                )}
              </h2>
            </ScrollBasedAnimation>

            <ScrollBasedAnimation direction="up" delay={0.2}>
              <p
                className="text-lg md:text-xl text-white/70 font-light leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: isArabic
                    ? 'أن نكون الشريك الرقمي الأول في المملكة، نقود التحول الرقمي من خلال ابتكار حلول تدمج بين <span class="text-white font-normal">الإبداع البشري</span> و <span class="text-white font-normal">الذكاء الاصطناعي</span> لصنع مستقبل لا حدود له.'
                    : 'To be the premier digital partner in the Kingdom, driving digital transformation by creating solutions that merge <span class="text-white font-normal">human creativity</span> with <span class="text-white font-normal">artificial intelligence</span> to craft a limitless future.',
                }}
              />
            </ScrollBasedAnimation>
          </div>
        </div>

        {/* --- RIGHT COLUMN: MISSION --- */}
        <div className="relative p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          
          <div className="max-w-2xl mx-auto lg:mx-0">
            <ScrollBasedAnimation direction="up" delay={0.3}>
              <h2 className="text-4xl md:text-6xl font-light leading-[0.9] tracking-tighter mb-8 text-white">
                {isArabic ? (
                  <>مهمتنا <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">الاستراتيجية</span></>
                ) : (
                  <>Our <br/><span className="text-accent">Mission</span></>
                )}
              </h2>
            </ScrollBasedAnimation>

            <ScrollBasedAnimation direction="up" delay={0.4}>
              <p
                className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-6"
                dangerouslySetInnerHTML={{
                  __html: isArabic
                    ? 'تمكين العلامات التجارية من النمو المستدام من خلال استراتيجيات رقمية دقيقة وتصميمات تركز على المستخدم، مع الالتزام بأعلى معايير الجودة والابتكار في كل مشروع.'
                    : 'To empower brands with sustainable growth through precise digital strategies and user-centric design, committing to the highest standards of quality and innovation in every project.',
                }}
              />
            </ScrollBasedAnimation>
            
            {/* Stats / Extra Point for Mission */}
             <ScrollBasedAnimation direction="up" delay={0.5}>
                <div className="pt-4 border-t border-white/10 mt-6">
                  <p className="text-sm tracking-widest uppercase text-accent mb-2">
                    {isArabic ? "هدفنا الأساسي" : "Core Goal"}
                  </p>
                  <p className="text-xl text-white font-light">
                    {isArabic ? "تحويل الأفكار إلى واقع رقمي ملموس." : "Turning ideas into tangible digital reality."}
                  </p>
                </div>
              </ScrollBasedAnimation>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;