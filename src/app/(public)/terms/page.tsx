import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/motion';
import { SITE_CONFIG } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms and conditions for using ${SITE_CONFIG.name} online portal.`,
};

export default function TermsPage() {
  return (
    <>
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative container-wide">
          <RevealOnScroll>
            <span className="label text-ember-glow tracking-[0.15em] text-xs">Legal</span>
            <h1 className="heading-display text-white mt-4">Terms of Service</h1>
            <p className="text-lg text-white/50 mt-6 max-w-2xl">
              Terms and regulations governing admissions, campus participation, and website usage.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-narrow prose prose-stone max-w-3xl mx-auto space-y-8 text-stone leading-relaxed">
          <div>
            <h2 className="heading-md text-ink mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, submitting admission forms, or using our campus portal, you agree to comply with and be bound by these Terms of Service, university guidelines, and applicable laws.
            </p>
          </div>

          <div>
            <h2 className="heading-md text-ink mb-3">2. Admissions & Academic Information</h2>
            <p>
              All admissions to the Bachelor of Computer Applications (BCA) program are subject to eligibility verification under the regulations of Gulbarga University, Kalaburagi. Submission of an enquiry form does not guarantee admission until documents are formally verified.
            </p>
          </div>

          <div>
            <h2 className="heading-md text-ink mb-3">3. Code of Conduct</h2>
            <p>
              Students and applicants are expected to provide accurate, truthful details in all submissions. Misrepresentation of academic qualifications or documentation may result in cancellation of admission.
            </p>
          </div>

          <div>
            <h2 className="heading-md text-ink mb-3">4. Intellectual Property</h2>
            <p>
              All content, course descriptions, photography, logos, and materials published on this website are the property of {SITE_CONFIG.name} and may not be reproduced without written authorization.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
