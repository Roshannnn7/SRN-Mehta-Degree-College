'use server';

import { signIn } from '@/lib/auth/auth';
import { AuthError } from 'next-auth';

export async function loginAdminAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const email = (formData.get('email') as string)?.trim();
    const password = (formData.get('password') as string)?.trim();

    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    await signIn('credentials', {
      email,
      password,
      redirectTo: '/admin',
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Invalid email or password.' };
        default:
          return { success: false, error: 'Authentication failed. Please check credentials.' };
      }
    }
    
    // In Next.js App Router, redirects are thrown as exceptions. Let them throw.
    if (error && typeof error === 'object' && 'digest' in error && String((error as { digest: string }).digest).startsWith('NEXT_REDIRECT')) {
      throw error;
    }

    console.error('[LoginAction] Error:', error);
    return { success: false, error: 'Invalid email or password.' };
  }
}
