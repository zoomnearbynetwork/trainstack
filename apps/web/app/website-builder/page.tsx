import { apiFetch, loginAsAdmin } from '../../lib/api';

export default async function WebsiteBuilderPage() {
  let generated = '';

  try {
    const login = await loginAsAdmin();
    const result = await apiFetch<{ text: string }>('/website-builder/generate', {
      method: 'POST',
      body: JSON.stringify({ topic: 'Demo Institute' }),
      headers: { Authorization: `Bearer ${login.accessToken}` }
    });
    generated = result.text;
  } catch {
    generated = 'Connect the API and database to generate website content.';
  }

  return (
    <main className="container">
      <h1>AI Website Builder</h1>
      <div className="card">
        <div className="muted">Sample generated homepage copy</div>
        <p style={{ lineHeight: 1.6 }}>{generated}</p>
      </div>
    </main>
  );
}
