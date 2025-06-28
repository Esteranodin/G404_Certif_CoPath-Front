"use client";
/**
 * Hook de gestion des formulaires
 * @module useForms
 * @description Centralise la logique de gestion des formulaires avec validation Zod
 * @requires react-hook-form
 * @requires zod
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/ui/form/formField";
import { InputWithIcon } from "@/components/ui/form/inputIcon";
import PasswordInput from "@/components/ui/PasswordInput"; 
import { handleApiError, showSuccess } from "@/lib/utils/errorHandling";

export function useForms({
  schema,
  defaultValues,
  onSuccessMessage,
  errorHandler,
  onSuccessCallback = () => { },
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configuration React Hook Form avec validation Zod
  const formMethods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues
  });

  const { register, handleSubmit, formState: { errors }, reset, control } = formMethods;

  // Fonction pour créer champs formulaire 
  const renderField = (
    id,
    label,
    type = "text",
    disabled = false
  ) => {
    if (type === "password") {
      return (
        <PasswordInput
          label={label}
          id={id}
          disabled={disabled || isSubmitting}
          {...register(id)}
          error={errors[id]?.message}
        />
      );
    }

    return (
      <FormField
        label={label}
        id={id}
        type={type}
        disabled={disabled || isSubmitting}
        {...register(id)}
        error={errors[id]?.message}
      />
    );
  };

  // Fonction pour créer des champs avec icône
  const renderIconField = (
    name,
    label,
    icon,
    type = "text",
    placeholder = "",
    disabled = false
  ) => (
    <InputWithIcon
      form={formMethods}
      name={name}
      label={label}
      icon={icon}
      type={type}
      placeholder={placeholder}
      disabled={disabled || isSubmitting}
    />
  );

  const submitForm = (apiCall, customSuccessMessage, customCallback) => {
    // Attention on retourne bien une fonction et non l'objet résultant de handleSubmit
    return (e) => {
      e?.preventDefault();
      return handleSubmit(async (data) => {
        setIsSubmitting(true);
        try {
          const result = await apiCall(data);
          if (customSuccessMessage || onSuccessMessage) {
            showSuccess(customSuccessMessage || onSuccessMessage);
          }

          if (customCallback) {
            customCallback(result);
          } else if (onSuccessCallback) {
            onSuccessCallback(result);
          }

          return result;
        } catch (err) {
          if (errorHandler) {
            errorHandler(err);
          } else {
            handleApiError(err, "Une erreur s'est produite"); 
          }
        } finally {
          setIsSubmitting(false);
        }
      })(e);
    };
  };

  return {
    isSubmitting,
    renderField,
    renderIconField,
    submitForm,
    register,
    handleSubmit,
    errors,
    reset,
    control,
    ...formMethods
  };
}