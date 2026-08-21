import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { cloudinary } from '@/lib/cloudinary';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { connectDB } = await import('@/lib/db/connection');
    const { MediaAssetModel } = await import('@/lib/db/models');
    await connectDB();
    const assets = await MediaAssetModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: assets });
  } catch (error) {
    console.error('Error fetching media assets:', error);
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { url, name, size, type, publicId, format } = body;

    if (!url || !name) {
      return NextResponse.json({ success: false, error: 'URL and Name are required' }, { status: 400 });
    }

    const { connectDB } = await import('@/lib/db/connection');
    const { MediaAssetModel } = await import('@/lib/db/models');
    await connectDB();

    const created = await MediaAssetModel.create({
      url,
      name,
      size,
      type: type || 'image',
      publicId,
      format,
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error: unknown) {
    console.error('Error creating media asset record:', error);
    const msg = error instanceof Error ? error.message : 'Failed to save media record';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const publicId = searchParams.get('publicId');
    const type = (searchParams.get('type') || 'image') as 'image' | 'video';

    // 1. Delete from Cloudinary if publicId exists
    if (publicId && process.env.CLOUDINARY_CLOUD_NAME) {
      try {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: type === 'video' ? 'video' : 'image',
        });
      } catch (cloudErr) {
        console.error('Cloudinary destroy error:', cloudErr);
      }
    }

    // 2. Delete from MongoDB database
    if (id) {
      try {
        const { connectDB } = await import('@/lib/db/connection');
        const { MediaAssetModel } = await import('@/lib/db/models');
        await connectDB();
        await MediaAssetModel.findByIdAndDelete(id);
      } catch (dbErr) {
        console.error('MongoDB media delete error:', dbErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Media asset deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting media asset:', error);
    const msg = error instanceof Error ? error.message : 'Delete failed';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
