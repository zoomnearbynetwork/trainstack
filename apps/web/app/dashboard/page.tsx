import { apiFetch, loginAsAdmin } from '../../lib/api';

export default async function DashboardPage() {
  let data: { kpis: { label: string; value: string | number }[] } = { kpis: [] };

  try {
    const login = await loginAsAdmin();
    data = await apiFetch('/analytics/overview', {
      headers: { Authorization: `Bearer ${login.accessToken}` }
    });
  } catch {
    data = { kpis: [] };
  }

  return (
    <main className="container">
      <h1>Dashboard</h1>
      <div className="grid grid-4">
        {data.kpis.map((item) => (
          <div key={item.label} className="card">
            <div className="muted">{item.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>{item.value}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
