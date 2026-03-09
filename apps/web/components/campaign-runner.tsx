'use client';

import { useState } from 'react';
import { apiFetch, loginAsAdmin } from '../lib/api';

export function CampaignRunner({ campaignId }: { campaignId: string }) {
  const [message, setMessage] = useState('');

  async function handleRun() {
    try {
      const auth = await loginAsAdmin();
      const result = await apiFetch<{ queued: boolean; runId: string }>(`/campaigns/${campaignId}/run`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      });
      setMessage(`Queued campaign run: ${result.runId}`);
    } catch {
      setMessage('Failed to queue campaign.');
    }
  }

  return (
    <div className="stack">
      <button className="btn" onClick={handleRun}>Run campaign</button>
      {message ? <div className="muted">{message}</div> : null}
    </div>
  );
}
