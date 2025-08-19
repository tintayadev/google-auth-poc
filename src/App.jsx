import { useEffect, useRef } from "react";
import { Protected } from "./components/Protected";
import { GoogleLoginButton } from "./components/GoogleLoginButton";
import { ErrorBanner } from "./components/ErrorBanner";
import { useAuth } from "./hooks/useAuth";

const BACKEND = import.meta.env.VITE_BACKEND_URL;
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_SCOPES = "read:user user:email";

function App() {
  const { accessToken, error, loginWithGoogle, loginWithGithub, logout, clearError } = useAuth();
  const handledRef = useRef(false);

  const REDIRECT_URI = `${BACKEND}/accounts/github/callback/`;
  const githubAuthorizeUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${encodeURIComponent(GITHUB_CLIENT_ID)}` +
    `&redirect_uri=${encodeURIComponent(`${BACKEND}/accounts/github/callback/`)}` +
    `&scope=${encodeURIComponent(GITHUB_SCOPES)}`;

  useEffect(() => {
    if (handledRef.current) return;
    const url = new URL(window.location.href);
    if (url.pathname === "/accounts/github/callback/") {
      const code = url.searchParams.get("code");
      if (code) {
        handledRef.current = true;
        window.history.replaceState({}, "", "/");
        (async () => { await loginWithGithub(code); })();
      }
    }
  }, [loginWithGithub]);

  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <h1>Auth POC</h1>

      <ErrorBanner message={error} onClose={clearError} />

      {!accessToken && (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <GoogleLoginButton onToken={loginWithGoogle} />
          <a href={githubAuthorizeUrl}><button>Login with GitHub</button></a>
        </div>
      )}

      {accessToken && (
        <Protected>
          <div>
            <h2>Protected Area</h2>
            <p>JWT:</p>
            <pre style={{ background: "#f1f5f9", padding: 8, color: "#0d2237ff" }}>
              {accessToken}
            </pre>
            <button onClick={logout}>Logout</button>
          </div>
        </Protected>
      )}
    </div>
  );
}

export default App;