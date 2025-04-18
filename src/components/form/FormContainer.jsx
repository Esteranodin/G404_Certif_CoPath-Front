import React from "react";

export default function FormContainer({ 
  title, 
  description ="", 
  children,
  footer,
  className = "", 
}) {
  return (
    <div className={`w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md ${className}`}>
      {title && (
        <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
      )}
      {description && (
        <p className="mb-4 text-center text-gray-600">{description}</p>
      )}
      {children}
      {footer && (
        <div className="mt-4 text-center">
          {footer}
        </div>
      )}
    </div>
  );
}