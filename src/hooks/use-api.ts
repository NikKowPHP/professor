import { useState, useCallback } from 'react';
import logger from '@/lib/logger';

type ApiRequest<T> = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  onSuccess?: (data: T) => void;
  errorMessage?: string;
};

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApi = useCallback(async <T>({
    url,
    method,
    data,
    onSuccess,
    errorMessage = 'Request failed'
  }: ApiRequest<T>): Promise<T | undefined> => {
    setLoading(true);
    setError(null);
    
    const requestId = Math.random().toString(36).substr(2, 9); // Unique ID for tracking
    logger.log(`[${requestId}] Starting ${method} request to ${url}`, data);

    try {
      const response = await fetch(url, {
        method,
        headers: method !== 'GET' ? { 'Content-Type': 'application/json' } : undefined,
        body: method !== 'GET' ? JSON.stringify(data) : undefined,
        cache: 'no-store'
      });

      const responseTime = performance.now();
      logger.log(`[${requestId}] Received response in ${responseTime}ms`, {
        status: response.status,
        ok: response.ok
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.error || errorMessage);
        logger.error(`[${requestId}] API Error: ${error.message}`, {
          url,
          method,
          status: response.status,
          errorData
        });
        throw error;
      }

      const responseData = await response.json();
      logger.log(`[${requestId}] Request succeeded`, responseData);

      onSuccess?.(responseData);
      return responseData;
    } catch (err) {
      const message = err instanceof Error ? err.message : errorMessage;
      setError(message);
      logger.error(`[${requestId}] Unhandled error: ${message}`, err);
      throw err;
    } finally {
      setLoading(false);
      logger.log(`[${requestId}] Request completed`);
    }
  }, []);

  return { fetchApi, loading, error, setError };
};