export type IocType = 'IP' | 'DOMAIN' | 'URL' | 'HASH' | 'EMAIL';
export type Severity = 'MALICIOUS' | 'SUSPICIOUS' | 'CLEAN' | 'UNKNOWN';

export interface Ioc {
  id: string;
  value: string;
  type: IocType;
  severity: Severity;
  notes?: string;
  createdAt: string;
}

export const IOC_TYPES: IocType[] = ['IP', 'DOMAIN', 'URL', 'HASH', 'EMAIL'];
export const SEVERITIES: Severity[] = ['MALICIOUS', 'SUSPICIOUS', 'CLEAN', 'UNKNOWN'];

export const SEVERITY_CLASSES: Record<Severity, string> = {
  MALICIOUS: 'bg-red-900/30 text-red-400 border-red-800',
  SUSPICIOUS: 'bg-yellow-900/30 text-yellow-400 border-yellow-800',
  CLEAN: 'bg-green-900/30 text-green-400 border-green-800',
  UNKNOWN: 'bg-gray-800 text-gray-400 border-gray-700',
};
