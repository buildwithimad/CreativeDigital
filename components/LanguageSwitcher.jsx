'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import '@/lib/i18n';

export default function LanguageSwitcher({ isMobile = false }) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = i18n.language === 'ar';

  // Load saved language from localStorage (if available)
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [i18n]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);

    // Remember language preference
    localStorage.setItem('language', lang);
    setIsOpen(false);
  };

  // Update document attributes when language changes
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  if (isMobile) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-3 w-full text-left text-3xl sm:text-4xl font-bold text-white hover:text-[#6EFF33] transition-all border-l-4 border-transparent hover:border-[#6EFF33] pl-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
        >
          <Globe className="w-8 h-8" />
          <span>{currentLang.flag} {currentLang.name}</span>
        </button>

        {isOpen && (
          <div className={`mt-4 space-y-2 ${isRTL ? 'mr-8' : 'ml-8'}`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center gap-3 text-2xl font-semibold transition-all ${
                  i18n.language === lang.code
                    ? 'text-[#6EFF33] border-l-4 border-[#6EFF33]'
                    : 'text-white hover:text-[#6EFF33] border-l-4 border-transparent hover:border-[#6EFF33]'
                } ${isRTL ? 'flex-row-reverse text-right pr-4 pl-0 border-r-4 border-l-0' : 'pl-4'}`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
      >
        <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-sm font-medium">{currentLang.flag} {currentLang.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute top-full mt-2 w-40 bg-white/95 backdrop-blur-sm border border-white/20 shadow-xl z-20 overflow-hidden ${isRTL ? 'left-0' : 'right-0'}`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-[#6EFF33]/10 transition-colors duration-200 ${
                  i18n.language === lang.code ? 'bg-[#6EFF33]/20 text-[#6EFF33]' : 'text-gray-700'
                } ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
