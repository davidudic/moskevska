import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import AboutUs from '@/components/sections/AboutUs';
import OfficeHours from '@/components/sections/OfficeHours';
import Reviews from '@/components/sections/Reviews';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Services />
      <AboutUs />
      <OfficeHours />
      <Reviews />
      <Contact />
    </Layout>
  );
}