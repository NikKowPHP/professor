'use client'

import Link from 'next/link'
import { navigationConfig } from '@/config/navigation'
import { useTranslations } from 'next-intl'
import { ArrowUpRight } from 'lucide-react'

export function Navbar() {
  const t = useTranslations('navigation')

  return (
    <header 
      className="sticky  left-0 right-0 z-50 bg-[#F7F7F7] bg-opacity-80 backdrop-blur-sm bg-[#FAF8F1] border border-blue-500"
      itemScope 
      itemType="https://schema.org/WPHeader"
    >
      <div className=" mx-auto px-[5px]">
        <div className="flex  items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2"
            title="ZIRO - Web Design & Development Agency"
            aria-label="ZIRO Homepage"
          >
            Michael Friebe
          </Link>

          <nav 
            className="hidden md:flex items-center gap-8 border border-blue-500"
            aria-label="Main navigation"
            itemScope 
            itemType="https://schema.org/SiteNavigationElement"
          >
            <ul className="flex flex-col items-center gap-2 border border-red-500">
            {navigationConfig.mainNav.map((item) =>
              <li
              key={item.href}
              aria-label={t(item.title)}
              >
              <Link href={item.href}>
                {item.title}
              </Link>
            </li>
            )}
            </ul>


            <ul className="flex flex-col items-center gap-2 border border-red-500">
            {navigationConfig.mainNavLinks.map((item) =>
            <li
            key={item.href}
            aria-label={t(item.title)}
            >
              <Link href={item.href} className="flex items-center gap-2">
                {item.title}
                <ArrowUpRight className="w-6 h-6" />
              </Link>
            </li>
            )}
            </ul>
          </nav>

        </div>
      </div>
    </header>
  )
}
