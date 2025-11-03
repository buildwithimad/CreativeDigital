'use client';
import React from 'react';
import Image from 'next/image';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col lg:flex-row items-stretch py-12 lg:py-0 max-w-[1400px] mx-auto bg-black relative z-30">

      {/* Left Column */}
      <div className="lg:w-1/2 w-full px-8 md:px-12 lg:px-16 xl:px-20 flex flex-col justify-center">
        <ScrollBasedAnimation direction="right" offset={50} delay={0}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-10 tracking-tight leading-[1.1]">
            OUR STORY
          </h2>
        </ScrollBasedAnimation>

        <ScrollBasedAnimation direction="left" offset={50} delay={0.1}>
          <p className="text-lg md:text-xl text-primary leading-relaxed mb-6 font-light" dangerouslySetInnerHTML={{ __html: t("aboutParagraph1").replace("CreativeDigital", '<span class="font-medium text-accent">CreativeDigital</span>') }}>
          </p>
        </ScrollBasedAnimation>

        <ScrollBasedAnimation direction="left" offset={50} delay={0.2}>
          <p className="text-lg md:text-xl text-primary leading-relaxed mb-6 font-light" dangerouslySetInnerHTML={{ __html: t("aboutParagraph2").replace("200+", '<span class="font-medium text-accent">200+</span>') }}>
          </p>
        </ScrollBasedAnimation>

        <ScrollBasedAnimation direction="left" offset={50} delay={0.3}>
          <p className="text-lg md:text-xl text-primary leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: t("aboutParagraph3").replace("impactful strategies", '<span class="font-medium text-accent">impactful strategies</span>') }}>
          </p>
        </ScrollBasedAnimation>
      </div>

      {/* Right Column Image */}
      {/* Right Column Image */}
<div className="lg:w-1/2 mt-10 md:mt-0 w-full relative h-[700px] md:h-[700px] lg:h-[700px] overflow-hidden">
  <ScrollBasedAnimation direction="right" offset={50} delay={0.4}>
    <div className="relative w-full h-full min-h-[700px]">
      <Image
        src="https://res.cloudinary.com/ddpamvx3l/image/upload/v1761990112/Gemini_Generated_Image_uezf6uezf6uezf6u-min_qudcgm.png"
        alt="Company mission image"
        fill
        priority
        style={{ objectFit: 'cover' }}
        className="z-10 brightness-125"
      />
      {/* Optional overlay if needed */}
      <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none"></div>
    </div>
  </ScrollBasedAnimation>
</div>


    </section>
  );
};

export default AboutUs;
