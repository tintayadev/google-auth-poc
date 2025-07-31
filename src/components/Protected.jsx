import React from "react";

export function Protected({ children }) {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return (
      <div style={{ padding: 20, fontFamily: "system-ui" }}>
        <p>Unauthorized. Please log in with Google first.</p>
      </div>
    );
  }
  return <>{children}</>;
}
