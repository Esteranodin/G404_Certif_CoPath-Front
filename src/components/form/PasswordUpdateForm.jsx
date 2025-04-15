"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import UserService from "@/lib/services/userService";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useFormFields } from "@/hooks/useFormFields";

// Schéma commun pour les mots de passe
const passwordValidation = (fieldName = "password") => 
  z.string().min(8, `Le ${fieldName === "password" ? "mot de passe" : "nouveau mot de passe"} doit contenir au moins 8 caractères`);

// Schéma pour le changement de mot de passe
const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
  newPassword: passwordValidation("newPassword"),
  confirmPassword: z.string().min(1, "Veuillez confirmer votre nouveau mot de passe")
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export default function PasswordChangeForm({ onCancel }) {
  const { isSubmitting, submitForm } = useFormSubmission();
  const { renderFormField } = useFormFields();

  // Configuration du formulaire
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  // Handler de soumission
  const onSubmit = async (data) => {
    await submitForm(
      () => UserService.changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword
      }),
      "Mot de passe modifié avec succès !",
      () => {
        reset();
        onCancel();
      }
    );
  };

  return (
    <div className="mt-8">
      <h3 className="font-medium text-lg mb-4">Changer mon mot de passe</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {renderFormField("currentPassword", "Mot de passe actuel", register, errors, "password")}
        {renderFormField("newPassword", "Nouveau mot de passe", register, errors, "password")}
        {renderFormField("confirmPassword", "Confirmer le nouveau mot de passe", register, errors, "password")}
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="link"
            onClick={onCancel}
          >
            Annuler
          </Button>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="form"
            className="flex-1"
          >
            {isSubmitting ? "Modification..." : "Modifier le mot de passe"}
          </Button>
        </div>
      </form>
    </div>
  );
}