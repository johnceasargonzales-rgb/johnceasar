import type { Metadata, Viewport } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ServiceWorkerRegistration } from '@/components/service-worker';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.org';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Sinta Pangasinan | Discover the Extraordinary', template: '%s | Sinta Pangasinan' },
  description: 'Discover the landscapes, heritage, and stories of Pangasinan. Explore Hundred Islands, Cape Bolinao Lighthouse, and Balungao Hot Springs with a thoughtful, data-light travel guide.',
  applicationName: 'Sinta Pangasinan',
  icons: { icon: '/icons/favicon.svg' },
  manifest: '/manifest.webmanifest',
  openGraph: { type: 'website', siteName: 'Sinta Pangasinan', title: 'Sinta Pangasinan', description: 'A lighter, more meaningful way to explore Pangasinan.' },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f7f6ef' };

const initDataMode = `try{var saved=localStorage.getItem('sinta-low-data');var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-data: reduce)').matches;if(saved==='true'||(saved===null&&reduce)){document.documentElement.dataset.dataMode='low';if(saved===null)localStorage.setItem('sinta-low-data','true')}else{document.documentElement.dataset.dataMode='full'}}catch(e){document.documentElement.dataset.dataMode='full'}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: initDataMode }}/></head><body><a href="#main-content" className="skip-link">Skip to main content</a><SiteHeader/><ServiceWorkerRegistration/><main id="main-content">{children}</main><SiteFooter/></body></html>;
}
