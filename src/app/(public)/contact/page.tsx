import type { Metadata } from 'next';
import { ContactPageContent } from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with S.R.N. Mehta Degree College, Kalaburagi. Find us on University Road, Azadpur.',
};

export default function ContactPage() {
  return <ContactPageContent />;
}
