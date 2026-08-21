import type { Metadata } from 'next';
import { FAQPageContent } from './FAQPageContent';

export const metadata: Metadata = { title: 'FAQ', description: 'Frequently asked questions about BCA at S.R.N. Mehta Degree College, Kalaburagi.' };

export default function FAQPage() {
  return <FAQPageContent />;
}
