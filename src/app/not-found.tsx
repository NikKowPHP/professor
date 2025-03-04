'use client';
import { Link } from '@/i18n';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4">
      <div className="max-w-xl text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-900 animate-pulse">404</h1>
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Page not found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist.
        </p>
        <div className="text-sm text-gray-500 mb-8">
          Requested path: {pathname}
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

export const dynamic = 'force-static'; 