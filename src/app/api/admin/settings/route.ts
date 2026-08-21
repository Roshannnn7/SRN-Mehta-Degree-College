import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { connectDB } from '@/lib/db/connection';
import { SiteSettingsModel } from '@/lib/db/models';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      let settings = await SiteSettingsModel.findOne().lean();
      if (!settings) {
        settings = await SiteSettingsModel.create({});
      }
      return NextResponse.json({ success: true, data: settings });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (process.env.MONGODB_URI) {
      await connectDB();
      const updated = await SiteSettingsModel.findOneAndUpdate({}, data, {
        new: true,
        upsert: true,
      });
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ success: true, message: 'Updated in memory' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}
