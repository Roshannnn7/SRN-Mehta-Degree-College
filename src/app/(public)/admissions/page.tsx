import type { Metadata } from 'next';
import { AdmissionsPageContent } from './AdmissionsPageContent';

export const metadata: Metadata = {
  title: 'Admissions',
  description: 'Apply for BCA at S.R.N. Mehta Degree College, Kalaburagi. Check eligibility, admission process, and submit your enquiry.',
};

export default function AdmissionsPage() {
  return <AdmissionsPageContent />;
}
