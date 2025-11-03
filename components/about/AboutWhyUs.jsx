'use client';
import React from 'react';
import { FaFlag, FaChartBar, FaBolt, FaTrophy } from 'react-icons/fa';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { useTranslation } from 'react-i18next';

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: <FaFlag className="text-5xl mb-4 text-accent" />,
      title: t('localExpertise'),
      desc: t('localExpertiseDesc'),
    },
    {
      icon: <FaChartBar className="text-5xl mb-4 text-accent" />,
      title: t('dataDriven'),
      desc: t('dataDrivenDesc'),
    },
    {
      icon: <FaBolt className="text-5xl mb-4 text-accent" />,
      title: t('agileDelivery'),
      desc: t('agileDeliveryDesc'),
    },
    {
      icon: <FaTrophy className="text-5xl mb-4 text-accent" />,
      title: t('provenResults'),
      desc: t('provenResultsDesc'),
    },
  ];

  return (
    <section className="relative w-full z-30 bg-black/70 py-20 max-w-[1400px] mx-auto px-8 md:px-12">
      {/* Heading */}
      <ScrollBasedAnimation direction="up" offset={50}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t("whyChooseCreativeDigital")}
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            {t("whyChooseDesc")}
          </p>
        </div>
      </ScrollBasedAnimation>

      {/* Reasons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {reasons.map((item, idx) => (
          <ScrollBasedAnimation key={idx} direction="up" offset={50} delay={0.1 * idx}>
            <div className="flex flex-col items-center text-center p-6">
              {item.icon}
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
            </div>
          </ScrollBasedAnimation>
        ))}
      </div>

      {/* CTA Button */}
      <ScrollBasedAnimation direction="up" offset={50} delay={0.5}>
        <div className="text-center">
          <button className="bg-accent hover:bg-green-500 text-black font-semibold py-4 px-10 transition-all duration-300 transform hover:scale-105">
            {t("contactUs")}
          </button>
        </div>
      </ScrollBasedAnimation>
    </section>
  );
};

export default WhyChooseUs;
