import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from 'react'
import { siteUrl } from '@/config/constants';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Michael Friebe | Digital Health Solutions & Development',
    template: '%s | Michael Friebe - Healthcare Technology Solutions'
  },
  description: 'Transforming healthcare through user-centric digital solutions. Specializing in medical software development, health tech UI/UX, and digital health product design.',
  icons: {
    icon: [
      {
        url: '/images/favicon.ico',
        sizes: 'any',
      }
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/apple-icon.png',
        color: '#000000',
      }
    ]
  },
  keywords: [
    'digital health solutions',
    'healthcare software development',
    'medical app design',
    'health tech UI/UX',
    'digital health products',
    'healthcare technology',
    'medical software solutions',
    'health app development',
    'patient experience design',
    'healthcare UX research'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Michael Friebe',
    title: 'Michael Friebe - Digital Health Solutions & Development',
    description: 'Transforming healthcare through user-centric digital solutions. Specializing in medical software development, health tech UI/UX, and digital health product design.',
    images: [
      {
        url: '/images/ziro.avif',
        width: 1200,
        height: 630,
        alt: 'Michael Friebe Digital Health Solutions'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Friebe - Digital Health Solutions & Development',
    description: 'Transforming healthcare through user-centric digital solutions. Specializing in medical software development, health tech UI/UX, and digital health product design.',
    images: ['/images/ziro.avif']
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthcareBusiness",
  "name": "Michael Friebe",
  "url": siteUrl,
  "logo": `/images/ziro.avif`,
  "description": "Digital health solutions provider specializing in medical software development and healthcare technology.",
  "sameAs": [
    "https://twitter.com/ziro",
    "https://linkedin.com/company/ziros",
    "https://www.instagram.com/ziro.space/",
    "https://www.nikhil.health/",
    "https://x.com/NikhilSing69944"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Poland"
  },
  "knowsAbout": [
    "Digital Health Solutions",
    "Healthcare Software Development",
    "Medical UX Design",
    "Health Technology",
    "Patient Experience Design"
  ],
  "serviceType": [
    "Healthcare Software Development",
    "Digital Health Product Design",
    "Medical UX/UI Design",
    "Health Tech Solutions"
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={`${siteUrl}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Suspense>
          {children}

        </Suspense>
        <Analytics mode="production" debug={false} />
      </body>
    </html>
  )
} 