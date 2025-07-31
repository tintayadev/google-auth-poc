export function ErrorBanner({ message, onClose }) {
  if (!message) return null;
  return (
    <div style={{ background: "#f8d7da", padding: 8, marginBottom: 8 }}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} style={{ marginLeft: 10 }}>
          x
        </button>
      )}
    </div>
  );
}
