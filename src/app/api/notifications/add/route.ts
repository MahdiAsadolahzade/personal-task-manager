import { NextResponse } from 'next/server';
import { addNotification } from '@/lib/notifications';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  const data = await req.json();
  const { title, dueDate } = data;

  if (!title || !dueDate) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  addNotification({ id: uuidv4(), title, dueDate });
  return NextResponse.json({ message: 'Notification scheduled' });
}
