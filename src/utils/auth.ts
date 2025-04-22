/**
 * Authentication utilities for API requests
 */

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: string;
}

export interface Location {
  id: string;
  name: string;
  isDefault: boolean | null;
  address?: string;
  inventory?: string | number;
}

// The remaining functions remain unchanged

/**
 * Get current authentication tokens from localStorage
 */
export const getAuthTokens = (): AuthTokens | null => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const expiresAt = localStorage.getItem("tokenExpiry");

  if (!accessToken || !refreshToken || !expiresAt) {
    return null;
  }

  return { accessToken, refreshToken, expiresAt };
};

/**
 * Check if the current access token is expired
 */
export const isTokenExpired = (): boolean => {
  const tokens = getAuthTokens();
  if (!tokens) return true;

  const expiryDate = new Date(tokens.expiresAt);
  // Add a buffer of 30 seconds to prevent edge cases
  return expiryDate.getTime() - 30000 < Date.now();
};

export const checkAuth = async (): Promise<boolean> => {
  if (isTokenExpired()) {
    try {
      return await refreshAccessToken();
    } catch (error) {
      logout();
      return false;
    }
  }
  return !!getAuthTokens();
};

/**
 * Refresh the access token using the refresh token
 */
export const refreshAccessToken = async (): Promise<boolean> => {
  const tokens = getAuthTokens();
  if (!tokens) return false;

  try {
    const response = await fetch(
      "https://webapiorg.easetrackwms.com/api/Auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          username: "",
          password: "",
          grantType: "refresh_token",
          audience: "string",
          serialNo: "string",
          refreshToken: tokens.refreshToken,
        }),
      }
    );

    if (!response.ok) {
      // If refresh token is invalid, log out the user
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("currentUser");
      return false;
    }

    const authData: AuthResponse = await response.json();

    // Update tokens in localStorage
    localStorage.setItem("accessToken", authData.access_token);
    localStorage.setItem("refreshToken", authData.refresh_token);
    localStorage.setItem("tokenExpiry", authData.expires_at);

    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
};

/**
 * Make an authenticated API request with token refresh handling
 */
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  // Check if token is expired and refresh if needed
  if (isTokenExpired()) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) {
      throw new Error("Authentication expired. Please log in again.");
    }
  }

  // Get tokens after potential refresh
  const tokens = getAuthTokens();
  if (!tokens) {
    throw new Error("Not authenticated");
  }

  // Add authorization header
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${tokens.accessToken}`,
  };

  // Make the request
  return fetch(url, {
    ...options,
    headers,
  });
};

/**
 * Fetch all locations from the API
 */
export const fetchLocations = async (): Promise<Location[]> => {
  try {
    const response = await authenticatedFetch(
      "https://webapiorg.easetrackwms.com/api/Auth/GetLocation/all",
      {
        method: "GET",
        headers: {
          accept: "*/*",
          "x-location": "1",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch locations");
    }

    const locations: Location[] = await response.json();
    return locations;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

// เพิ่มฟังก์ชันตรวจสอบ warehouse
export const hasSelectedWarehouse = (): boolean => {
  return !!localStorage.getItem("selectedWarehouse");
};

/**
 * Log out the user by clearing the stored tokens and redirecting to login
 */
export const logout = (): void => {
  [
    "accessToken",
    "refreshToken",
    "tokenExpiry",
    "isAuthenticated",
    "currentUser",
    "selectedWarehouse",
  ].forEach((item) => {
    localStorage.removeItem(item);
  });

  // Redirect to login page
  window.location.href = "/login";
};
