import type { Metadata } from 'next';
import { AdminLoginContent } from './AdminLoginContent';

export const metadata: Metadata = { title: 'Admin Login', robots: 'noindex, nofollow' };

export default function AdminLoginPage() {
  return <AdminLoginContent />;
}
