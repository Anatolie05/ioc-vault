'use client';

import { Ioc, SEVERITY_CLASSES } from '@/types';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

interface IocTableProps {
  iocs: Ioc[];
  onDeleted: () => void;
}

export default function IocTable({ iocs, onDeleted }: IocTableProps) {
  async function handleDelete(id: string): Promise<void> {
    await fetch(`${API}/iocs/${id}`, { method: 'DELETE' });
    onDeleted();
  }

  if (iocs.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">No IOCs found.</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-900">
            <th className="text-left px-4 py-3 text-gray-400 font-medium">Value</th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium">Type</th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium">Severity</th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium">Notes</th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium">Created</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {iocs.map((ioc) => (
            <tr key={ioc.id} className="border-b border-gray-800/50 hover:bg-gray-900/50 transition-colors">
              <td className="px-4 py-3 font-mono text-gray-200 max-w-xs truncate">{ioc.value}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded text-xs bg-gray-800 text-gray-300 border border-gray-700">
                  {ioc.type}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded text-xs border ${SEVERITY_CLASSES[ioc.severity]}`}>
                  {ioc.severity}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-400 max-w-xs truncate">{ioc.notes ?? '—'}</td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                {new Date(ioc.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleDelete(ioc.id)}
                  className="text-xs px-2 py-1 rounded bg-red-900/30 text-red-400 border border-red-800 hover:bg-red-900/60 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
