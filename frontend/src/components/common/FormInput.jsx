import React from 'react';

// Komponen ini kita buat agar tidak copy-paste input berulang kali
export default function FormInput({ label, name, value, onChange, placeholder, type = 'text', icon, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {/* Ikon di dalam input */}
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {React.cloneElement(icon, { size: 18 })}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-gray-50 border-gray-200 rounded-lg shadow-sm ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none`}
        />
      </div>
    </div>
  );
}