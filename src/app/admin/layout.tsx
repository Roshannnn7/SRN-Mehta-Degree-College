import { AdminLayoutShell } from './AdminLayoutShell';

export const metadata = { title: { default: 'Admin Dashboard', template: '%s | Admin — SRN Mehta' }, robots: 'noindex, nofollow' };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
