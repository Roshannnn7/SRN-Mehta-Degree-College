import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/motion';
import { EmptyState, Badge } from '@/components/ui';
import { MapPin, Calendar, CheckCircle2, Compass } from 'lucide-react';
import { connectDB } from '@/lib/db/connection';
import { FieldTripModel } from '@/lib/db/models';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Field Trips & Industry Visits',
  description: 'Industry visits, technology exposure tours, and practical learning journeys at S.R.N. Mehta Degree College.',
};

export const dynamic = 'force-dynamic';

export default async function FieldTripsPage() {
  let trips: Array<{
    _id: string;
    title: string;
    date: string;
    location: string;
    purpose: string;
    description: string;
    outcomes?: string;
  }> = [];

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const docs = await FieldTripModel.find({ status: 'published' }).sort({ date: -1 }).lean();
      trips = JSON.parse(JSON.stringify(docs));
    }
  } catch (err) {
    console.error('Error fetching field trips:', err);
  }

  return (
    <>
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative container-wide">
          <RevealOnScroll>
            <span className="label text-ember-glow tracking-[0.15em] text-xs">Real World Exposure</span>
            <h1 className="heading-display text-white mt-4">Field Trips & Industry Visits</h1>
            <p className="text-lg text-white/50 mt-6 max-w-xl">
              Educational excursions, software development centers, and hands-on experiences beyond the classroom.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-wide">
          {trips.length === 0 ? (
            <EmptyState
              icon={<Compass className="w-12 h-12 text-stone-300" />}
              title="New journeys are being planned."
              description="Field trip stories and industrial visit records will appear here once documented through the admin dashboard."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <div
                  key={trip._id}
                  className="bg-white rounded-2xl border border-stone-lighter/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 text-xs text-stone font-heading">
                        <Calendar className="w-3.5 h-3.5 text-ember" />
                        <span>{formatDate(trip.date)}</span>
                      </div>
                      <Badge variant="ember">Industrial Tour</Badge>
                    </div>

                    <h3 className="heading-md text-ink text-lg font-semibold">{trip.title}</h3>

                    <div className="flex items-center gap-1.5 text-xs text-ember font-heading mt-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{trip.location}</span>
                    </div>

                    {trip.purpose && (
                      <div className="mt-3 text-xs text-stone">
                        <strong className="text-ink">Objective:</strong> {trip.purpose}
                      </div>
                    )}

                    {trip.description && (
                      <p className="text-xs text-stone mt-2.5 leading-relaxed line-clamp-4">
                        {trip.description}
                      </p>
                    )}

                    {trip.outcomes && (
                      <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs text-stone">
                        <div className="flex items-center gap-1 text-[0.65rem] font-heading font-semibold text-emerald-700 uppercase tracking-wider mb-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Key Learning
                        </div>
                        <p>{trip.outcomes}</p>
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
