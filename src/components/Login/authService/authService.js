import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ;
const REFRESH_URL = `${BASE_URL}/api/User/Login`;

export const refreshToken = async () => {
  const refresh_token =
    localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");

  if (!refresh_token) return null;

  try {
    const res = await axios.post(
      REFRESH_URL,
      { grant_type: "refresh_token", refresh_token },
      { headers: { "Content-Type": "application/json" }, timeout: 10000 }
    );

    if (res.data.error === "200") {
      const storage =
        localStorage.getItem("remember_me") === "true" ? localStorage : sessionStorage;

      storage.setItem("access_token", res.data.access_token);
      storage.setItem("refresh_token", res.data.refresh_token);

      return res.data.access_token;
    } else {
      console.error("Refresh failed:", res.data.error_description || "Unknown error");
      return null;
    }
  } catch (err) {
    console.error("Token refresh error:", err);
    return null;
  }
};
