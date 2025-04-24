
import axios from "axios";
import { refreshAccessToken, logout } from "@/utils/auth";

const apiClient = axios.create({
  baseURL: "https://webapiorg.easetrackwms.com/api/v1",
});

// Re-export the existing API client configuration
export default apiClient;
