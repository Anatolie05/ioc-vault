'use client';

import { useState } from 'react';
import { IOC_TYPES, IocType, SEVERITIES, Severity } from '@/types';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

interface AddIocFormProps {
  onAdded: () => void;
}

export default function AddIocForm({ onAdded }: AddIocFormProps) {
  const [value, setValue] = useState('');
  const [type, setType] = useState<IocType>('IP');
  const [severity, setSeverity] = useState<Severity>('UNKNOWN');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    await fetch(`${API}/iocs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: value.trim(), type, severity, notes: notes.trim() || undefined }),
    });
    setValue('');
    setNotes('');
    setLoading(false);
    onAdded();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="IOC value (IP, domain, hash...)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          className="flex-1 min-w-48 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as IocType)}
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500"
        >
          {IOC_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value as Severity)}
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500"
        >
          {SEVERITIES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded text-sm font-medium transition-colors"
        >
          {loading ? 'Adding...' : 'Add IOC'}
        </button>
      </div>
    </form>
  );
}
