import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt a tým | Chirurgická ambulance Moskevská - Liberec',
  description: 'Kontakt na chirurgickou ambulanci v Liberci na ulici Moskevská. MUDr. Jaroslav Chaluš a zkušený lékařský tým. Ordinační hodiny, telefonní čísla.',
  keywords: 'kontakt chirurg Liberec, Moskevská ambulance, MUDr. Chaluš, ordinační hodiny Liberec, chirurgická ambulance adresa',
  alternates: {
    canonical: 'https://chirurgie-moskevska.cz/kontakt',
  },
  openGraph: {
    title: 'Kontakt a tým | Chirurgická ambulance Moskevská - Liberec',
    description: 'Kontaktní informace a představení lékařského týmu chirurgické ambulance v Liberci.',
    url: 'https://chirurgie-moskevska.cz/kontakt',
    images: [
      {
        url: '/images/budova.webp',
        width: 1200,
        height: 630,
        alt: 'Budova chirurgické ambulance na Moskevské v Liberci',
      },
    ],
  },
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

