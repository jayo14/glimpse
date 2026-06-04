import axios from 'axios';

// Safely get token from localStorage
export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

// Safely set or remove token in localStorage
export const setAccessToken = (token: string | null) => {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  }
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api/v1',
  withCredentials: true, // Allows httpOnly cookies to pass back and forth
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Avoid infinite loop if the refresh endpoint itself returns a 401
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        // Request a new access token using the httpOnly cookie automatically attached by the browser
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api/v1'}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { access_token } = response.data;
        setAccessToken(access_token);

        // Re-run original failed request with updated token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token expired or cleared -> Clear localStorage and force logout redirect
        setAccessToken(null);
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);