import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#84d3d1',
}

export const metadata: Metadata = {
  title: {
    default: 'Chirurgická ambulance Moskevská - Liberec',
    template: '%s | Chirurgická ambulance Moskevská'
  },
  description: 'Moderní chirurgická ambulance v Liberci na ulici Moskevská. Nabízíme komplexní chirurgické služby, laserovou epilaci, odstranění kožních útvarů a estetické zákroky. MUDr. Jaroslav Chaluš a zkušený tým.',
  keywords: 'chirurgická ambulance, Liberec, Moskevská, chirurg, laserová epilace, kožní útvary, estetická chirurgie, MUDr. Chaluš, dermatologie, botox, stop pocení',
  authors: [{ name: 'Chirurgická ambulance Moskevská' }],
  creator: 'Chirurgická ambulance Moskevská',
  publisher: 'Chirurgická ambulance Moskevská',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://chirurgie-moskevska.cz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://chirurgie-moskevska.cz',
    siteName: 'Chirurgická ambulance Moskevská',
    title: 'Chirurgická ambulance Moskevská - Liberec',
    description: 'Moderní chirurgická ambulance v Liberci. Komplexní chirurgické služby, laserová epilace, odstranění kožních útvarů a estetické zákroky.',
    images: [
      {
        url: '/images/hero-background.webp',
        width: 1200,
        height: 630,
        alt: 'Chirurgická ambulance Moskevská - Liberec',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chirurgická ambulance Moskevská - Liberec',
    description: 'Moderní chirurgická ambulance v Liberci. Komplexní chirurgické služby, laserová epilace a estetické zákroky.',
    images: ['/images/hero-background.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // TODO: Přidat skutečný Google Search Console kód
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Chirurgická ambulance Moskevská",
              "description": "Moderní chirurgická ambulance v Liberci poskytující komplexní chirurgické služby, laserovou epilaci a estetické zákroky",
                             "url": "https://chirurgie-moskevska.cz",
              "telephone": "+420 XXX XXX XXX", // TODO: Přidat skutečné telefonní číslo
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Moskevská XX", // TODO: Přidat skutečnou adresu
                "addressLocality": "Liberec",
                "postalCode": "46001",
                "addressCountry": "CZ"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "50.7663", // TODO: Přidat skutečné GPS souřadnice
                "longitude": "15.0543"
              },
              "openingHours": [
                "Mo-Fr 08:00-16:00" // TODO: Upravit podle skutečných ordinačních hodin
              ],
              "priceRange": "$$",
                             "image": "https://chirurgie-moskevska.cz/images/budova.webp",
              "sameAs": [
                // TODO: Přidat odkazy na sociální sítě, pokud existují
              ],
              "medicalSpecialty": "Surgery",
              "availableService": [
                {
                  "@type": "MedicalProcedure",
                  "name": "Chirurgické zákroky"
                },
                {
                  "@type": "MedicalProcedure", 
                  "name": "Laserová epilace"
                },
                {
                  "@type": "MedicalProcedure",
                  "name": "Odstranění kožních útvarů"
                },
                {
                  "@type": "MedicalProcedure",
                  "name": "Estetické zákroky"
                },
                {
                  "@type": "MedicalProcedure",
                  "name": "Botulotoxin - Stop pocení"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Chirurgické služby",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Laserová epilace DOMINO 755nm"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Youlaser MT chirurgické výkony"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Aplikace botulotoxinu"
                    }
                  }
                ]
              },
              "founder": {
                "@type": "Person",
                "name": "MUDr. Jaroslav Chaluš",
                "jobTitle": "Chirurg",
                                 "image": "https://chirurgie-moskevska.cz/images/chalus.webp"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}