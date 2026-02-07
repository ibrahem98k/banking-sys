import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://kzcajtqhoz.a.pinggy.link';

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Refresh token is sent in body, not cookies
});

// Request interceptor - attach access token and handle FormData
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // If the data is FormData, remove Content-Type header to let axios set it with boundary
    if (config.data instanceof FormData) {
      if (config.headers) {
        // Remove the default application/json Content-Type
        // Axios will automatically set multipart/form-data with boundary for FormData
        if ('Content-Type' in config.headers) {
          delete config.headers['Content-Type'];
        }
        if ('content-type' in config.headers) {
          delete config.headers['content-type'];
        }
      }
      
      // Log in development for debugging
      if (import.meta.env.DEV) {
        console.log('Sending FormData request to:', config.url);
        console.log('Headers:', config.headers);
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401 and refresh token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    if (import.meta.env.DEV) {
      console.log('API Response:', response.config.method?.toUpperCase(), response.config.url, response.status, response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    // Don't log 404 errors for account-related endpoints as errors - they're expected for new users
    const errorData = error.response?.data as any;
    const accountRelatedEndpoints = [
      '/api/accounts/me',
      '/api/accounts/me/cards',
      '/api/dashboard',
      '/api/transactions',
      '/api/cards'
    ];
    
    const isAccountNotFound = error.response?.status === 404 && 
      accountRelatedEndpoints.some(endpoint => error.config?.url?.includes(endpoint)) &&
      (errorData?.message?.toLowerCase()?.includes('account not found') ||
       errorData?.message?.toLowerCase()?.includes('not approved yet'));
    
    // Log errors for debugging (skip expected 404s)
    if (import.meta.env.DEV && !isAccountNotFound) {
      console.error('API Error:', error.config?.method?.toUpperCase(), error.config?.url, error.response?.status, error.response?.data);
    }
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers && token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        // No refresh token, logout user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiresAt');
        localStorage.removeItem('refreshTokenExpiresAt');
        processQueue(error, null);
        isRefreshing = false;
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const apiResponse = response.data as { success: boolean; data?: { token: string; refreshToken: string; tokenExpiresAt: string; refreshTokenExpiresAt: string } };

        if (apiResponse.success && apiResponse.data) {
          localStorage.setItem('accessToken', apiResponse.data.token);
          localStorage.setItem('refreshToken', apiResponse.data.refreshToken);
          localStorage.setItem('tokenExpiresAt', apiResponse.data.tokenExpiresAt);
          localStorage.setItem('refreshTokenExpiresAt', apiResponse.data.refreshTokenExpiresAt);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${apiResponse.data.token}`;
          }

          processQueue(null, apiResponse.data.token);
        } else {
          throw new Error('Refresh token failed');
        }
        isRefreshing = false;

        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiresAt');
        localStorage.removeItem('refreshTokenExpiresAt');
        processQueue(refreshError as AxiosError, null);
        isRefreshing = false;
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
