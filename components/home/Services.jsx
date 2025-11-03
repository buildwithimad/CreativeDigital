'use client';
import React from 'react';
import { Cpu, Activity, Camera, Users, Calendar, Edit, Monitor } from 'lucide-react';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { useTranslation } from 'react-i18next';

const ServiceCard = ({ service, index }) => {
  return (
    <ScrollBasedAnimation direction="up" offset={50} delay={0.1 * index}>
      <div className="flex flex-col items-center text-center px-4 py-8 hover:scale-105 transition-transform duration-500 cursor-pointer">
        <div className="mb-6">
          {service.icon}
        </div>
        <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2">{service.title}</h3>
        <p className="text-gray-400 text-base sm:text-lg max-w-xs">{service.description}</p>
      </div>
    </ScrollBasedAnimation>
  );
};

const Services = () => {
  const { t } = useTranslation();

  const servicesData = [
     {
      title: t('websiteDesignDev'),
      description: t('websiteDesignDevDesc'),
      icon: <Monitor className="w-20 h-20 sm:w-24 sm:h-24 text-[#6EFF33]" />,
    },
    {
      title: t('socialMediaManagement'),
      description: t('socialMediaManagementDesc'),
      icon: <Users className="w-20 h-20 sm:w-24 sm:h-24 text-[#6EFF33]" />,
    },
    {
      title: t('digitalMarketingSEO'),
      description: t('digitalMarketingSEODesc'),
      icon: <Cpu className="w-20 h-20 sm:w-24 sm:h-24 text-[#6EFF33]" />,
    },
    {
      title: t('visualProduction'),
      description: t('visualProductionDesc'),
      icon: <Camera className="w-20 h-20 sm:w-24 sm:h-24 text-[#6EFF33]" />,
    },
    {
      title: t('influencerMarketing'),
      description: t('influencerMarketingDesc'),
      icon: <Activity className="w-20 h-20 sm:w-24 sm:h-24 text-[#6EFF33]" />,
    },
    {
      title: t('creativeContent'),
      description: t('creativeContentDesc'),
      icon: <Edit className="w-20 h-20 sm:w-24 sm:h-24 text-[#6EFF33]" />,
    },

  ];
  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-black relative overflow-hidden">
      {/* Header */}
      <div className="text-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mb-12">
        <ScrollBasedAnimation direction="up" offset={50} delay={0}>
          <span className="text-[#6EFF33] text-sm sm:text-base font-bold tracking-widest uppercase mb-2 inline-block">
            {t("services")}
          </span>
        </ScrollBasedAnimation>

        <ScrollBasedAnimation direction="up" offset={50} delay={0.1}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {t("whatWeDoBest")} <span className="text-[#6EFF33]">{t("best")}</span>
          </h1>
        </ScrollBasedAnimation>

        <ScrollBasedAnimation direction="up" offset={50} delay={0.2}>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-4">
            {t("servicesDescription")}
          </p>
        </ScrollBasedAnimation>
      </div>

      {/* Services Grid */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <ScrollBasedAnimation direction="up" offset={50}>
          <button className="bg-[#6EFF33] text-black font-semibold px-8 py-3 text-lg hover:bg-transparent hover:text-[#6EFF33] border-2 border-[#6EFF33] transition-all duration-300">
            {t("viewAllServices")}
          </button>
        </ScrollBasedAnimation>
      </div>
    </section>
  );
};

export default Services;
