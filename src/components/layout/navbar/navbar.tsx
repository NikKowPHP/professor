'use client'

import Link from 'next/link'
import { navigationConfig } from '@/config/navigation'
import { ArrowUpRight, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-blur-sm bg-[#FAF8F1] transition-all duration-300 ${scrolled ? 'py-2' : 'py-6'}`}
      itemScope 
      itemType="https://schema.org/WPHeader"
    >
      <div className="mx-auto px-[5px] w-full max-w-7xl">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className={`gap-2 font-bold transition-all duration-300 ${scrolled ? 'text-[20px]' : 'text-[24px] sm:text-[48px]'}`}
            title="Michael Friebe"
            aria-label="Michael Friebe Homepage"
          >
            Michael Friebe
          </Link>

          {scrolled ? (
            <button className="md:flex hidden" aria-label="Menu">
              <Menu className="w-6 h-6" />
            </button>
          ) : (
            <nav 
              className="hidden md:block transition-opacity duration-300"
              aria-label="Main navigation"
              itemScope 
              itemType="https://schema.org/SiteNavigationElement"
            >
              <div className="flex sm:gap-[100px]">
                <ul className="flex flex-col gap-[5px]">
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

                <ul className="flex flex-col gap-[5px]">
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
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
