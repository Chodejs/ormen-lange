import { useState, createContext, useContext, useCallback, useEffect } from 'react';
import './Toast.css'; // Don't forget to create this file next!

// --------------------------------------------------------------------------
// PART 1: THE CONTEXT & HOOK
// --------------------------------------------------------------------------
const ToastContext = createContext();

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// --------------------------------------------------------------------------
// PART 2: THE PROVIDER
// --------------------------------------------------------------------------
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
  // Generates a unique string like "36b8f84d-df4e-4d49..."
  const id = crypto.randomUUID(); 
  
  setToasts((prev) => [...prev, { id, message, type, duration }]);
}, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

// --------------------------------------------------------------------------
// PART 3: THE VISUALS (The bit you were missing!)
// --------------------------------------------------------------------------
function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={crypto.randomUUID()} {...toast} removeToast={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ id, message, type, duration, removeToast }) {
  // Auto-dismiss logic
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, removeToast]);

  return (
    <div className={`toast toast-${type}`} onClick={() => removeToast(id)}>
      {message}
    </div>
  );
}