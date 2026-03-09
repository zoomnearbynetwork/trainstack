import * as React from 'react';

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`rounded-2xl border bg-white p-4 shadow-sm ${props.className ?? ''}`} />;
}
