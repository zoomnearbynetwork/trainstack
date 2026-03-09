import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container">
      <div className="card">
        <h1>TrainStack AI v2</h1>
        <p className="muted">
          SaaS starter for IT training institutes with CRM, course management, campaigns, and AI website builder.
        </p>
        <div style={{ marginTop: 16 }}>
          <Link href="/dashboard" className="btn">Open dashboard</Link>
        </div>
      </div>
    </main>
  );
}
