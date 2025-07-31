import { useState, useCallback } from "react";

const STORAGE_KEY = "access_token";
const BACKEND = import.meta.env.VITE_BACKEND_URL;

export function useAuth() {
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem(STORAGE_KEY)
  );
  const [error, setError] = useState(null);

  const loginWithGoogle = useCallback(async (idToken) => {
    setError(null);
    try {
      const res = await fetch(`${BACKEND}/api/auth/google-login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: idToken }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || `Status ${res.status}`);
      }
      const data = await res.json();
      if (!data.access) throw new Error("No access token returned");
      localStorage.setItem(STORAGE_KEY, data.access);
      setAccessToken(data.access);
    } catch (e) {
      setError(e.message);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAccessToken(null);
    setError(null);
  }, []);

  return { accessToken, error, loginWithGoogle, logout, clearError: () => setError(null) };
}
