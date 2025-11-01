'use client';
import React, { useState } from 'react';
import ScrollBasedAnimation from '../../components/ScrollBasedAnimation';
import ContactHero from '../../components/contact/ContactHero';
import Contact from '../../components/home/Contact';
import CTAWork from '../../components/contact/CTAWork';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can integrate email API or backend here
    alert('Message sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <main className="bg-black text-white w-full min-h-screen">
      <ContactHero />
      <Contact/>
      <CTAWork/>
    </main>
  );
};

export default ContactPage;
