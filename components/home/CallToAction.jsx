"use client";

import React from "react";
import ScrollBasedAnimation from "../ScrollBasedAnimation";
import { useTranslation } from 'react-i18next';

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="cta"
      className="w-full bg-black/70 relative overflow-hidden bg-gradient-to-r from-accent to-accent/80 text-primary px-6 py-32 flex flex-col items-center text-center"
    >
  
      <div className="relative z-10 max-w-4xl mx-auto">
        <ScrollBasedAnimation direction="up" offset={50} delay={0}>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            {t("readyToElevate")} <span className="text-accent">{t("business")}</span>
          </h2>
        </ScrollBasedAnimation>

        <ScrollBasedAnimation direction="up" offset={50} delay={0.2}>
          <p className="text-lg md:text-xl font-light mb-12 text-primary/90">
            {t("ctaDescription")}
          </p>
        </ScrollBasedAnimation>

        <ScrollBasedAnimation direction="up" offset={50} delay={0.4}>
          <button className="group relative bg-accent text-primary font-bold px-16 py-5 uppercase tracking-widest text-sm transition-all duration-500 hover:bg-primary hover:text-primary overflow-hidden">
            <span className="relative z-10">{t("getStarted")}</span>
            <div className="absolute inset-0 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
        </ScrollBasedAnimation>
      </div>
    </section>
  );
};

export default CTASection;
