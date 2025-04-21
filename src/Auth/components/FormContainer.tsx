// src/Auth/components/FormContainer.tsx
import React from 'react';

interface FormContainerProps {
  children: React.ReactNode; // The actual form fields and buttons
  title?: string; // Optional title to display above the form
}

export default function FormContainer({ children, title }: FormContainerProps) {
  return (
    <div className="w-full rounded-lg bg-white p-8 shadow-md"> {/* Added shadow-md for subtle depth */}
      {/* Optional Title Area */}
      {title && (
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          {title} 
        </h2>
      )}

      {/* Form Content Area */}
      <div className="space-y-6"> {/* Adds vertical spacing between children elements */}
        {children}
      </div>
    </div>
  );
}
