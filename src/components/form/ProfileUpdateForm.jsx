"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import UserService from "@/lib/services/userService";
import { useAuth } from "@/hooks/useAuth";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useFormFields } from "@/hooks/useFormFields";

// Schéma de validation pour les données du profil
const profileSchema = z.object({
  pseudo: z.string().min(1, "Le pseudo est requis"),
  email: z.string().email("Format d'email invalide"),
});

export default function ProfileUpdateForm({ user }) {
  const { user: currentUser, setUser } = useAuth();
  const { isSubmitting, submitForm } = useFormSubmission();
  const { renderFormField } = useFormFields();

  // Configuration du formulaire
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      pseudo: user.pseudo || "",
      email: user.email || "",
    }
  });

  // Handler de soumission
  const onSubmit = async (data) => {
    await submitForm(
      () => UserService.updateProfile(data),
      "Profil mis à jour avec succès !",
      (updatedUser) => setUser({...currentUser, ...updatedUser})
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      {renderFormField("pseudo", "Pseudo", register, errors)}
      {renderFormField("email", "Email", register, errors, "email")}
      
      <Button
        type="submit"
        disabled={isSubmitting}
        variant="form"
        className="w-full"
      >
        {isSubmitting ? "Mise à jour..." : "Mettre à jour mon profil"}
      </Button>
    </form>
  );
}