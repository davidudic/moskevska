import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Správa alertu | Chirurgická ambulance',
  description: 'Administrace modálního upozornění',
  robots: 'noindex, nofollow', // Nechceme indexovat admin stránky
};

export default function AdminAlertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}