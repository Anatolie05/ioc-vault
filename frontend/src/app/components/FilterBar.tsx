'use client';

import { IOC_TYPES, IocType, SEVERITIES, Severity } from '@/types';

interface FilterBarProps {
  type: string;
  severity: string;
  search: string;
  onTypeChange: (v: string) => void;
  onSeverityChange: (v: string) => void;
  onSearchChange: (v: string) => void;
}

export default function FilterBar({
  type,
  severity,
  search,
  onTypeChange,
  onSeverityChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <input
        type="text"
        placeholder="Search by value..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 min-w-48 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
      />
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500"
      >
        <option value="">All types</option>
        {IOC_TYPES.map((t: IocType) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <select
        value={severity}
        onChange={(e) => onSeverityChange(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500"
      >
        <option value="">All severities</option>
        {SEVERITIES.map((s: Severity) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
