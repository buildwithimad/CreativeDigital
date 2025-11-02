// app/services/ServicesPageContent.js
import React from 'react';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { Minus } from 'lucide-react';
import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';

// ServiceCard stays mostly the same
const ServiceCard = ({ service, index }) => (
  <ScrollBasedAnimation direction="up" offset={50} delay={0.2 * index}>
    <div className="bg-secondary group overflow-hidden duration-500 cursor-pointer">
      <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden ">
        <img
          src={urlFor(service.image).width(800).url()}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500"></div>
      </div>
      <div className="p-6 sm:p-8 flex flex-col justify-between h-64">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Minus className="w-4 h-4 text-[#6EFF33]" />
          </div>
          <h3 className="text-white text-xl sm:text-2xl md:text-2xl font-bold mb-2 group-hover:text-[#6EFF33] transition-colors duration-500">
            {service.title}
          </h3>
          <p className="text-gray-400 text-sm md:text-base ">{service.description}</p>
        </div>
      </div>
    </div>
  </ScrollBasedAnimation>
);

export default async function ServicesPageContent() {
  // Fetch services from Sanity
  const servicesData = await client.fetch(`*[_type == "service"]{
    _id,
    title,
    description,
    image
  }`);

  console.log('Fetched services data:', servicesData);

  return (
    <section className="bg-black/70 py-16 sm:py-20 lg:py-32 z-30 relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {servicesData.map((service, index) => (
          <ServiceCard key={service._id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
