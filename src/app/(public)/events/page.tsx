import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/motion';
import { EmptyState } from '@/components/ui';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { connectDB } from '@/lib/db/connection';
import { EventModel } from '@/lib/db/models';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Events & Activities',
  description: 'Seminars, workshops, industry visits, and cultural events at S.R.N. Mehta Degree College.',
};

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  let events: Array<{
    _id: string;
    title: string;
    slug: string;
    date: string;
    time?: string;
    location: string;
    description: string;
    category: string;
    coverImage?: { url: string; alt?: string };
  }> = [];

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const docs = await EventModel.find({ status: 'published' }).sort({ date: -1 }).lean();
      events = JSON.parse(JSON.stringify(docs));
    }
  } catch (err) {
    console.error('Error fetching events:', err);
  }

  return (
    <>
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative container-wide">
          <RevealOnScroll>
            <span className="label text-ember-glow tracking-[0.15em] text-xs">Activities & Workshops</span>
            <h1 className="heading-display text-white mt-4">Events</h1>
            <p className="text-lg text-white/50 mt-6 max-w-xl">
              Seminars, workshops, industry visits, and more — everything happening at SRN Mehta.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-wide">
          {events.length === 0 ? (
            <EmptyState
              icon={<Calendar className="w-12 h-12" />}
              title="New experiences are on the way."
              description="Events will appear here once they are published through the admin dashboard."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Link
                  key={event._id}
                  href={`/events/${event.slug}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-lighter/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  {event.coverImage?.url ? (
                    <div className="relative w-full h-48 bg-stone-100 overflow-hidden">
                      <Image
                        src={event.coverImage.url}
                        alt={event.coverImage.alt || event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-stone-100 flex items-center justify-center text-stone-300">
                      <Calendar className="w-12 h-12 text-stone-300" />
                    </div>
                  )}

                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[0.65rem] font-heading font-semibold uppercase px-2 py-0.5 rounded-full bg-ember-light text-ember">
                          {event.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-stone font-heading">
                          <Calendar className="w-3.5 h-3.5 text-ember" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                      </div>

                      <h3 className="font-heading font-semibold text-lg text-ink group-hover:text-ember transition-colors line-clamp-2">
                        {event.title}
                      </h3>

                      <p className="text-sm text-stone mt-2 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone font-heading">
                      <div className="flex items-center gap-1 truncate max-w-[200px]">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-ember" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <span className="text-ember flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        Details <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
