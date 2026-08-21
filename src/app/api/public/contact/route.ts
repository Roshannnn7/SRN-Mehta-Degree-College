import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Valid email is required'),
  phone: z.string().max(20).optional(),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true }); // silently reject bots
    }

    const validated = contactSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validated.error.flatten() },
        { status: 400 }
      );
    }

    // In demo mode without DB: just acknowledge
    // When MongoDB is connected, save to ContactMessage collection
    try {
      const { connectDB } = await import('@/lib/db/connection');
      const { ContactMessageModel } = await import('@/lib/db/models');
      await connectDB();
      await ContactMessageModel.create({ ...validated.data, status: 'new' });
    } catch {
      // DB not available — still return success for demo mode
      console.log('[Contact] DB not available — demo mode. Message data:', validated.data);
    }

    return NextResponse.json({ success: true, message: 'Message received' });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
