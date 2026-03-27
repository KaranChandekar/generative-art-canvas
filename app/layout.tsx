import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Generative Art Canvas',
  description: 'Create beautiful procedural artwork with real-time feedback',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
