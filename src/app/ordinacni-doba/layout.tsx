import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ordinační doba | Chirurgická ambulance',
  description: 'Detailní informace o ordinační době a rozvrhu lékařů. Zjistěte, kdy můžete navštívit naši chirurgickou ambulanci v Liberci.',
};

export default function OrdinacniDobaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}