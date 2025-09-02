import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CYBER_STORE = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

CYBER_STORE.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/")
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        await axios.post(
          `${BASE_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );
        // Retry the original request
        return CYBER_STORE(originalRequest);
      } catch (refreshError) {
        // Refresh failed, handle logout or redirect
        console.log("Token refresh failed. User might be logged out.");
        // Optionally, you can redirect to login or show a message

        return Promise.reject(
          refreshError instanceof Error
            ? refreshError
            : new Error(String(refreshError)),
        );
      }
    }
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error)),
    );
  },
);

export default CYBER_STORE;
