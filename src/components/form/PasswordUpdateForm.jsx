"use client";

import UserService from "@/lib/services/userService";
import { useForms } from "@/hooks/useForms";
import { passwordSchema } from "@/lib/validation/validationZod";
import Form from "./Form";
import { handlePasswordError } from "@/lib/utils/errorHandling";
import FormContainer from "./FormContainer";
import FormField from "../ui/form/formField";

export default function PasswordUpdateForm({ onCancel }) {
  const {
    register,
    formState: { errors },
    submitForm,
    isSubmitting,
  } = useForms({
    schema: passwordSchema,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    onSuccessMessage: "Mot de passe modifié avec succès !",
    onSuccessCallback: () => {
      reset();
      if (onCancel) onCancel();
    },
    errorHandler: handlePasswordError
  });

  const handleUpdatePassword = submitForm(
    async (data) => {
      return await UserService.changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword
      });
    }
  );

  return (
    <FormContainer title="Changer mon mot de passe">
      <Form
        onSubmit={handleUpdatePassword}
        isSubmitting={isSubmitting}
        submitLabel="Modifier le mot de passe"
        loadingLabel="Modification..."
        cancelAction={{
          onClick: onCancel,
          label: "Annuler"
        }}
      >
        <FormField
          label="Nouveau mot de passe"
          id="newPassword"
          type="password"
          disabled={isSubmitting}
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />

        <FormField
          label="Confirmer le nouveau mot de passe"
          id="confirmPassword"
          type="password"
          disabled={isSubmitting}
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </Form>
    </FormContainer>
  );
}