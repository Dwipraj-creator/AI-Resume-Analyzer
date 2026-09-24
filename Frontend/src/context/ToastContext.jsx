import { createContext, useCallback, useContext, useState } from "react";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";

const ToastContext = createContext(null);

let idCounter = 0;

const tone = {
  success: { icon: FiCheckCircle, color: "#5FD3A0" },
  error: { icon: FiAlertCircle, color: "#FF5D5D" },
  info: { icon: FiInfo, color: "#FF8A3D" },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "info", duration = 4000) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      if (duration) {
        setTimeout(() => removeToast(id), duration);
      }
      return id;
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}

      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-full max-w-sm px-4 sm:px-0 pointer-events-none">
        {toasts.map(({ id, message, type }) => {
          const { icon: Icon, color } = tone[type] || tone.info;
          return (
            <div
              key={id}
              className="animate-slideInUp pointer-events-auto flex items-start gap-3 rounded-md bg-[#14171A] border border-[#262B30] p-4"
              style={{ borderLeftColor: color, borderLeftWidth: 2 }}
            >
              <Icon size={17} style={{ color }} className="mt-0.5 shrink-0" />
              <p className="text-sm text-[#E8E6E1] flex-1">{message}</p>
              <button
                onClick={() => removeToast(id)}
                className="text-[#4A5158] hover:text-[#7A828A] transition-colors shrink-0"
                aria-label="Dismiss"
              >
                <FiX size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
};