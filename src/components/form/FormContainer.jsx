import React from "react";

export default function FormContainer({ 
  title, 
  children,
  description, 
  footer 
}) {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
      {description && (
        <p className="mb-4 text-center">{description}</p>
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