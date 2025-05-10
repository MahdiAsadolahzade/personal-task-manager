'use client';

import { useState } from 'react';

export default function Test() {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const submit = async () => {
    const res = await fetch('/api/notifications/add', {
      method: 'POST',
      body: JSON.stringify({ title, dueDate }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    alert(data.message);
  };



  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Simple Notification Scheduler</h1>

      <div className="space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          type="datetime-local"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <button onClick={submit} className="bg-blue-500 text-white p-2 rounded">
          Schedule Notification
        </button>

 
      </div>
    </main>
  );
}
