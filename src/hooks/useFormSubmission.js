import { useState } from "react";
import { handleApiError, showSuccess } from "@/lib/utils/errorHandling";

export function useFormSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (action, data, successMessage, onSuccess = () => {}) => {
    setIsSubmitting(true);
    try {
      const result = await action(data);
      showSuccess(successMessage);
      onSuccess(result);
      return result;
    } catch (err) {
      handleApiError(err, `Échec de l'opération.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitForm };
}