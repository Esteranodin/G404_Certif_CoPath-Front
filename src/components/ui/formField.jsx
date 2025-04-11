"use client";

import React from "react";

export default function FormField({
  label,
  id,
  error,
  type = "text",
  ...props
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full p-2 border rounded focus-green"
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}