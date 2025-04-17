"use client";

import { useAuth } from "@/hooks/useAuth";
import { useForms } from "@/hooks/useForms";
import { profileSchema } from "@/lib/utils/validationZod";
import UserService from "@/lib/services/userService";
import Form from "./Form";
import { handleProfileError } from "@/lib/utils/errorHandling";

export default function ProfileUpdateForm({ user }) {
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
    <Form
      title="Informations du profil" 
      onSubmit={handleUpdateProfile}
      isSubmitting={isSubmitting}
      submitLabel="Mettre à jour mon profil"
      loadingLabel="Mise à jour..."
    >
      {renderField("pseudo", "Pseudo")}
      {renderField("email", "Email", "email")}
    </Form>
  );
}