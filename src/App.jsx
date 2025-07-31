import { Protected } from "./components/Protected";
import { GoogleLoginButton } from "./components/GoogleLoginButton";
import { ErrorBanner } from "./components/ErrorBanner";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { accessToken, error, loginWithGoogle, logout, clearError } = useAuth();

  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <h1>Google Login POC</h1>

      <ErrorBanner message={error} onClose={clearError} />

      {!accessToken && <GoogleLoginButton onToken={loginWithGoogle} />}

      {accessToken && (
        <Protected>
          <div>
            <h2>Protected Area</h2>
            <p>JWT:</p>
            <pre style={{ background: "#f1f5f9", padding: 8, color: "#0d2237ff"}}>{accessToken}</pre>
            <button onClick={logout}>Logout</button>
          </div>
        </Protected>
      )}
    </div>
  );
}

export default App;
