import { Card } from '@/components/ui';
import { cn, getGreeting } from '@/lib/utils';
import {
  GraduationCap, MessageSquare, Calendar, Image as ImageIcon, Users,
  Megaphone, ArrowRight, TrendingUp, CheckCircle2, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { connectDB } from '@/lib/db/connection';
import {
  AdmissionEnquiryModel,
  ContactMessageModel,
  EventModel,
  GalleryAlbumModel,
  FacultyModel,
  AnnouncementModel,
} from '@/lib/db/models';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let isConnected = false;
  let dbError = '';
  let counts = {
    admissions: 0,
    messages: 0,
    events: 0,
    gallery: 0,
    faculty: 0,
    announcements: 0,
  };

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      isConnected = true;
      const [admissions, messages, events, gallery, faculty, announcements] = await Promise.all([
        AdmissionEnquiryModel.countDocuments(),
        ContactMessageModel.countDocuments(),
        EventModel.countDocuments(),
        GalleryAlbumModel.countDocuments(),
        FacultyModel.countDocuments(),
        AnnouncementModel.countDocuments(),
      ]);
      counts = { admissions, messages, events, gallery, faculty, announcements };
    }
  } catch (error: unknown) {
    isConnected = false;
    dbError = error instanceof Error ? error.message : 'Database connection error';
  }

  const stats = [
    { label: 'Admission Enquiries', value: isConnected ? counts.admissions : '0', icon: <GraduationCap className="w-5 h-5" />, href: '/admin/admissions', color: 'text-blue-600 bg-blue-50' },
    { label: 'Contact Messages', value: isConnected ? counts.messages : '0', icon: <MessageSquare className="w-5 h-5" />, href: '/admin/enquiries', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Events', value: isConnected ? counts.events : '0', icon: <Calendar className="w-5 h-5" />, href: '/admin/events', color: 'text-violet-600 bg-violet-50' },
    { label: 'Gallery Albums', value: isConnected ? counts.gallery : '0', icon: <ImageIcon className="w-5 h-5" />, href: '/admin/gallery', color: 'text-amber-600 bg-amber-50' },
    { label: 'Faculty Members', value: isConnected ? counts.faculty : '0', icon: <Users className="w-5 h-5" />, href: '/admin/faculty', color: 'text-rose-600 bg-rose-50' },
    { label: 'Announcements', value: isConnected ? counts.announcements : '0', icon: <Megaphone className="w-5 h-5" />, href: '/admin/announcements', color: 'text-teal-600 bg-teal-50' },
  ];

  const quickActions = [
    { label: 'Manage Admissions', href: '/admin/admissions', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'View Messages', href: '/admin/enquiries', icon: <MessageSquare className="w-4 h-4" /> },
    { label: 'Add Event', href: '/admin/events', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Upload Gallery', href: '/admin/gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { label: 'Edit Homepage', href: '/admin/homepage', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Manage Faculty', href: '/admin/faculty', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-heading font-semibold text-2xl text-ink">{getGreeting()}</h1>
          <p className="text-sm text-stone mt-1">Here&apos;s an overview of your college dashboard.</p>
        </div>

        {isConnected && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-heading font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            MongoDB Atlas Connected
          </div>
        )}
      </div>

      {/* Connection Notice / Status */}
      {isConnected ? (
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm text-emerald-900">
            <p className="font-medium">Database Online & Connected</p>
            <p className="text-emerald-700/80 mt-0.5">
              Connected to MongoDB Atlas cluster <code className="px-1.5 py-0.5 bg-emerald-100/80 rounded text-[0.7rem] font-mono">srn-website</code>. All records, admission enquiries, and portal data will be synced in real-time.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Database not connected</p>
            <p className="text-xs text-amber-700 mt-0.5">
              {dbError ? dbError : 'Configure your MONGODB_URI in .env.local to see live data.'}
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card hover padding="md" className="h-full">
              <div className="flex items-center justify-between">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', stat.color)}>
                  {stat.icon}
                </div>
                <ArrowRight className="w-4 h-4 text-stone-light" />
              </div>
              <div className="mt-3">
                <div className="font-heading font-bold text-2xl text-ink">{stat.value}</div>
                <div className="text-xs text-stone font-heading mt-0.5">{stat.label}</div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-heading font-medium text-ink text-lg mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href}>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-ember/30 hover:shadow-sm transition-all">
                <div className="text-ember">{action.icon}</div>
                <span className="text-sm font-medium text-ink">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
