import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const admissionSchema = z.object({
  studentName: z.string().min(2).max(100),
  parentName: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  email: z.string().email(),
  dob: z.string().min(1),
  board: z.string().min(1).max(100),
  stream: z.string().min(1).max(100),
  percentage: z.string().min(1).max(10),
  city: z.string().min(1).max(100),
  contactPreference: z.enum(['phone', 'email', 'whatsapp']).optional(),
  message: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const validated = admissionSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validated.error.flatten() },
        { status: 400 }
      );
    }

    try {
      const { connectDB } = await import('@/lib/db/connection');
      const { AdmissionEnquiryModel } = await import('@/lib/db/models');
      await connectDB();
      await AdmissionEnquiryModel.create({ ...validated.data, status: 'new' });
    } catch {
      console.log('[Admission] DB not available — demo mode. Enquiry data:', validated.data);
    }

    return NextResponse.json({ success: true, message: 'Enquiry submitted' });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
