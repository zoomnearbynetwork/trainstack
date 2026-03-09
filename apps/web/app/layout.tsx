import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';
import { QueryProvider } from '../components/query-provider';

export const metadata = {
  title: 'TrainStack AI',
  description: 'IT training institute SaaS'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/leads">Leads</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/campaigns">Campaigns</Link>
            <Link href="/website-builder">Website Builder</Link>
          </nav>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
