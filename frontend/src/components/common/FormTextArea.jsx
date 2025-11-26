import React from 'react';

// Komponen ini untuk deskripsi, tanggung jawab, dll.
export default function FormTextarea({ label, name, value, onChange, placeholder, rows = 4, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-gray-50 border-gray-200 rounded-lg shadow-sm p-4 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
      />
    </div>
  );
}