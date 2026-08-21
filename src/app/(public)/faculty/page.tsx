import type { Metadata } from 'next';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/motion';
import { EmptyState } from '@/components/ui';
import { Users, Award, BookOpen, GraduationCap } from 'lucide-react';
import { connectDB } from '@/lib/db/connection';
import { FacultyModel } from '@/lib/db/models';

export const metadata: Metadata = {
  title: 'Faculty & Academic Mentors',
  description: 'Meet our experienced computer science faculty and academic mentors at S.R.N. Mehta Degree College.',
};

export const dynamic = 'force-dynamic';

export default async function FacultyPage() {
  let faculty: Array<{
    _id: string;
    name: string;
    designation: string;
    qualification?: string;
    subjects?: string[];
    bio?: string;
    photoUrl?: string;
  }> = [];

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const docs = await FacultyModel.find({ status: { $ne: 'draft' } }).sort({ order: 1, createdAt: 1 }).lean();
      faculty = JSON.parse(JSON.stringify(docs));
    }
  } catch (err) {
    console.error('Error fetching faculty:', err);
  }

  return (
    <>
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative container-wide">
          <RevealOnScroll>
            <span className="label text-ember-glow tracking-[0.15em] text-xs">Academic Mentors</span>
            <h1 className="heading-display text-white mt-4">Our Faculty</h1>
            <p className="text-lg text-white/50 mt-6 max-w-xl">
              Dedicated educators and software practitioners committed to mentoring the next generation of technologists.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-wide">
          {faculty.length === 0 ? (
            <EmptyState
              icon={<Users className="w-12 h-12 text-stone-300" />}
              title="Faculty profiles are being prepared."
              description="Faculty member profiles will appear here once verified data is added through the admin dashboard."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faculty.map((member) => (
                <div
                  key={member._id}
                  className="bg-white rounded-2xl border border-stone-lighter/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {member.photoUrl ? (
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 shrink-0">
                          <Image
                            src={member.photoUrl}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-ember-light flex items-center justify-center text-ember shrink-0">
                          <GraduationCap className="w-8 h-8" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-ink">{member.name}</h3>
                        <p className="text-xs font-heading font-medium text-ember mt-0.5">
                          {member.designation}
                        </p>
                        {member.qualification && (
                          <div className="flex items-center gap-1 text-xs text-stone mt-1">
                            <Award className="w-3 h-3 text-stone-light" />
                            <span>{member.qualification}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {member.bio && (
                      <p className="text-xs text-stone leading-relaxed line-clamp-3 mb-4">
                        {member.bio}
                      </p>
                    )}

                    {member.subjects && member.subjects.length > 0 && (
                      <div className="pt-3 border-t border-stone-100">
                        <div className="flex items-center gap-1 text-[0.65rem] font-heading font-semibold text-stone uppercase tracking-wider mb-2">
                          <BookOpen className="w-3 h-3 text-stone-light" /> Subjects Handled
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {member.subjects.map((sub, idx) => (
                            <span
                              key={idx}
                              className="text-[0.68rem] px-2.5 py-0.5 rounded-md bg-stone-50 border border-stone-200 text-stone-700 font-heading"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
