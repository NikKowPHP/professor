'use client'

import Link from 'next/link'
import { navigationConfig } from '@/config/navigation'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const isScrolled = window.scrollY > 20
        if (isScrolled !== scrolled) {
          setScrolled(isScrolled)
        }
      }, 100)
    }


    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [scrolled])
  useEffect(() => {
    if (!scrolled) {
      setMobileMenuOpen(false)
    }
  }, [scrolled])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const menu = document.getElementById('mobile-menu')
      const menuButton = document.getElementById('menu-button')

      if (
        menu &&
        !menu.contains(target) &&
        menuButton &&
        !menuButton.contains(target)
      ) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-blur-sm bg-[#FAF8F1] transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-6'
      }`}
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <style jsx global>{`
        [style*='--hover-color']:hover {
          background-color: var(--hover-color) !important;
        }
      `}</style>

      <div className="mx-auto px-[5px] w-full max-w-7xl">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className={`gap-2 self-start font-bold transition-all duration-300 ${
              scrolled ? 'text-[20px]' : 'text-[24px] sm:text-[48px]'
            }`}
            title="Michael Friebe"
            aria-label="Michael Friebe Homepage"
          >
            Michael Friebe
          </Link>

          {/* Mobile menu button - always visible on mobile */}
          <button
            id="menu-button"
            className="md:hidden flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
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
                <ul className="flex flex-col justify-between gap-[5px]">
                  <li>
                 

                      <Link
                         href="/book-a-call"
                        className="transition-colors duration-200 inline-flex items-center  gap-2  px-[8px] py-[4px]"
                        style={
                          {
                            '--hover-color': '#f9a8d4',
                          } as React.CSSProperties
                        }
                      >
                        Book a call
                      <ArrowUpRight className="w-[17px] h-[17px]" />
                        
                      </Link>

                  </li>
                  {navigationConfig.mainNav.map((item) => (
                    <li key={item.href} aria-label={item.title}>
                      <Link
                        href={item.href}
                        className="transition-colors inline-flex items-center  gap-2 duration-200 px-[8px] py-[4px]"
                        style={
                          {
                            '--hover-color': item.color,
                          } as React.CSSProperties
                        }
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-col sm:gap-[5px] justify-between">
                  {navigationConfig.mainNavLinks.map((item) => (
                    <li key={item.href} aria-label={item.title}>
                      <Link
                        href={item.href}
                        className="transition-colors duration-200 inline-flex items-center  gap-2 px-[8px] py-[4px]"
                        style={
                          {
                            '--hover-color': item.color,
                          } as React.CSSProperties
                        }
                      >
                        {item.title}
                        <ArrowUpRight className="w-[17px] h-[17px]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}
        </div>
      </div>

      {/* Backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 h-screen bg-black/50 backdrop-blur-sm z-50 transition-all duration-100"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Combined Offcanvas Menu */}
      <div
        id="offcanvas-menu"
        className={`fixed inset-y-0 right-0 w-[80%] md:w-[320px] h-screen z-[60] bg-[#FAF8F1] shadow-lg transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full">
          <button
            className="absolute top-4 right-4 p-2 bg-opacity-100"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
          <nav className="mt-10 flex flex-col gap-6">
            {/* Mobile-specific content */}
            <div className="md:hidden">
              <Link
                href="/book-a-call"
                className="transition-colors text-lg duration-200 flex items-center w-fit gap-2 px-[8px] py-[4px]"
                style={{ '--hover-color': '#f9a8d4' } as React.CSSProperties}
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a call
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Combined navigation links */}
            {navigationConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors text-lg duration-200 flex items-center w-fit gap-2 px-[8px] py-[4px]"
                style={{ '--hover-color': '#f9a8d4' } as React.CSSProperties}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            {/* External links with arrows */}
            {navigationConfig.mainNavLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors text-lg duration-200 flex items-center w-fit gap-2 px-[8px] py-[4px]"
                style={{ '--hover-color': '#f9a8d4' } as React.CSSProperties}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
