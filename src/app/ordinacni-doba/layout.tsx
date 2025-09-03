import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ordinační doba | Chirurgická ambulance Moskevská - Liberec',
  description: 'Aktuální ordinační doba chirurgické ambulance v Liberci na Moskevské. Objednávky, časy lékařů, jak se objednat. MUDr. Chaluš a tým.',
  keywords: 'ordinační doba Liberec, objednání chirurg, Moskevská ambulance hodiny, MUDr. Chaluš ordinace',
  alternates: {
    canonical: 'https://chirurgie-moskevska.cz/ordinacni-doba',
  },
  openGraph: {
    title: 'Ordinační doba | Chirurgická ambulance Moskevská - Liberec',
    description: 'Aktuální ordinační doba a informace o objednávání v chirurgické ambulanci v Liberci.',
    url: 'https://chirurgie-moskevska.cz/ordinacni-doba',
    images: [
      {
        url: '/images/budova.webp',
        width: 1200,
        height: 630,
        alt: 'Ordinační doba chirurgické ambulance',
      },
    ],
  },
};

export default function OrdinacniDobaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}