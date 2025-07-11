"use client";

import React from "react";

export default function FormField({
  label,
  id,
  error,
  type = "text",
  autoComplete,
  options = [], 
  placeholder,
  rows = 3, 
  disabled = false,
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

  const renderInput = () => {
    // Textarea
    if (type === "textarea") {
      return (
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={getAutoCompleteValue()}
          className="w-full p-2 border rounded focus-green resize-vertical"
          {...props}
        />
      );
    }

    // Select
    if (type === "select") {
      return (
        <select
          id={id}
          disabled={disabled}
          className="w-full p-2 border rounded focus-green"
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    // Input par défaut
    return (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={getAutoCompleteValue()}
        className="w-full p-2 border rounded focus-green"
        {...props}
      />
    );
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      {renderInput()}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}