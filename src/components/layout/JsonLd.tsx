import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

// Předpřipravené JSON-LD schemas pro různé typy stránek

export const createOrganizationSchema = () => ({
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
  "medicalSpecialty": "Surgery",
  "founder": {
    "@type": "Person",
    "name": "MUDr. Jaroslav Chaluš",
    "jobTitle": "Chirurg",
    "image": "https://chirurgie-moskevska.cz/images/chalus.webp"
  }
});

export const createServiceSchema = (serviceName: string, description: string, price?: string) => ({
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": serviceName,
  "description": description,
  "provider": {
    "@type": "MedicalBusiness",
    "name": "Chirurgická ambulance Moskevská",
    "url": "https://chirurgie-moskevska.cz"
  },
  ...(price && {
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "CZK"
    }
  })
});

export const createBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const createFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export default JsonLd; 