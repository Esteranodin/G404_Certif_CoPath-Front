import FormField from "@/components/ui/form/formField";

export function useFormFields() {
  const renderFormField = (
    id, 
    label, 
    register, 
    errors, 
    type = "text",
    disabled = false
  ) => (
    <FormField
      label={label}
      id={id}
      type={type}
      disabled={disabled}
      {...register(id)}
      error={errors[id]?.message}
    />
  );

  return { renderFormField };
}