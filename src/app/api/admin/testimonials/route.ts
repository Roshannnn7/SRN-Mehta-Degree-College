import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { connectDB } from '@/lib/db/connection';
import { TestimonialModel } from '@/lib/db/models';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const testimonials = await TestimonialModel.find().sort({ createdAt: -1 }).lean();
      return NextResponse.json({ success: true, data: testimonials });
    }
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.studentName || !data.quote) {
      return NextResponse.json({ success: false, error: 'Student Name and Quote are required' }, { status: 400 });
    }

    if (process.env.MONGODB_URI) {
      await connectDB();
      const newTestimonial = await TestimonialModel.create(data);
      return NextResponse.json({ success: true, data: newTestimonial });
    }
    return NextResponse.json({ success: true, message: 'Saved' });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ success: false, error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });
    }

    if (process.env.MONGODB_URI) {
      await connectDB();
      const updated = await TestimonialModel.findByIdAndUpdate(id, data, { new: true });
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ success: true, message: 'Updated' });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ success: false, error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });
    }

    if (process.env.MONGODB_URI) {
      await connectDB();
      await TestimonialModel.findByIdAndDelete(id);
    }
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
