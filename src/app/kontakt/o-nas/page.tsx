import React from 'react';
import Layout from '@/components/layout/Layout';
import AboutUs from '@/components/sections/AboutUs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O nás | Chirurgická ambulance Moskevská - Liberec',
  description: 'Poznejte náš tým zkušených lékařů a zdravotních sester. Chirurgická ambulance Moskevská v Liberci pod vedením MUDr. Jaroslava Chaluše.',
  keywords: 'o nás, chirurgická ambulance, MUDr. Chaluš, tým lékařů, Liberec, Moskevská',
  alternates: {
    canonical: 'https://chirurgie-moskevska.cz/kontakt/o-nas',
  },
  openGraph: {
    title: 'O nás | Chirurgická ambulance Moskevská - Liberec',
    description: 'Poznejte náš tým zkušených lékařů a zdravotních sester.',
    url: 'https://chirurgie-moskevska.cz/kontakt/o-nas',
  },
};

export default function ONasPage() {
  return (
    <Layout>
      <AboutUs />
    </Layout>
  );
}

