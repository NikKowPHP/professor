'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'navbar' | 'modal' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  isActive?: boolean
  isFullWidth?: boolean
  href?: string
  target?: string
}

const buttonStyles = {
  base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    primary: 'bg-green-700 text-white hover:bg-green-800 active:bg-green-900',
    secondary: 'bg-gray-500 text-white hover:bg-gray-400 active:bg-gray-300',
    outline: 'border-2 border-green text-green hover:bg-green/5 active:bg-green/10',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
    success: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700',
    ghost: (isActive: boolean) =>
      isActive
        ? 'bg-[#0066FF] text-white'
        : 'text-gray-700 hover:text-gray-900 active:bg-gray-200',
    white: 'bg-white text-black hover:bg-white/90 active:bg-white/80',
    navbar: 'text-[16px] font-medium transition-colors text-gray-900',
    modal: 'bg-primary text-white hover:bg-[#0066FF]/90 active:bg-[#0066FF]/80',
  },
  sizes: {
    sm: 'py-[2px] px-[12px] text-[15px] ',
    md: 'p-[10px] text-[16px] ',
    lg: 'p-[10px] text-[18px] ',
    xl: 'h-[72px] px-12 text-[20px] rounded-full w-full',
    full: 'w-full px-4 py-8 rounded-lg ',
  
  },
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isActive,
      isFullWidth,
      href,
      target,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      buttonStyles.base,
      isFullWidth && 'w-full',
      variant === 'ghost'
        ? buttonStyles.variants.ghost(!!isActive)
        : buttonStyles.variants[variant],
      buttonStyles.sizes[size],
      className
    )

    if (href) {
      return (
        <Link
          href={href}
          target={target}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {props.children}
        </Link>
      )
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

