import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import text from '@shared/texts/index.json';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: text.title,
  description: text.description,
  openGraph: {
    title: text.title,
    description: text.description,
    url: 'https://your-domain.com/',
    siteName: text.title,
    images: [
      {
        url: '/public/globe.svg',
        width: 1200,
        height: 630,
        alt: text.title,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: text.title,
    description: text.description,
    images: ['/public/globe.svg'],
  },
  alternates: {
    canonical: 'https://your-domain.com/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={text.description} />
        <meta property="og:title" content={text.title} />
        <meta property="og:description" content={text.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/" />
        <meta property="og:image" content="/public/globe.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={text.title} />
        <meta name="twitter:description" content={text.description} />
        <meta name="twitter:image" content="/public/globe.svg" />
        <link rel="canonical" href="https://your-domain.com/" />
      </Head>
      <body className={`${inter.variable} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
