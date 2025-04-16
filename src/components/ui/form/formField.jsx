"use client";

import React from "react";

export default function FormField({
  label,
  id,
  error,
  type = "text",
  autoComplete,
  ...props
}) {

  const getAutoCompleteValue = () => {
    if (autoComplete) return autoComplete;
    
    if (type === "password") {
      if (id === "confirmPassword" || id === "newPassword") return "new-password";
      return "current-password";
    }
    if (type === "email") return "username";
    return undefined; 
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={getAutoCompleteValue()}
        className="w-full p-2 border rounded focus-green"
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}