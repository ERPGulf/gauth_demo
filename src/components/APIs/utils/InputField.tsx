import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void; // Optional for editable input
}

const InputField: React.FC<InputFieldProps> = ({ label, value, type = "text", placeholder, readOnly = true, onChange }) => {
  return (
    <div className="mb-6 sm:mb-8">
      <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={readOnly ? undefined : (e) => onChange?.(e.target.value)} // Handle change only if editable
        className={`w-full p-3 sm:p-4 border border-gray-800 rounded-lg text-gray-800 focus:outline-none 
          ${readOnly ? "bg-gray-100 cursor-not-allowed" : "focus:ring-2 focus:ring-blue-500"}`}
      />
    </div>
  );
};

export default InputField;
