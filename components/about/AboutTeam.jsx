'use client';
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { client } from '../../sanity/lib/client';
import { groq } from 'next-sanity';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const AboutTeam = () => {
  const { t, i18n } = useTranslation();
  const [teamData, setTeamData] = useState([]);
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    const fetchTeam = async () => {
      const teamQuery = groq`
        *[_type == "team"] | order(order asc) {
          _id,
          name,
          nameAr,
          role,
          roleAr,
          bio,
          bioAr,
          image{
            asset->{
              url
            }
          },
          linkedin,
          twitter
        }
      `;

      try {
        const data = await client.fetch(teamQuery);
        setTeamData(data);
      } catch (error) {
        console.error("❌ Error fetching team:", error);
      }
    };

    fetchTeam();
  }, []);

  return (
    <section className="relative w-full z-30 bg-black/70 py-20  mx-auto px-8 md:px-12">
      {/* Heading */}
      <ScrollBasedAnimation direction="up" offset={50}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t("meetOurTeam")}
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            {t("teamDescription")}
          </p>
        </div>
      </ScrollBasedAnimation>

      {/* Team Layout */}
      {teamData.length === 0 ? (
        <div className="text-center">
          <ScrollBasedAnimation direction="up" offset={50}>
            <p className="text-gray-300 text-lg md:text-xl">
              {t("noReviewsYet")}
            </p>
          </ScrollBasedAnimation>
        </div>
      ) : (
        <div className="space-y-12 mb-16">
          {/* Manager/First Member - Single Row */}
          {teamData.length > 0 && (
            <div className="flex items-center justify-center">
              <ScrollBasedAnimation direction="up" offset={50} delay={0.1}>
                <div className="bg-[#0a0a0a] w-full max-w-sm border-2 border-[#1a1a1a] p-6 hover:border-accent transition-all duration-300 h-full min-h-[400px] flex flex-col">
                  {/* Image */}
                  <div className="flex justify-center mb-4">
                    <Image
                      src={teamData[0].image?.asset?.url || '/placeholder.jpg'}
                      alt={teamData[0].name}
                      className="w-24 h-24 object-cover rounded-full"
                      width={96}
                      height={96}
                    />
                  </div>

                  {/* Name and Role */}
                  <div className="text-center mb-4">
                    <h3 className="text-white font-semibold text-xl mb-1">{isArabic ? teamData[0].nameAr : teamData[0].name}</h3>
                    <p className="text-accent text-sm font-medium">{isArabic ? teamData[0].roleAr : teamData[0].role}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 text-center flex-grow">
                    {isArabic ? teamData[0].bioAr : teamData[0].bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center gap-4 mt-auto">
                    {teamData[0].linkedin && (
                      <a
                        href={teamData[0].linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-accent transition-colors duration-300"
                      >
                        <FaLinkedin className="w-5 h-5" />
                      </a>
                    )}
                    {teamData[0].twitter && (
                      <a
                        href={teamData[0].twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-accent transition-colors duration-300"
                      >
                        <FaTwitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </ScrollBasedAnimation>
            </div>
          )}

          {/* Team Members - 3 Column Grid */}
          {teamData.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamData.slice(1).map((member, idx) => (
                <ScrollBasedAnimation key={member._id || idx} direction="up" offset={50} delay={0.1 * (idx + 1)}>
                  <div className="bg-[#0a0a0a] border-2 border-[#1a1a1a] p-6 hover:border-accent transition-all duration-300 h-full min-h-[400px] flex flex-col">
                    {/* Image */}
                    <div className="flex justify-center mb-4">
                      <Image
                        src={member.image?.asset?.url || '/placeholder.jpg'}
                        alt={member.name}
                        className="w-24 h-24 object-cover rounded-full"
                        width={96}
                        height={96}
                      />
                    </div>

                    {/* Name and Role */}
                    <div className="text-center mb-4">
                      <h3 className="text-white font-semibold text-xl mb-1">{isArabic ? member.nameAr : member.name}</h3>
                      <p className="text-accent text-sm font-medium">{isArabic ? member.roleAr : member.role}</p>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 text-center flex-grow">
                      {isArabic ? member.bioAr : member.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center gap-4 mt-auto">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-accent transition-colors duration-300"
                        >
                          <FaLinkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-accent transition-colors duration-300"
                        >
                          <FaTwitter className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollBasedAnimation>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CTA Button */}
      <ScrollBasedAnimation direction="up" offset={50} delay={0.5}>
        <div className="text-center">
          <button className="bg-accent hover:bg-green-500 text-black font-semibold py-4 px-10 transition-all duration-300 transform hover:scale-105">
            {t("connectWithUs")}
          </button>
        </div>
      </ScrollBasedAnimation>
    </section>
  );
};

export default AboutTeam;
