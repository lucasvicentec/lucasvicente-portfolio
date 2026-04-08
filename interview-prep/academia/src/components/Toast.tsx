import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export default function Toast({ message, type = "info", onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors: Record<string, string> = {
    success: "#22c55e",
    error: "#ef4444",
    info: "#6c63ff",
  };

  return (
    <div
      className="toast"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        background: colors[type] || colors.info,
        color: "white",
        padding: "14px 24px",
        borderRadius: "10px",
        fontSize: "14px",
        fontWeight: 600,
        zIndex: 9999,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        animation: "slideUp 0.3s ease",
      }}
    >
      {message}
    </div>
  );
}
