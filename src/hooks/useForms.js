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

  const submitForm = (apiCall, customSuccessMessage, customCallback) => {
    // Attention on retourne bien une fonction et non l'objet résultant de handleSubmit
    return (e) => {
      e?.preventDefault();
      return formMethods.handleSubmit(async (data) => {
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
    submitForm,
    ...formMethods
  };
}