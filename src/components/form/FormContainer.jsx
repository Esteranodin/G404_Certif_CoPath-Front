import React from "react";

export default function FormContainer({ 
  title, 
  subtitle, 
  children,
  footer,
  className = "", 
}) {
  return (
    <section className={`w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md ${className}`}>
      {title && (
        <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
      )}
      {subtitle && (
        <h3 className="mb-6 text-center text-gray-600">{subtitle}</h3>
      )}
      {children}
      {footer && (
        <div className="mt-4 text-center">
          {footer}
        </div>
      )}
    </section>
  );
}