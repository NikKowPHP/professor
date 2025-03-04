import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import '@/styles/globals.css'
import { locales, type Locale } from '@/i18n'
import { ClientWrapper } from './client-wrapper'
import { PageProvider } from '@/contexts/page-context'
import logger from '@/lib/logger'
import { siteUrl } from '@/config/constants';
import type { Metadata } from 'next';
import { PostHogProvider } from '@/contexts/posthog-context'
import { bannerService } from '@/lib/services/banner.service'
// Your GA Measurement ID
const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: 'Michael Friebe | Digital Health Solutions & Development',
      template: '%s | Michael Friebe - Healthcare Technology Solutions',
    },
    description: 'Transforming healthcare through user-centric digital solutions. Specializing in medical software development, health tech UI/UX, and digital health product design.',
    keywords: [
      'digital health solutions',
      'healthcare software development',
      'medical app design',
      'health tech UI/UX',
      'patient experience design',
      'clinical workflow solutions',
      'healthcare technology',
      'medical software systems'
    ],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: 'Michael Friebe',
      title: 'Michael Friebe - Digital Health Solutions & Development',
      description: 'Transforming healthcare through user-centric digital solutions. Specializing in medical software development, health tech UI/UX, and digital health product design.',
      images: [{
        url: '/images/ziro.avif',
        width: 1200,
        height: 630,
        alt: 'Michael Friebe Digital Health Solutions'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Michael Friebe - Digital Health Solutions & Development',
      description: 'Transforming healthcare through user-centric digital solutions. Specializing in medical software development, health tech UI/UX, and digital health product design.',
      images: ['/images/ziro.avif']
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-icon.png',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
    manifest: '/manifest.json',
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  let messages
  try {
    messages = (await import(`@/messages/${locale}.json`)).default
  } catch (error) {
    logger.log(error)
    notFound()
  }

  const initialActiveBanner = await bannerService.getActiveBanner(locale)
  console.log('initialActiveBanner', initialActiveBanner)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Michael Friebe",
              "url": siteUrl,
              "image": "/images/ziro.avif",
              "description": "Digital health solutions provider specializing in medical software development and healthcare technology.",
              "sameAs": [
                "https://linkedin.com/in/michaelfriebe",
                "https://github.com/mfriebe",
                "https://twitter.com/mfriebe"
              ],
              "jobTitle": "Digital Health Solutions Architect",
              "alumniOf": "Technical University of Munich"
            })
          }}
        />
        {/* Google Analytics Script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure'
            });
          `}
        </Script>
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <PostHogProvider>
          <PageProvider initialActiveBanner={initialActiveBanner || undefined}>
            <ClientWrapper>
              <main className="relative">{children}</main>
              </ClientWrapper>
            </PageProvider>
          </PostHogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
