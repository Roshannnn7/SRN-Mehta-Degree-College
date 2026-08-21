import type { Metadata } from 'next';
import { FacilitiesSection } from '@/components/sections';
import { RevealOnScroll } from '@/components/motion';
import { LinkButton } from '@/components/ui';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Campus & Facilities',
  description: 'Explore the campus and facilities at S.R.N. Mehta Degree College. Smart classrooms, computer labs, library, auditorium, and more.',
};

export default function CampusPage() {
  return (
    <>
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative container-wide">
          <RevealOnScroll>
            <span className="label text-ember-glow tracking-[0.15em] text-xs">Campus</span>
            <h1 className="heading-display text-white mt-4 max-w-3xl">
              Where learning<br /><span className="text-ember">happens.</span>
            </h1>
            <p className="text-lg text-white/50 mt-6 max-w-xl">
              Modern infrastructure built for focused, technology-driven education.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <FacilitiesSection />

      <section className="section-padding bg-paper">
        <div className="container-wide text-center">
          <RevealOnScroll>
            <h2 className="heading-xl text-ink max-w-2xl mx-auto">
              Want to see the campus in person?
            </h2>
            <p className="body-lg mt-3 max-w-md mx-auto">
              Schedule a campus visit or contact us for more information about our facilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <LinkButton href="/contact" size="lg">
                Schedule a Visit
                <ArrowRight className="w-4 h-4 ml-1" />
              </LinkButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
