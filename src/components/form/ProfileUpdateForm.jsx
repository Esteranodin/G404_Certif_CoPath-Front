"use client";

import UserService from "@/lib/services/userService";
import { useAuth } from "@/hooks/useAuth";
import { useForms } from "@/hooks/useForms";
import { profileSchema } from "@/lib/validation/validationZod";
import { handleProfileError } from "@/lib/utils/errorHandling";
import Form from "./Form";
import FormContainer from "./FormContainer";
import FormField from "../ui/form/formField";

export default function ProfileUpdateForm({ user, onCancel }) {
  const { updateUser } = useAuth();

  const {
    register,
    formState: { errors },
    submitForm,
    isSubmitting,
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
        <FormField
          label="Email"
          id="email"
          type="email"
          disabled={true} // Email non modifiable
          defaultValues={user?.email}
        />

        <FormField
          label="Pseudo"
          id="pseudo"
          disabled={isSubmitting}
          {...register("pseudo")}
          error={errors.pseudo?.message}
        />

        <FormField
          label="Bio"
          id="bio"
          type="textarea"
          placeholder="Parlez-nous de vous..."
          disabled={isSubmitting}
          {...register("bio")}
          error={errors.bio?.message}
        />
      </Form>
    </FormContainer>
  );
}