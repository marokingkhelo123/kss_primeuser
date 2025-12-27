import axios from "axios";

// Get API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

/**
 * Centralized API utility function for making HTTP requests
 * @param {Object} config - Request configuration
 * @param {string} config.endpoint - API endpoint (e.g., '/users/login')
 * @param {string} config.method - HTTP method (get, post, put, delete, patch)
 * @param {Object} config.data - Request body data
 * @param {Object} config.headers - Additional headers
 * @param {Object} config.params - Query parameters (for GET requests)
 * @returns {Promise} Axios response
 */
export const apiRequest = async ({
  endpoint,
  method = "get",
  data = null,
  headers = {},
  params = null,
}) => {
  // Build full URL
  const url = `${API_BASE_URL}${endpoint}`;

  // Default headers
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  // Request configuration
  const config = {
    method: method.toLowerCase(),
    url,
    headers: defaultHeaders,
    ...(data && { data }),
    ...(params && { params }),
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    // Re-throw error to be handled by caller
    throw error;
  }
};

/**
 * Health check function to verify backend connection
 * Safely checks server availability without exposing sensitive data
 * @returns {Promise<boolean>} True if backend is healthy, false otherwise
 */
export const checkHealth = async () => {
  try {
    // Use login endpoint with GET method (will return 405 Method Not Allowed)
    // This is safe - it doesn't expose any data, just confirms server is responding
    // 405 means server is up and route exists, just wrong HTTP method
    const response = await axios.get(`${API_BASE_URL}/users/login`, {
      timeout: 5000,
      validateStatus: (status) => status < 500, // Accept 2xx, 3xx, 4xx as "server is responding"
    });
    // If we get any response, server is up
    return true;
  } catch (error) {
    // Check if it's a network/connection error (server is down)
    if (
      error.code === 'ECONNREFUSED' || 
      error.code === 'ETIMEDOUT' || 
      error.code === 'ENOTFOUND' ||
      error.message?.includes('timeout') ||
      error.message?.includes('Network Error') ||
      !error.response
    ) {
      // No response means server is not reachable
      return false;
    }
    
    // If we got an error response (error.response exists), the server IS responding
    // 404, 405, 401, etc. (4xx) means server is up but route/method/auth issue - that's fine!
    // 405 Method Not Allowed is perfect - means server is up and route exists
    // 5xx means server error but server is still up
    const status = error.response?.status;
    if (status) {
      // Any HTTP status code (including 405) means server is responding
      return true;
    }
    
    // If no status, it's a network error
    return false;
  }
};

/**
 * Convenience methods for different HTTP verbs
 */
export const api = {
  get: (endpoint, params = null, headers = {}) =>
    apiRequest({ endpoint, method: "get", params, headers }),
  post: (endpoint, data = null, headers = {}) =>
    apiRequest({ endpoint, method: "post", data, headers }),
  put: (endpoint, data = null, headers = {}) =>
    apiRequest({ endpoint, method: "put", data, headers }),
  patch: (endpoint, data = null, headers = {}) =>
    apiRequest({ endpoint, method: "patch", data, headers }),
  delete: (endpoint, headers = {}) =>
    apiRequest({ endpoint, method: "delete", headers }),
};

