import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { connectDB } from '@/lib/db/connection';
import { AdmissionEnquiryModel } from '@/lib/db/models';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const enquiries = await AdmissionEnquiryModel.find().sort({ createdAt: -1 }).lean();
      return NextResponse.json({ success: true, data: enquiries });
    }
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error fetching admissions:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch admissions' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status, adminNotes } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });
    }

    if (process.env.MONGODB_URI) {
      await connectDB();
      const updateData: Record<string, unknown> = {};
      if (status) updateData.status = status;
      if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

      const updated = await AdmissionEnquiryModel.findByIdAndUpdate(id, updateData, { new: true });
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ success: true, message: 'Updated in memory' });
  } catch (error) {
    console.error('Error updating admission:', error);
    return NextResponse.json({ success: false, error: 'Failed to update admission' }, { status: 500 });
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
      await AdmissionEnquiryModel.findByIdAndDelete(id);
    }
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting admission:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete admission' }, { status: 500 });
  }
}
