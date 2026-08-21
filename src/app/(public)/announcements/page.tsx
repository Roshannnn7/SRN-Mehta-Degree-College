import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/motion';
import { EmptyState } from '@/components/ui';
import { Megaphone, Calendar, AlertCircle } from 'lucide-react';
import { connectDB } from '@/lib/db/connection';
import { AnnouncementModel } from '@/lib/db/models';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Announcements & Circulars',
  description: 'Latest official notices, exam schedules, holiday lists, and circulars from S.R.N. Mehta Degree College.',
};

export const dynamic = 'force-dynamic';

export default async function AnnouncementsPage() {
  let announcements: Array<{
    _id: string;
    title: string;
    content: string;
    type: string;
    priority: 'normal' | 'high' | 'urgent';
    publishDate: string;
  }> = [];

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const docs = await AnnouncementModel.find({ status: 'published' }).sort({ publishDate: -1 }).lean();
      announcements = JSON.parse(JSON.stringify(docs));
    }
  } catch (err) {
    console.error('Error fetching announcements:', err);
  }

  return (
    <>
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative container-wide">
          <RevealOnScroll>
            <span className="label text-ember-glow tracking-[0.15em] text-xs">Official Notices</span>
            <h1 className="heading-display text-white mt-4">Announcements & Circulars</h1>
            <p className="text-lg text-white/50 mt-6 max-w-xl">
              Stay up to date with university schedules, semester examinations, holidays, and campus events.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-wide max-w-5xl mx-auto">
          {announcements.length === 0 ? (
            <EmptyState
              icon={<Megaphone className="w-12 h-12 text-stone-300" />}
              title="No announcements published yet."
              description="Official notices and circulars will appear here as soon as they are published by the administration."
            />
          ) : (
            <div className="space-y-4">
              {announcements.map((item) => (
                <div
                  key={item._id}
                  className={`p-6 rounded-2xl bg-white border transition-all hover:shadow-md ${
                    item.priority === 'urgent'
                      ? 'border-red-300 bg-red-50/10 ring-1 ring-red-200'
                      : item.priority === 'high'
                      ? 'border-amber-300 bg-amber-50/10'
                      : 'border-stone-lighter/80'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.65rem] font-heading font-semibold uppercase px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        {item.type}
                      </span>
                      {item.priority === 'urgent' && (
                        <span className="text-[0.65rem] font-heading font-bold uppercase px-2 py-0.5 rounded-full bg-red-100 text-red-700 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Urgent Notice
                        </span>
                      )}
                      {item.priority === 'high' && (
                        <span className="text-[0.65rem] font-heading font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          Important
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone font-heading">
                      <Calendar className="w-3.5 h-3.5 text-ember" />
                      <span>{formatDate(item.publishDate)}</span>
                    </div>
                  </div>

                  <h3 className="heading-md text-ink text-lg md:text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-stone mt-3 leading-relaxed whitespace-pre-line text-sm md:text-base">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
