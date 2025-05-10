import { getDueNotifications, clearSent } from '@/lib/notifications';
import { NextResponse } from 'next/server';

export async function GET() {
  const due = getDueNotifications();

  if (due.length === 0) return NextResponse.json({ message: 'No due notifications' });

  // Simulate sending by returning notification payload
  // You can later replace this with push logic
  clearSent(due);
  return NextResponse.json({
    message: 'Notifications ready',
    notifications: due
  });
}
