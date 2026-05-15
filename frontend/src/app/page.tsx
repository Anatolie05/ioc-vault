'use client';

import { useCallback, useEffect, useState } from 'react';
import { Ioc } from '@/types';
import AddIocForm from './components/AddIocForm';
import BulkAddForm from './components/BulkAddForm';
import FilterBar from './components/FilterBar';
import IocTable from './components/IocTable';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export default function Home() {
  const [iocs, setIocs] = useState<Ioc[]>([]);
  const [filterType, setFilterType] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');
  const [search, setSearch] = useState('');
  const [showBulk, setShowBulk] = useState(false);

  const fetchIocs = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterType) params.set('type', filterType);
    if (filterSeverity) params.set('severity', filterSeverity);
    if (search) params.set('search', search);
    const res = await fetch(`${API}/iocs?${params.toString()}`);
    const data: Ioc[] = await res.json();
    setIocs(data);
  }, [filterType, filterSeverity, search]);

  useEffect(() => {
    fetchIocs();
  }, [fetchIocs]);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">IOC Vault</h1>
            <p className="text-sm text-gray-500 mt-1">Indicator of Compromise management</p>
          </div>
          <span className="text-sm text-gray-500">{iocs.length} records</span>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
          <FilterBar
            type={filterType}
            severity={filterSeverity}
            search={search}
            onTypeChange={setFilterType}
            onSeverityChange={setFilterSeverity}
            onSearchChange={setSearch}
          />
        </div>

        {/* Add IOC */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Add IOC</h2>
            <button
              onClick={() => setShowBulk((v) => !v)}
              className="text-xs px-3 py-1 rounded border border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-500 transition-colors"
            >
              {showBulk ? 'Single' : 'Bulk'}
            </button>
          </div>
          {showBulk ? (
            <BulkAddForm onAdded={fetchIocs} />
          ) : (
            <AddIocForm onAdded={fetchIocs} />
          )}
        </div>

        {/* Table */}
        <IocTable iocs={iocs} onDeleted={fetchIocs} />
      </div>
    </main>
  );
}
