'use client'

import Link from 'next/link'
import { footerConfig } from '@/config/footer'
import { siteUrl } from '@/config/constants';
import { ArrowUpRightIcon } from 'lucide-react'
export function Footer() {

  // Helper function to scroll to an element by id
  // Organization JSON-LD
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    "name": "ZIRO Healthcare Solutions",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/images/ziro.avif`,
      "width": "100",
      "height": "34"
    },
    "description": "Digital health solutions provider specializing in medical software development and healthcare technology innovation.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Poland"
    },
    "sameAs": [
      "https://twitter.com/ziro",
      "https://linkedin.com/company/ziros",
      "https://www.instagram.com/ziro.space/",
      "https://www.nikhil.health/",
      "https://x.com/NikhilSing69944",
    ],
    "knowsAbout": [
      "Healthcare Software Development",
      "Medical Technology",
      "Digital Health Solutions",
      "Patient Experience Design",
      "Clinical Workflow Optimization"
    ]
  }

  return (
    <>
      <footer
        className="bg-[#027355] w-full py-12 px-[20px] md:px-20 text-white"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-start lg:flex-row gap-[30px] sm:gap-[30px]  lg:gap-[100px]  w-full">
            
            {/* Left Column */}
            <div className=" flex flex-col md:flex-row gap-[30px] justify-between sm:justify-start lg:justify-start ">
              <div className=" p-4">
                <Link
                  href="/"
                  className="inline-block text-[30px] font-bold whitespace-nowrap"
                  itemProp="url"
                >
                  Michael Friebe
                </Link>
              </div>
              
              <div className=" p-4 space-y-4">
                <p>
                  Michael Friebe is a professor at AGH University in Kraków and OVG University in Magdeburg, 
                  specializing in computer science and medicine, with a focus on diagnostic imaging and medical 
                  technology innovation.
                </p>
                <p>© 2025 Michael Friebe</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex  sm:gap-[30px] justify-between lg:justify-start  lg:gap-[100px] ">
              <div className=" p-4 flex flex-col gap-6">
                <ul>
                  {footerConfig.socialLinks.map((item) => (
                    <li key={item.title}>
                      <Link className="flex items-center gap-2" href={item.href}>{item.title} <ArrowUpRightIcon className="w-6 h-6" /></Link>
                    </li>
                  ))}
                </ul>
                <ul>
                  {footerConfig.mainNavLinks.map((item) => (
                    <li key={item.title}>
                      <Link className="flex items-center gap-2" href={item.href}>{item.title} <ArrowUpRightIcon className="w-6 h-6" /></Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className=" p-4 space-y-10">
                <ul className="flex flex-col  text-[16px]">
                  <li>Berlin</li>
                  <li>Germany</li>
                </ul>
                <div className="flex flex-col gap-2"> 
                  <address className="not-italic">
                    <ul role="list" className="space-y-[5px]">
                      <li role="listitem">
                        <a 
                          href="tel:+4917620020200" 
                          className="hover:underline"
                          rel="noopener noreferrer"
                          aria-label="Call Michael Friebe"
                        >
                          Phone: +49 176 200 20 200
                        </a>
                      </li>
                      <li role="listitem">
                        <a
                          href="mailto:michael@ziros.com"
                          className="hover:underline"
                          rel="noopener noreferrer"
                          aria-label="Email Michael Friebe"
                        >
                          Email: michael@ziros.com
                        </a>
                      </li>
                    </ul>
                  </address>
                </div>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    </>
  )
}
