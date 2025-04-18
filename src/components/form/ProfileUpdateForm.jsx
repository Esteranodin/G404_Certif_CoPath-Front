"use client";

import { useAuth } from "@/hooks/useAuth";
import { useForms } from "@/hooks/useForms";
import { profileSchema } from "@/lib/validation/validationZod";
import UserService from "@/lib/services/userService";
import Form from "./Form";
import { handleProfileError } from "@/lib/utils/errorHandling";
import FormContainer from "./FormContainer";

export default function ProfileUpdateForm({ user, onCancel }) {
  const { updateUser } = useAuth();

  const {
    renderField,
    submitForm,
    isSubmitting
  } = useForms({
    schema: profileSchema,
    defaultValues: {
      pseudo: user?.pseudo || "",
      email: user?.email || "",
    },
    onSuccessMessage: "Profil mis à jour avec succès !",
    onSuccessCallback: () => {
      reset();
      if (onCancel) onCancel();
    },
    errorHandler: handleProfileError
  });

  const handleUpdateProfile = submitForm(
    async (data) => {
      const updatedUser = await UserService.updateProfile(data);
      updateUser(updatedUser);
      return updatedUser;
    }
  );

  return (
    <FormContainer title="Mettre à jour mon profil" subtitle="Modifiez vos informations personnelles." className="mb-8">
      <Form
        onSubmit={handleUpdateProfile}
        isSubmitting={isSubmitting}
        submitLabel="Confimer les modifications"
        loadingLabel="Mise à jour..."
        cancelAction={{
          onClick: onCancel,
          label: "Annuler"
        }}
      >
        {renderField("pseudo", "Pseudo")}
        {renderField("email", "Email", "email")}
      </Form>
    </FormContainer>
  );
}