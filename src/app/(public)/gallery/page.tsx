import type { Metadata } from 'next';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/motion';
import { connectDB } from '@/lib/db/connection';
import { GalleryAlbumModel } from '@/lib/db/models';

export const metadata: Metadata = { 
  title: 'Photo Gallery | S.R.N. Mehta Degree College', 
  description: 'Photo gallery of S.R.N. Mehta Degree College campus, labs, events, and student life.' 
};

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const defaultImages: Array<{ src: string; title: string; category: string; caption?: string }> = [
    { src: '/campus-front.png', title: 'Main Campus Entrance & Facade', category: 'Campus', caption: 'Main Campus Entrance' },
    { src: '/campus-aerial.jpg', title: 'Aerial Campus Master Plan', category: 'Master Plan', caption: 'Aerial Campus View' },
  ];

  const dbImages: Array<{ src: string; title: string; category: string; caption?: string }> = [];

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const albums = await GalleryAlbumModel.find({ status: 'published' }).sort({ order: 1, createdAt: -1 }).lean();
      for (const album of albums) {
        if (album.images && Array.isArray(album.images)) {
          for (const img of album.images) {
            if (img.url) {
              dbImages.push({
                src: img.url,
                title: album.title,
                category: album.category || 'Activities',
                caption: img.caption,
              });
            }
          }
        }
      }
    }
  } catch (err) {
    console.error('Error fetching gallery:', err);
  }

  const allImages = [...dbImages, ...defaultImages];

  return (
    <>
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative container-wide">
          <RevealOnScroll>
            <span className="label text-ember-glow tracking-[0.15em] text-xs">Visual Showcase</span>
            <h1 className="heading-display text-white mt-4">Campus Gallery</h1>
            <p className="text-lg text-white/50 mt-6 max-w-xl">
              Campus architecture, modern learning environments, laboratory facilities, and student moments.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allImages.map((img, i) => (
              <div key={i} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-lighter/80 shadow-sm hover:shadow-md transition-all">
                <a href={img.src} target="_blank" rel="noopener noreferrer" className="block relative aspect-[16/10] bg-stone-100 overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-ink/80 backdrop-blur text-white px-3 py-1 rounded-full text-[0.65rem] font-heading font-semibold uppercase tracking-wider">
                    {img.category}
                  </div>
                </a>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-base text-ink group-hover:text-ember transition-colors">
                      {img.title}
                    </h3>
                    {img.caption && (
                      <p className="text-xs text-stone mt-1">{img.caption}</p>
                    )}
                  </div>
                  <div className="mt-3 text-[0.68rem] text-stone font-heading">
                    Click to view full image
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
