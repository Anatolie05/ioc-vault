'use client';

import { useState } from 'react';
import { IOC_TYPES, IocType, SEVERITIES, Severity } from '@/types';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

interface BulkAddFormProps {
  onAdded: () => void;
}

export default function BulkAddForm({ onAdded }: BulkAddFormProps) {
  const [text, setText] = useState('');
  const [type, setType] = useState<IocType>('IP');
  const [severity, setSeverity] = useState<Severity>('UNKNOWN');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return;
    setLoading(true);
    const payload = lines.map((value) => ({ value, type, severity }));
    await fetch(`${API}/iocs/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setText('');
    setLoading(false);
    onAdded();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        placeholder={'Paste IOCs here, one per line:\n192.168.1.1\nevil.example.com\nhttps://bad.site/payload'}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm font-mono text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-y"
      />
      <div className="flex flex-wrap gap-3 items-center">
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
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded text-sm font-medium transition-colors"
        >
          {loading ? 'Adding...' : 'Bulk Add'}
        </button>
        <span className="text-xs text-gray-500">
          {text.split('\n').filter((l) => l.trim()).length} IOCs
        </span>
      </div>
    </form>
  );
}
