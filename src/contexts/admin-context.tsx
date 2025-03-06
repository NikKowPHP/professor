'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { useAdminBlogPosts } from '@/hooks/use-admin-blogposts';
import { useApi } from '@/hooks/use-api';
import { QuoteItem } from '@/lib/data/quote-section';
import { YoutubeItem } from '@/lib/data/youtube-section';
import axios from 'axios';

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
    try {
      const timestamp = new Date().getTime(); // Cache-busting parameter
      const response = await axios.get(`/api/quote?t=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      const data = response.data;
      setQuote(data);
      return data;
    } catch (error) {
      setError('Failed to fetch quote');
      throw error;
    }
  }, [setError]);

  const updateQuote = useCallback(async (data: Partial<QuoteItem>) => {
    try {
      const response = await axios.put('/api/quote', data, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      const result = response.data;
      setQuote(result);
      return result;
    } catch (error) {
      setError('Failed to update quote');
      throw error;
    }
  }, [setError]);

  // Youtube Section
  const getYoutube = useCallback(async () => {
    return fetchApi<YoutubeItem>({
      url: '/api/youtube',
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