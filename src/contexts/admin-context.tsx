'use client';

import React,{ createContext, useCallback, useContext, useState } from 'react';
import { useAdminBlogPosts } from '@/hooks/use-admin-blogposts';
import { useApi } from '@/hooks/use-api';
import { QuoteItem } from '@/lib/data/quote-section';
import { YoutubeItem } from '@/lib/data/youtube-section';

type AdminContextType = ReturnType<typeof useAdminBlogPosts> & {
  // Quote Section
  quote: QuoteItem | null;
  getQuote: () => Promise<QuoteItem | undefined>;
  updateQuote: (data: Partial<QuoteItem>) => Promise<QuoteItem>;

  // Youtube Section
  youtube: YoutubeItem | null;
  getYoutube: () => Promise<YoutubeItem | undefined>;
  updateYoutube: (data: Partial<YoutubeItem>) => Promise<YoutubeItem>;

  // Common
  loading: boolean;
  error: string | null;
  clearError: () => void;

  revalidateCache: () => Promise<void>;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const blogPosts = useAdminBlogPosts();
  const { fetchApi, loading, error, setError } = useApi();
  const [quote, setQuote] = useState<QuoteItem | null>(null);
  const [youtube, setYoutube] = useState<YoutubeItem | null>(null);

  // Quote Section
  const getQuote = useCallback(async () => {
    return fetchApi<QuoteItem>({
      url: `/api/quote?t=${new Date().getTime()}`, 
      method: 'GET',
      onSuccess: setQuote,
      errorMessage: 'Failed to fetch quote'
    });
  }, [fetchApi]);

  const updateQuote = useCallback(async (data: Partial<QuoteItem>) => {
    return fetchApi<QuoteItem>({
      url: '/api/quote',
      method: 'PUT',
      data,
      onSuccess: setQuote,
      errorMessage: 'Failed to update quote'
    }).then(result => result || Promise.reject('Update failed'));
  }, [fetchApi]);

  // Youtube Section
  const getYoutube = useCallback(async () => {
    return fetchApi<YoutubeItem>({
      url: `/api/youtube?t=${new Date().getTime()}`,
      method: 'GET',
      onSuccess: setYoutube,
      errorMessage: 'Failed to fetch YouTube data'
    });
  }, [fetchApi]);

  const updateYoutube = useCallback(async (data: Partial<YoutubeItem>) => {
    return fetchApi<YoutubeItem>({
      url: '/api/youtube',
      method: 'PUT',
      data,
      onSuccess: setYoutube,
      errorMessage: 'Failed to update YouTube data'
    }).then(result => result || Promise.reject('Update failed'));
  }, [fetchApi]);

  const revalidateCache = useCallback(async () => {
    await fetchApi({
      url: '/api/admin/revalidate',
      method: 'GET',
      errorMessage: 'Failed to revalidate cache'
    });
  }, [fetchApi]);

  const clearError = () => setError(null);

  return (
    <AdminContext.Provider value={{
      ...blogPosts,
      quote,
      youtube,
      getQuote,
      updateQuote,
      getYoutube,
      updateYoutube,
      loading,
      error,
      clearError,
      revalidateCache
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};