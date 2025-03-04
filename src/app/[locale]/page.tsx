import { Suspense } from 'react'
import {
  HeroSection,
  MyExpertise,
  YoutubeSection,
  QuoteSection,
  BlogPosts,
} from '@/helpers/componentsLoad'
import { companyConfig } from '@/config/company'

// Centralize JSON-LD data
const jsonLdData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${companyConfig.url}/#organization`,
    "name": companyConfig.name,
    "url": companyConfig.url,
    "logo": {
      "@type": "ImageObject",
      "url": `${companyConfig.url}/images/ziro.avif`,
      "width": "180",
      "height": "180"
    },
    "sameAs": Object.values(companyConfig.social),
    "description": companyConfig.description,
    "areaServed": {
      "@type": "Country",
      "name": "Poland"
    },
    "knowsAbout": companyConfig.expertise
  },
  service: {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": `${companyConfig.name} Services`,
    "serviceType": companyConfig.services,
    "audience": {
      "@type": "Audience",
      "audienceType": companyConfig.audience
    }
  },
  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": companyConfig.url
    }]
  }
}

export default async function HomePage() {

  return (
    <>
      <div
        className="relative overflow-hidden min-h-screen bg-white"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {/* Priority Content for LCP */}
        <HeroSection />

        {/* Deferred Content */}
        <div className="relative">
          <Suspense fallback={<div className="min-h-[300px]" />}>
            {/* <SubheroSection /> */}
          </Suspense>

          {/* Group related sections */}
          <Suspense fallback={<div className="min-h-[700px]" />}>
            <div>
              <MyExpertise />
              {/* <OurServices /> */}
            </div>
          </Suspense>

          <Suspense fallback={<div className="min-h-[400px]">Loading video...</div>}>
            <div>
              <YoutubeSection />
            </div>
          </Suspense>

          <Suspense fallback={<div className="min-h-[400px]"></div>}> 
            <QuoteSection />
          </Suspense>

          <Suspense fallback={<div className="min-h-[300px]" />}>
            <BlogPosts />
          </Suspense>

        
        </div>

        {/* Metadata */}
        <meta itemProp="name" content={companyConfig.name} />
        <meta itemProp="description" content={companyConfig.description} />
        <meta itemProp="image" content="/images/ziro.avif" />
        <meta itemProp="dateModified" content={new Date().toISOString().split('T')[0]} />
      </div>

      {/* Structured Data */}
      {Object.values(jsonLdData).map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  )
}

