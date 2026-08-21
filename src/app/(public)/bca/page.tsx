import type { Metadata } from 'next';
import { BCAPageContent } from './BCAPageContent';

export const metadata: Metadata = {
  title: 'BCA Program — Bachelor of Computer Applications',
  description: 'Explore the 3-year BCA program at S.R.N. Mehta Degree College, Kalaburagi. Full curriculum, career paths, eligibility, and more.',
};

export default function BCAPage() {
  return <BCAPageContent />;
}
