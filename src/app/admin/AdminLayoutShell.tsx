'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn, ADMIN_NAV } from '@/lib/utils';
import {
  LayoutDashboard, GraduationCap, MessageSquare, Calendar, Image as ImageIcon, MapPin,
  Megaphone, Users, Quote, HelpCircle, BookOpen, Home, Building2, FolderOpen,
  Search, Settings, Menu, X, LogOut, ChevronLeft
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
  GraduationCap: <GraduationCap className="w-4 h-4" />,
  MessageSquare: <MessageSquare className="w-4 h-4" />,
  Calendar: <Calendar className="w-4 h-4" />,
  Image: <ImageIcon className="w-4 h-4" />,
  MapPin: <MapPin className="w-4 h-4" />,
  Megaphone: <Megaphone className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Quote: <Quote className="w-4 h-4" />,
  HelpCircle: <HelpCircle className="w-4 h-4" />,
  BookOpen: <BookOpen className="w-4 h-4" />,
  Home: <Home className="w-4 h-4" />,
  Building2: <Building2 className="w-4 h-4" />,
  FolderOpen: <FolderOpen className="w-4 h-4" />,
  Search: <Search className="w-4 h-4" />,
  Settings: <Settings className="w-4 h-4" />,
};

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:sticky top-0 left-0 h-screen z-50 bg-ink flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}>
        {/* Sidebar Header */}
        <div className={cn('flex items-center h-16 px-4 border-b border-white/10', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-ember flex items-center justify-center">
                <span className="font-heading font-bold text-white text-[0.55rem]">SRN</span>
              </div>
              <span className="font-heading font-semibold text-white text-sm">Admin</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')} />
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/40 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-ember text-white font-medium'
                    : 'text-white/50 hover:text-white hover:bg-white/5',
                  collapsed && 'justify-center px-0',
                )}
                onClick={() => setSidebarOpen(false)}
              >
                {iconMap[item.icon] || <LayoutDashboard className="w-4 h-4" />}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5 transition-colors',
              collapsed && 'justify-center px-0',
            )}
          >
            <Home className="w-4 h-4" />
            {!collapsed && <span>View Site</span>}
          </Link>
          <button
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors w-full',
              collapsed && 'justify-center px-0',
            )}
            onClick={async () => {
              const { signOut } = await import('next-auth/react');
              signOut({ callbackUrl: '/admin/login' });
            }}
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 h-16 flex items-center px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-md text-gray-500 hover:text-ink transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="text-xs text-stone font-heading">
            S.R.N. Mehta Degree College
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
