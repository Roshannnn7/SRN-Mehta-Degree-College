import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/motion';
import { Badge } from '@/components/ui';
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { connectDB } from '@/lib/db/connection';
import { EventModel } from '@/lib/db/models';
import { formatDate } from '@/lib/utils';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const event = await EventModel.findOne({ slug, status: 'published' }).lean();
      if (event) {
        return {
          title: (event as { title: string }).title,
          description: (event as { description: string }).description,
        };
      }
    }
  } catch {}
  return {
    title: 'Event Details',
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;

  let event: {
    title: string;
    description: string;
    date: Date | string;
    time?: string;
    location: string;
    category: string;
    coverImage?: { url: string; alt?: string };
    registrationLink?: string;
  } | null = null;

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const doc = await EventModel.findOne({ slug, status: 'published' }).lean();
      if (doc) {
        event = JSON.parse(JSON.stringify(doc));
      }
    }
  } catch {}

  if (!event) {
    notFound();
  }

  return (
    <>
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative container-wide">
          <RevealOnScroll>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-ember-glow transition-colors mb-6 font-heading"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Link>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="ember">{event.category}</Badge>
            </div>
            <h1 className="heading-display text-white max-w-4xl">{event.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/60 mt-6 font-heading">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-ember-glow" />
                <span>{formatDate(event.date)}</span>
              </div>
              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-ember-glow" />
                  <span>{event.time}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-ember-glow" />
                <span>{event.location}</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-narrow max-w-3xl mx-auto space-y-8">
          {event.coverImage?.url && (
            <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-md">
              <Image
                src={event.coverImage.url}
                alt={event.coverImage.alt || event.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-stone max-w-none text-stone leading-relaxed text-base md:text-lg">
            <h2 className="heading-md text-ink mb-4">About this Event</h2>
            <div className="whitespace-pre-line">{event.description}</div>
          </div>

          {event.registrationLink && (
            <div className="pt-6 border-t border-stone-200">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-ember hover:bg-ember-deep text-white font-heading font-medium rounded-xl transition-all shadow-sm"
              >
                Register for this Event
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
