import type { Metadata } from 'next';
import { AboutPageContent } from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about S.R.N. Mehta Degree College, Kalaburagi. Established in 2023, affiliated to Gulbarga University, offering BCA education.',
};

export default function AboutPage() {
  return <AboutPageContent />;
}
