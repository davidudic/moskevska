import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Ordinační doba | Chirurgická ambulance',
  description: 'Administrace ordinační doby',
  robots: 'noindex, nofollow', // Nechceme indexovat admin stránky
};

export default function AdminOrdinaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}