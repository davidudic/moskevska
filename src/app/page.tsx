import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import AboutUs from '@/components/sections/AboutUs';
import OfficeHours from '@/components/sections/OfficeHours';
import Reviews from '@/components/sections/Reviews';
import Contact from '@/components/sections/Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chirurgická ambulance Moskevská - Liberec | MUDr. Chaluš',
  description: 'Moderní chirurgická ambulance v Liberci na ulici Moskevská. Laserová epilace DOMINO, Youlaser MT, stop pocení botoxem, odstranění kožních útvarů. MUDr. Jaroslav Chaluš a zkušený tým.',
  keywords: 'chirurgická ambulance Liberec, MUDr. Chaluš, laserová epilace, Moskevská, chirurg Liberec, botox pocení, kožní útvary, estetická chirurgie',
  alternates: {
    canonical: 'https://chirurgie-moskevska.cz',
  },
  openGraph: {
    title: 'Chirurgická ambulance Moskevská - Liberec | MUDr. Chaluš',
    description: 'Moderní chirurgická ambulance v Liberci. Laserová epilace, chirurgické zákroky, estetické služby. Zkušený tým pod vedením MUDr. Chaluše.',
    url: 'https://chirurgie-moskevska.cz',
    images: [
      {
        url: '/images/hero-background.webp',
        width: 1200,
        height: 630,
        alt: 'Chirurgická ambulance Moskevská - moderní zdravotnické zařízení v Liberci',
      },
    ],
  },
};

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