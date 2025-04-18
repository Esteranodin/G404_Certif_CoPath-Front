"use client";

import UserService from "@/lib/services/userService";
import { useForms } from "@/hooks/useForms";
import { passwordSchema } from "@/lib/validation/validationZod";
import Form from "./Form";
import { handlePasswordError } from "@/lib/utils/errorHandling";
import FormContainer from "./FormContainer";

export default function PasswordUpdateForm({ onCancel }) {
  const {
    renderField,
    submitForm,
    isSubmitting,
    reset
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
      {renderField("currentPassword", "Mot de passe actuel", "password")}
      {renderField("newPassword", "Nouveau mot de passe", "password")}
      {renderField("confirmPassword", "Confirmer le nouveau mot de passe", "password")}
    </Form>
    </FormContainer>
  );
}