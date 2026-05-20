import axios, { type AxiosRequestConfig } from 'axios';
import config from '@/config';

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

// Request interceptor - cookies are automatically sent with credentials: true
axiosInstance.interceptors.request.use(
  function (config) {
    // Tokens are sent via httpOnly cookies automatically
    // No need to manually add Authorization header
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
let isRefreshing = false;
let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });
  pendingQueue = [];
};

const handleLogout = () => {
  // Tokens are cleared by backend (httpOnly cookies)
  // Just redirect to login
  window.location.href = '/login';
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry: boolean;
    };

    // Handle authentication errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      handleLogout();
      return Promise.reject(error);
    }

    // * For everything means for every reject
    if (
      error.response?.status === 500 &&
      error.response?.data?.message === 'jwt expired' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }
      isRefreshing = true;
      try {
        await axiosInstance.post('/auth/refresh-token');
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err);
        handleLogout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
