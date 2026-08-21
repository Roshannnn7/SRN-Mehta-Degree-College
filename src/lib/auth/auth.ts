import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const FALLBACK_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@srnmehtacollege.com').toLowerCase();
const FALLBACK_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'srn-mehta-college-secret-key-2026-super-secure-auth',
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = String(credentials.email).trim().toLowerCase();
        const password = String(credentials.password);

        console.log(`[Auth] Login attempt for: "${email}"`);

        // Check fallback / default admin credentials first
        if (email === FALLBACK_ADMIN_EMAIL && password === FALLBACK_ADMIN_PASSWORD) {
          console.log('[Auth] Logged in successfully with admin credentials.');
          return {
            id: 'admin-default-id',
            email: FALLBACK_ADMIN_EMAIL,
            name: 'SRN Mehta Admin',
            role: 'super_admin',
          };
        }

        // Check database if configured
        if (process.env.MONGODB_URI) {
          try {
            const { connectDB } = await import('@/lib/db/connection');
            const { AdminModel } = await import('@/lib/db/models');
            await connectDB();

            const admin = await AdminModel.findOne({ email });
            if (admin) {
              const isValid = await bcrypt.compare(password, admin.passwordHash);
              if (isValid) {
                await AdminModel.updateOne({ _id: admin._id }, { lastLogin: new Date() });
                console.log(`[Auth] Logged in successfully from database: ${email}`);
                return {
                  id: admin._id.toString(),
                  email: admin.email,
                  name: admin.name,
                  role: admin.role,
                };
              }
            }
          } catch (error) {
            console.error('[Auth] DB Query Error:', error);
          }
        }

        console.log('[Auth] Invalid credentials.');
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
});
