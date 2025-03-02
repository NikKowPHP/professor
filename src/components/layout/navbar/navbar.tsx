'use client'

import Link from 'next/link'
import { navigationConfig } from '@/config/navigation'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const isScrolled = window.scrollY > 20;
        if (isScrolled !== scrolled) {
          setScrolled(isScrolled);
        }
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [scrolled])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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

          {/* Mobile menu button - always visible on mobile */}
          <button 
            className="md:hidden flex items-center justify-center" 
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 transition-transform duration-300 ease-in-out" />
            ) : (
              <Menu className="w-6 h-6 transition-transform duration-300 ease-in-out" />
            )}
          </button>

          {/* Desktop menu button - only when scrolled */}
          {scrolled ? (
            <button 
              className="hidden md:flex" 
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
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

          {/* Mobile Menu Overlay */}
          <div 
            className={`fixed inset-0 bg-[#FAF8F1] z-40 transform transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } md:hidden`}
          >
            <div className="flex flex-col h-full p-6 pt-24">
              <nav 
                className="flex-1 overflow-y-auto"
                aria-label="Mobile navigation"
              >
                <div className="flex flex-col gap-8">
                  <ul className="flex flex-col gap-4">
                    <li className="text-2xl font-medium">
                      <Link 
                        href="/book-a-call" 
                        className="flex items-center gap-2"
                        onClick={() => setMobileMenuOpen(false)}
                      > 
                        Book a call
                        <ArrowUpRight className="w-6 h-6" />
                      </Link>
                    </li>
                    {navigationConfig.mainNav.map((item) =>
                      <li
                        key={item.href}
                        className="text-2xl font-medium"
                      >
                        <Link 
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </li>
                    )}
                  </ul>

                  <ul className="flex flex-col gap-4">
                    {navigationConfig.mainNavLinks.map((item) =>
                      <li
                        key={item.href}
                        className="text-2xl font-medium"
                      >
                        <Link 
                          href={item.href} 
                          className="flex items-center gap-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.title}
                          <ArrowUpRight className="w-6 h-6" />
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
