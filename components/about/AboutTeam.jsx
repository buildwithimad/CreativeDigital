'use client';

import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { client } from '../../sanity/lib/client';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

/* ================= Gradient Config ================= */
const borderGradientHorizontal = "bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"; 
const borderGradientVertical = "bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-purple-500/20"; 

/* ================= Single Team Member Card (Sticky) ================= */
const TeamMemberCard = ({ member, index, isArabic }) => {
  return (
    <div 
      // Changed h-screen to md:h-[85vh] to prevent it from being too tall on laptops
      className="sticky top-0 w-full h-screen md:h-[85vh] flex items-center justify-center overflow-hidden border-t border-white/10 will-change-transform transform-gpu"
      style={{ 
        zIndex: index + 1, 
      }}
    >
      {/* Depth Shadow Gradient */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none" />

      <div className="relative w-full h-full group">
        
        {/* --- 1. BACKGROUND IMAGE LAYER --- */}
        <div className="absolute inset-0 z-0 bg-secondary">
           {/* Gradient to ensure bottom text readability */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#06091c] via-black/40 to-transparent z-10 pointer-events-none" />
           {/* Top gradient to help with white text on bright images */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-10 pointer-events-none" />

           <Image
             src={member.image?.asset?.url || '/placeholder.jpg'}
             alt={isArabic ? member.nameAr : member.name}
             fill
             sizes="(max-width: 768px) 100vw, 100vw"
             // object-top ensures faces aren't cut off on wide screens
             // opacity-80 balances brightness without washing it out
             className="object-cover object-[center_20%] transition-all duration-[1.2s] ease-out group-hover:scale-105 will-change-transform opacity-80 group-hover:opacity-60"
             priority={index === 0} 
             quality={90} 
           />
        </div>

        {/* --- 2. GRID LINES --- */}
        <div className={`absolute top-0 left-0 w-full h-[1px] ${borderGradientHorizontal} z-20 opacity-30`} />
        <div className={`absolute top-0 left-0 h-full w-[1px] ${borderGradientVertical} z-20 opacity-30`} />
        <div className={`absolute bottom-0 left-0 w-full h-[1px] ${borderGradientHorizontal} z-20 opacity-30`} />
        <div className={`absolute top-0 right-0 h-full w-[1px] ${borderGradientVertical} z-20 opacity-30`} />

        
        {/* --- 3. CENTERED CONTENT LAYER --- */}
        <div className="relative z-30 h-full w-full flex flex-col items-center justify-end md:justify-center p-6 md:p-8 text-center pb-20 md:pb-8">
           
           {/* Role Label */}
           <div className="flex items-center gap-3 md:gap-4 mb-4">
             <div className="h-[1px] w-8 md:w-12 bg-accent shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
             <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-accent uppercase drop-shadow-md">
               {isArabic ? member.roleAr : member.role}
             </span>
             <div className="h-[1px] w-8 md:w-12 bg-accent shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
           </div>

           {/* Name (Scaled down slightly for laptops) */}
           <ScrollBasedAnimation direction="up">
             <h3 className="text-4xl md:text-6xl font-light text-white leading-[1] mb-6 md:mb-8 tracking-tighter whitespace-pre-line drop-shadow-2xl">
               {isArabic ? member.nameAr : member.name}
             </h3>
           </ScrollBasedAnimation>

           {/* Bio (Description) */}
           <ScrollBasedAnimation direction="up" delay={0.1}>
            <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10 line-clamp-3 md:line-clamp-none drop-shadow-lg">
              {isArabic ? member.bioAr : member.bio}
            </p>
           </ScrollBasedAnimation>

           {/* Social Actions */}
           <div className="flex gap-4">
             {member.linkedin && (
               <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="group/btn">
                  <div className="p-4 rounded-full border border-white/20 bg-black/40 backdrop-blur-md group-hover/btn:bg-blue-600 group-hover/btn:border-blue-600 transition-all duration-300 hover:scale-110">
                     <FaLinkedin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
               </a>
             )}
             {member.twitter && (
               <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="group/btn">
                  <div className="p-4 rounded-full border border-white/20 bg-black/40 backdrop-blur-md group-hover/btn:bg-sky-500 group-hover/btn:border-sky-500 transition-all duration-300 hover:scale-110">
                     <FaTwitter className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
               </a>
             )}
           </div>

        </div>

        {/* Texture Overlay */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
          style={{
             backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
             backgroundSize: '30px 30px'
          }} 
        />

      </div>
    </div>
  );
};

/* ================== Main Team Section ================== */
const AboutTeam = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const teamQuery = groq`
        *[_type == "team"] | order(order asc) {
          _id,
          name, nameAr,
          role, roleAr,
          bio, bioAr,
          image{ asset->{ url } },
          linkedin,
          twitter
        }
      `;
      try {
        const data = await client.fetch(teamQuery);
        setTeamData(data);
      } catch (error) {
        console.error('❌ Error fetching team:', error);
      }
    };
    fetchTeam();
  }, []);

  return (
    <section className="bg-secondary relative" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Intro Header */}
      <div className="py-20 md:py-32 px-4 md:px-8 max-w-[1400px] mx-auto text-center">
        <ScrollBasedAnimation direction="up">
          <div className="flex items-center justify-center gap-3 mb-4">
             <span className="w-8 h-[1px] bg-accent" />
             <p className="text-xs md:text-sm text-accent tracking-widest uppercase font-bold">
               {isArabic ? "من نحن" : "Who We Are"}
             </p>
             <span className="w-8 h-[1px] bg-accent" />
          </div>
          <h2 className="text-4xl md:text-7xl font-light text-white leading-tight mb-6">
            {isArabic 
              ? "العقول خلف " 
              : "The Minds Behind "}
             <span className="text-accent font-normal">
               {isArabic ? "الابتكار" : "Innovation"}
             </span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light">
            {isArabic
                ? 'فريقنا يجمع بين الخبرة والابتكار لبناء حلول رقمية مؤثرة.'
                : 'Our team combines expertise and innovation to build impactful digital solutions.'}
          </p>
        </ScrollBasedAnimation>
      </div>

      {/* The Sticky Container */}
      <div className="relative w-full">
        {teamData.length === 0 ? (
          <div className="h-[50vh] flex items-center justify-center text-white/30">
            {isArabic ? 'جاري تحميل الفريق...' : 'Loading Team...'}
          </div>
        ) : (
          teamData.map((member, index) => (
            <TeamMemberCard 
              key={member._id} 
              member={member} 
              index={index} 
              isArabic={isArabic}
            />
          ))
        )}
      </div>

    </section>
  );
};

export default AboutTeam;