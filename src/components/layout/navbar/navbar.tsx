'use client'

import Link from 'next/link'
import { navigationConfig } from '@/config/navigation'
import { ArrowUpRight } from 'lucide-react'

export function Navbar() {

  return (
    <header 
      className="sticky top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-blur-sm bg-[#FAF8F1] border border-blue-500"
      itemScope 
      itemType="https://schema.org/WPHeader"
    >
      <div className=" mx-auto px-[5px] sm:py-[20px] w-full max-w-7xl border border-blue-500">
        <div className="flex justify-between ">
          <Link 
            href="/" 
            className=" gap-2 text-[24px] sm:text-[48px] font-bold"
            title="Michael Friebe"
            aria-label="Michael Friebe Homepage"
          >
            Michael Friebe
          </Link>

          <nav 
            className="hidden md:flex  sm:gap-[100px] border border-blue-500"
            aria-label="Main navigation"
            itemScope 
            itemType="https://schema.org/SiteNavigationElement"
          >
            <ul className="flex flex-col  gap-[5px] border border-red-500">
            <li>
              <Link href="/book-a-call" className="flex items-center gap-2"> 
                Book a call
                <ArrowUpRight className="w-6 h-6" />
              </Link>
            </li>
            {navigationConfig.mainNav.map((item) =>
              <li
              key={item.href}
              aria-label={item.title}
              >
              <Link href={item.href}>
                {item.title}
              </Link>
            </li>
            )}
           
            </ul>


            <ul className="flex flex-col  gap-[5px] border border-red-500">
            {navigationConfig.mainNavLinks.map((item) =>
            <li
            key={item.href}
            aria-label={item.title}
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
