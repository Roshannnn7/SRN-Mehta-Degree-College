import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { connectDB } from '@/lib/db/connection';
import { FAQModel } from '@/lib/db/models';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const faqs = await FAQModel.find().sort({ order: 1, createdAt: 1 }).lean();
      return NextResponse.json({ success: true, data: faqs });
    }
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.question || !data.answer) {
      return NextResponse.json({ success: false, error: 'Question and Answer are required' }, { status: 400 });
    }

    if (process.env.MONGODB_URI) {
      await connectDB();
      const newFaq = await FAQModel.create(data);
      return NextResponse.json({ success: true, data: newFaq });
    }
    return NextResponse.json({ success: true, message: 'Saved' });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ success: false, error: 'Failed to create FAQ' }, { status: 500 });
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
      const updated = await FAQModel.findByIdAndUpdate(id, data, { new: true });
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ success: true, message: 'Updated' });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json({ success: false, error: 'Failed to update FAQ' }, { status: 500 });
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
      await FAQModel.findByIdAndDelete(id);
    }
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
