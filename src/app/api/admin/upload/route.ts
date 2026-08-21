import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      {
        success: false,
        error: 'Cloudinary credentials not configured in .env.local (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)',
      },
      { status: 400 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'srn-mehta-college';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Auto-detect image vs video
    const isVideo = file.type.startsWith('video/');
    const resourceType = isVideo ? 'video' : 'image';

    const uploadResult = await uploadToCloudinary(buffer, folder, resourceType);

    return NextResponse.json({
      success: true,
      data: {
        url: uploadResult.url,
        publicId: uploadResult.publicId,
        format: uploadResult.format,
        resourceType: uploadResult.resourceType,
        originalName: file.name,
        size: file.size,
      },
    });
  } catch (error: unknown) {
    console.error('Cloudinary upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
