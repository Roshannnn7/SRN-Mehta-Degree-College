'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/motion';
import { LinkButton } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const allFaqs = [
  { q: 'What is BCA?', a: 'BCA (Bachelor of Computer Applications) is a 3-year undergraduate degree program covering programming, databases, web technologies, AI, cloud computing, cybersecurity, and more. It prepares students for careers in the technology industry.' },
  { q: 'What is the duration of the BCA program?', a: 'The BCA program is 3 years long, divided into 6 semesters. Students complete coursework, practical labs, projects, and a final major project.' },
  { q: 'Who is eligible for BCA?', a: 'Students who have completed 10+2 or PUC in any stream are eligible to apply for BCA at S.R.N. Mehta Degree College.' },
  { q: 'Which university is the college affiliated to?', a: 'S.R.N. Mehta Degree College is affiliated to Gulbarga University, Kalaburagi, Karnataka.' },
  { q: 'When was the college established?', a: 'The college was established in 2023.' },
  { q: 'What subjects are taught in BCA?', a: 'The BCA curriculum covers C, C++, Java, Python, R, Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Web Technologies, Software Engineering, OOP, Computer Graphics, AI, Cloud Computing, Cyber Security, PHP/MySQL, Data Science, Digital Image Processing, and a Major Project.' },
  { q: 'What facilities does the college offer?', a: 'The college provides smart classrooms, computer laboratory, digital library, high-speed internet, auditorium, playground, cafeteria, GPS-enabled transportation, CCTV security, placement cell, and ICT-enabled teaching.' },
  { q: 'What career options are available after BCA?', a: 'BCA graduates can pursue careers as Software Developers, Web Developers, Data Analysts, Database Administrators, Cybersecurity Analysts, Cloud Engineers, AI/ML Engineers, QA Engineers, and more.' },
  { q: 'Can I pursue higher studies after BCA?', a: 'Yes. BCA graduates can pursue MCA (Master of Computer Applications), MBA, M.Sc in Computer Science or IT, and various professional certifications.' },
  { q: 'Where is the college located?', a: 'S.R.N. Mehta Degree College is located at Sy No 79/1, Azadpur, University Road, Kalaburagi - 585 106, Karnataka.' },
  { q: 'How can I apply for admission?', a: 'You can submit an admission enquiry through the Admissions page on this website. Our admissions team will review your enquiry and contact you with next steps.' },
  { q: 'Does the college have placement support?', a: 'Yes, the college has a dedicated Placement Cell that provides career guidance, training support, and helps connect students with industry opportunities.' },
];

export function FAQPageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative container-wide">
          <RevealOnScroll>
            <span className="label text-ember-glow tracking-[0.15em] text-xs">Help</span>
            <h1 className="heading-display text-white mt-4">FAQ</h1>
            <p className="text-lg text-white/50 mt-6 max-w-xl">Common questions about BCA admissions, curriculum, facilities, and career opportunities.</p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-wide max-w-3xl mx-auto">
          {allFaqs.map((faq, i) => (
            <RevealOnScroll key={i} delay={i * 0.03}>
              <div className="border-b border-stone-lighter/60">
                <button
                  className="w-full flex items-center justify-between py-5 text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className={cn(
                    'font-heading font-medium text-base pr-4 transition-colors',
                    openFaq === i ? 'text-ember' : 'text-ink group-hover:text-ember',
                  )}>
                    {faq.q}
                  </span>
                  <span className={cn(
                    'shrink-0 w-7 h-7 flex items-center justify-center rounded-full border transition-all duration-300',
                    openFaq === i ? 'bg-ember border-ember text-white rotate-45' : 'border-stone-lighter text-stone',
                  )}>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-stone leading-relaxed pb-5 pr-10">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </RevealOnScroll>
          ))}

          <div className="text-center mt-12">
            <p className="text-sm text-stone mb-4">Still have questions?</p>
            <LinkButton href="/contact">
              Contact Us <ArrowRight className="w-4 h-4 ml-1" />
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
