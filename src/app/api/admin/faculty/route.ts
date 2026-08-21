import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { connectDB } from '@/lib/db/connection';
import { FacultyModel } from '@/lib/db/models';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const faculty = await FacultyModel.find().sort({ order: 1, createdAt: 1 }).lean();
      return NextResponse.json({ success: true, data: faculty });
    }
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Error fetching faculty:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch faculty' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.name || !data.designation) {
      return NextResponse.json({ success: false, error: 'Name and Designation are required' }, { status: 400 });
    }

    if (process.env.MONGODB_URI) {
      await connectDB();
      const newFaculty = await FacultyModel.create(data);
      return NextResponse.json({ success: true, data: newFaculty });
    }
    return NextResponse.json({ success: true, message: 'Saved' });
  } catch (error) {
    console.error('Error creating faculty:', error);
    return NextResponse.json({ success: false, error: 'Failed to create faculty member' }, { status: 500 });
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
      const updated = await FacultyModel.findByIdAndUpdate(id, data, { new: true });
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ success: true, message: 'Updated' });
  } catch (error) {
    console.error('Error updating faculty:', error);
    return NextResponse.json({ success: false, error: 'Failed to update faculty member' }, { status: 500 });
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
      await FacultyModel.findByIdAndDelete(id);
    }
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting faculty:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete faculty member' }, { status: 500 });
  }
}
