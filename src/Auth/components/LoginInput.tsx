// src/Auth/components/Input.tsx
import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string; // Ensure id is always provided for label association
  register: UseFormRegisterReturn; // From react-hook-form
  error?: FieldError; // Optional error object from react-hook-form
}

export default function Input({label, id, register, error, type = 'text', ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register}
        {...rest}
        className={`block p-2 w-full rounded-md border-gray-300 shadow-sm  sm:text-sm ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '' // Add red border on error
        }`}
      />
      {/* Display validation error message */}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}
