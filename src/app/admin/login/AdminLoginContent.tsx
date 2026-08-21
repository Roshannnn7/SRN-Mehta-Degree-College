'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, Input } from '@/components/ui';
import { Lock, AlertCircle } from 'lucide-react';
import { loginAdminAction } from './actions';

export function AdminLoginContent() {
  const [email, setEmail] = useState('admin@srnmehtacollege.com');
  const [password, setPassword] = useState('ChangeThisPassword123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);

    try {
      const res = await loginAdminAction(formData);
      if (res && !res.success && res.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      // If a redirect was initiated by Next.js, it will navigate automatically
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 rounded-full bg-white p-1 shadow-lg border-2 border-ember mx-auto mb-4">
            <Image
              src="/logo.png"
              alt="S.R.N. Mehta Degree College Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <h1 className="font-heading font-semibold text-2xl text-white">Admin Portal</h1>
          <p className="text-sm text-ember-glow font-medium mt-1">S.R.N. Mehta Degree College</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
          <Input
            label="Email"
            id="admin-email"
            name="email"
            type="email"
            required
            placeholder="admin@srnmehtacollege.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            id="admin-password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="flex items-center gap-2 text-sm text-error bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-white/20 text-xs mt-6">
          This area is restricted to authorized administrators only.
        </p>
      </div>
    </div>
  );
}
