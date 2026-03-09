import { apiFetch, loginAsAdmin } from '../../lib/api';
import { CampaignRunner } from '../../components/campaign-runner';

type Campaign = {
  id: string;
  name: string;
  channel: string;
  status: string;
};

export default async function CampaignsPage() {
  let campaigns: Campaign[] = [];

  try {
    const login = await loginAsAdmin();
    campaigns = await apiFetch('/campaigns', {
      headers: { Authorization: `Bearer ${login.accessToken}` }
    });
  } catch {
    campaigns = [];
  }

  return (
    <main className="container">
      <h1>Campaigns</h1>
      <div className="grid">
        {campaigns.map((campaign) => (
          <div className="card" key={campaign.id}>
            <strong>{campaign.name}</strong>
            <div className="muted">{campaign.channel}</div>
            <div>Status: {campaign.status}</div>
            <div style={{ marginTop: 12 }}>
              <CampaignRunner campaignId={campaign.id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
