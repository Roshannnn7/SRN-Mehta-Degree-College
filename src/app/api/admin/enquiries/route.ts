import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { connectDB } from '@/lib/db/connection';
import { ContactMessageModel } from '@/lib/db/models';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const messages = await ContactMessageModel.find().sort({ createdAt: -1 }).lean();
      return NextResponse.json({ success: true, data: messages });
    }
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 });
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

      const updated = await ContactMessageModel.findByIdAndUpdate(id, updateData, { new: true });
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ success: true, message: 'Updated in memory' });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ success: false, error: 'Failed to update message' }, { status: 500 });
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
      await ContactMessageModel.findByIdAndDelete(id);
    }
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete message' }, { status: 500 });
  }
}
