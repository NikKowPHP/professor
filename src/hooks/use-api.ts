import { useState, useCallback } from 'react';
import logger from '@/lib/logger';
import axios from 'axios';

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
      const response = await axios({
        url,
        method,
        data: method !== 'GET' ? data : undefined,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      const responseTime = performance.now();
      logger.log(`[${requestId}] Received response in ${responseTime}ms`, {
        status: response.status,
      });

      const responseData = response.data;
      logger.log(`[${requestId}] Request succeeded`, responseData);

      onSuccess?.(responseData);
      return responseData;
    } catch (err) {
      const axiosError = err as any;
      const errorData = axiosError.response?.data || {};
      const status = axiosError.response?.status;
      
      const message = errorData.error || axiosError.message || errorMessage;
      setError(message);
      
      logger.error(`[${requestId}] API Error: ${message}`, {
        url,
        method,
        status,
        errorData
      });
      
      throw new Error(message);
    } finally {
      setLoading(false);
      logger.log(`[${requestId}] Request completed`);
    }
  }, []);

  return { fetchApi, loading, error, setError };
};