'use client';

import { useQuery } from '@tanstack/react-query';
import { apiFetch, loginAsAdmin } from '../lib/api';
import { LeadDto } from '@trainstack/types';

export function LeadsClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const auth = await loginAsAdmin();
      return apiFetch<LeadDto[]>('/leads', {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      });
    }
  });

  if (isLoading) return <div className="card">Loading leads...</div>;
  if (error) return <div className="card">Failed to load leads.</div>;

  return (
    <div className="grid">
      {data?.map((lead) => (
        <div className="card" key={lead.id}>
          <strong>{lead.fullName}</strong>
          <div className="muted">{lead.email || lead.phone || 'No contact info'}</div>
          <div>Status: {lead.status}</div>
          <div>Score: {lead.score}</div>
        </div>
      ))}
    </div>
  );
}
