import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { connectDB } from '@/lib/db/connection';
import { GalleryAlbumModel } from '@/lib/db/models';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const albums = await GalleryAlbumModel.find().sort({ order: 1, createdAt: -1 }).lean();
      return NextResponse.json({ success: true, data: albums });
    }
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.title) {
      return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 });
    }

    if (process.env.MONGODB_URI) {
      await connectDB();
      const newAlbum = await GalleryAlbumModel.create(data);
      return NextResponse.json({ success: true, data: newAlbum });
    }
    return NextResponse.json({ success: true, message: 'Saved' });
  } catch (error) {
    console.error('Error creating gallery album:', error);
    return NextResponse.json({ success: false, error: 'Failed to create album' }, { status: 500 });
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
      const updated = await GalleryAlbumModel.findByIdAndUpdate(id, data, { new: true });
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ success: true, message: 'Updated' });
  } catch (error) {
    console.error('Error updating gallery album:', error);
    return NextResponse.json({ success: false, error: 'Failed to update album' }, { status: 500 });
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
      await GalleryAlbumModel.findByIdAndDelete(id);
    }
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting album:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete album' }, { status: 500 });
  }
}
