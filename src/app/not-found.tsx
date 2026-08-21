import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="font-heading font-bold text-8xl md:text-9xl text-ember/20 leading-none">
          404
        </div>
        <h1 className="font-heading font-semibold text-2xl md:text-3xl text-white mt-4">
          Page not found
        </h1>
        <p className="text-white/50 mt-3 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-ember hover:bg-ember-deep text-white font-heading font-medium text-sm rounded-lg transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-white/20 text-white font-heading font-medium text-sm rounded-lg hover:bg-white hover:text-ink transition-colors"
          >
            Contact Us
          </Link>
        </div>
        <p className="text-white/20 text-xs font-heading tracking-wide uppercase mt-12">
          S.R.N. Mehta Degree College · Kalaburagi
        </p>
      </div>
    </div>
  );
}
