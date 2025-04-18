import { Label } from "./label";
import { Textarea } from "./textarea";

export default function FormField({
  label,
  id,
  type = "text",
  error,
  disabled = false,
  icon: Icon = null,
  autoComplete,
  className = "",
  placeholder = "",
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
    <>
      {label && (
        <Label htmlFor={id} className="mb-2">
          {label}
        </Label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}

        {type === "textarea" ? (
          <Textarea
            id={id}
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={error ? "true" : "false"}
            className={`${Icon ? "pl-10" : ""} ${className}`}
            {...props}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            autoComplete={getAutoCompleteValue()}
            className={`w-full p-2 border rounded focus-green ${Icon ? "pl-10" : ""} ${className} ${error ? "border-red-500" : ""}`}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            {...props}
          />
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </>
  );
}