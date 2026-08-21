import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/motion';
import { SITE_CONFIG } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${SITE_CONFIG.name}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative container-wide">
          <RevealOnScroll>
            <span className="label text-ember-glow tracking-[0.15em] text-xs">Legal</span>
            <h1 className="heading-display text-white mt-4">Privacy Policy</h1>
            <p className="text-lg text-white/50 mt-6 max-w-2xl">
              How we collect, use, and protect your personal information at {SITE_CONFIG.name}.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-narrow prose prose-stone max-w-3xl mx-auto space-y-8 text-stone leading-relaxed">
          <div>
            <h2 className="heading-md text-ink mb-3">1. Information We Collect</h2>
            <p>
              When you submit admission enquiries, contact forms, or register for college events, we collect personal information including your name, email address, phone number, academic records, and communication preferences.
            </p>
          </div>

          <div>
            <h2 className="heading-md text-ink mb-3">2. How We Use Your Information</h2>
            <p>
              Your information is used strictly for academic administration, processing admission applications, responding to queries, providing campus updates, and complying with regulatory standards affiliated with Gulbarga University.
            </p>
          </div>

          <div>
            <h2 className="heading-md text-ink mb-3">3. Data Protection & Security</h2>
            <p>
              We implement industry-standard encryption, secure cloud infrastructure, and access controls to ensure your data is safe against unauthorized access, alteration, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="heading-md text-ink mb-3">4. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please contact our admissions office at{' '}
              <a href="mailto:info@srnmehtacollege.com" className="text-ember font-medium hover:underline">
                info@srnmehtacollege.com
              </a>{' '}
              or visit our campus at {SITE_CONFIG.address}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
