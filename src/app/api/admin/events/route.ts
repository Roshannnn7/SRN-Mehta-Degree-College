import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { connectDB } from '@/lib/db/connection';
import { EventModel } from '@/lib/db/models';
import { slugify } from '@/lib/utils';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const events = await EventModel.find().sort({ date: -1 }).lean();
      return NextResponse.json({ success: true, data: events });
    }
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.title || !data.date || !data.location) {
      return NextResponse.json({ success: false, error: 'Title, Date, and Location are required' }, { status: 400 });
    }

    const slug = data.slug || slugify(data.title) + '-' + Date.now();

    if (process.env.MONGODB_URI) {
      await connectDB();
      const newEvent = await EventModel.create({
        ...data,
        slug,
      });
      return NextResponse.json({ success: true, data: newEvent });
    }
    return NextResponse.json({ success: true, message: 'Saved' });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ success: false, error: 'Failed to create event' }, { status: 500 });
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
      const updated = await EventModel.findByIdAndUpdate(id, data, { new: true });
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ success: true, message: 'Updated' });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ success: false, error: 'Failed to update event' }, { status: 500 });
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
      await EventModel.findByIdAndDelete(id);
    }
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete event' }, { status: 500 });
  }
}
