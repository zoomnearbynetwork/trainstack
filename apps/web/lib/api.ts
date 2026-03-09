import { TENANT_SLUG } from './constants';

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'x-tenant-slug': TENANT_SLUG,
      ...(init?.headers || {})
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API request failed: ${res.status} ${text}`);
  }

  return res.json();
}

export async function loginAsAdmin() {
  return apiFetch<{ accessToken: string; user: { name: string } }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'admin@demo.com',
      password: 'Password123!'
    })
  });
}
