
import axios from "axios";
import { refreshAccessToken, logout } from "@/common/utils/auth";

const apiClient = axios.create({
  baseURL: "https://webapiorg.easetrackwms.com/api/v1",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  let warehouseId = "001";
  
  try {
    const raw = localStorage.getItem("selectedWarehouse");
    if (raw?.startsWith("{")) {
      const parsed = JSON.parse(raw);
      warehouseId = parsed?.id || "001";
    } else {
      warehouseId = raw || "001";
    }
  } catch {
    warehouseId = "001";
  }

  if (token) {
    // Use proper way to set headers in Axios v1.x
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["x-location"] = warehouseId;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // หากเกิด error 401 และยังไม่เคย retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const success = await refreshAccessToken();
        if (success) {
          const newToken = localStorage.getItem("accessToken");
          if (newToken) {
            // Use proper way to set Authorization header
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
      }

      // หาก refresh ไม่สำเร็จ
      logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
