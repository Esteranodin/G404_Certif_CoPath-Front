"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useForms } from "@/hooks/useForms";
import { profileSchema } from "@/lib/validation/validationZod";
import { userService } from "@/lib/services"; 
import Form from "./Form";
import { handleProfileError } from "@/lib/utils/errorHandling";
import FormContainer from "./FormContainer";

export default function ProfileUpdateForm({ user }) {
  const { updateUser, isClient } = useAuth();

  const {
    renderField,
    submitForm,
    isSubmitting,
    reset
  } = useForms({
    schema: profileSchema,
    defaultValues: {
      pseudo: "",
      email: "",
    },
    onSuccessMessage: "Profil mis à jour avec succès !",
    errorHandler: handleProfileError
  });

  useEffect(() => {
    if (user && isClient) {    
      reset({
        pseudo: user.pseudo || "",
        email: user.email || "",
      });
    }
  }, [user, isClient, reset]);

  const handleUpdateProfile = submitForm(
    async (data) => {
      const updatedUser = await userService.updateProfile(data); 
      updateUser(updatedUser);
      return updatedUser;
    }
  );

  if (!isClient || !user) {
    return (
      <FormContainer title="Mettre à jour mon profil" description="Chargement...">
        <div>Chargement des données...</div>
      </FormContainer>
    );
  }

  return (
    <FormContainer title="Mettre à jour mon profil" description="Modifiez vos informations personnelles." className="mb-8">
      <Form
        onSubmit={handleUpdateProfile}
        isSubmitting={isSubmitting}
        submitLabel="Mettre à jour mon profil"
        loadingLabel="Mise à jour..."
      >
        {renderField("pseudo", "Pseudo")}
        {renderField("email", "Email", "email")}
      </Form>
    </FormContainer>
  );
}