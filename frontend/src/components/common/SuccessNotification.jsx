import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function SuccessNotification({ message, onClose }) {
  // Otomatis tutup setelah 3 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
      <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]">
        <CheckCircle className="text-green-600" size={20} />
        <div className="flex-1">
          <h4 className="font-bold text-sm">Success!</h4>
          <p className="text-sm text-green-700">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-green-600 hover:text-green-800 transition"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}