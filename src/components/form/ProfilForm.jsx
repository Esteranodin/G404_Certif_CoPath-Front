"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormField from "@/components/ui/formField";
import { Button } from "@/components/ui/button";
import FormContainer from "./FormContainer";
import { handleApiError, showSuccess } from "@/lib/utils/errorHandling";
import UserService from "@/lib/services/userService";
import { useAuth } from "@/hooks/useAuth";

// Schéma de validation pour les données du profil
const profileSchema = z.object({
  pseudo: z.string().min(1, "Le pseudo est requis"),
  email: z.string().email("Format d'email invalide"),
});

// Schéma pour le changement de mot de passe (optionnel)
const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
  newPassword: z.string().min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string().min(1, "Veuillez confirmer votre nouveau mot de passe")
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export default function ProfileForm({ user }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const { user: currentUser, setUser } = useAuth();

  // Formulaire pour les informations de profil
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors }
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      pseudo: user.pseudo || "",
      email: user.email || "",
    }
  });

  // Formulaire pour le changement de mot de passe
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  // Soumission du formulaire de profil
  const onProfileSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const updatedUser = await UserService.updateProfile(data);
      setUser({...currentUser, ...updatedUser});
      showSuccess("Profil mis à jour avec succès !");
    } catch (err) {
      handleApiError(err, "Échec de la mise à jour du profil.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Soumission du formulaire de mot de passe
  const onPasswordSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await UserService.changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      showSuccess("Mot de passe modifié avec succès !");
      resetPasswordForm();
      setShowPasswordForm(false);
    } catch (err) {
      handleApiError(err, "Échec du changement de mot de passe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <FormContainer title="Mon Profil">
        <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4 mb-6">
          <FormField
            label="Pseudo"
            id="pseudo"
            {...registerProfile("pseudo")}
            error={profileErrors.pseudo?.message}
          />
          
          <FormField
            label="Email"
            id="email"
            type="email"
            {...registerProfile("email")}
            error={profileErrors.email?.message}
          />
          
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="form"
            className="w-full"
          >
            {isSubmitting ? "Mise à jour..." : "Mettre à jour mon profil"}
          </Button>
        </form>
        
        {!showPasswordForm ? (
          <Button 
            variant="secondary" 
            className="w-full"
            onClick={() => setShowPasswordForm(true)}
          >
            Changer mon mot de passe
          </Button>
        ) : (
          <div className="mt-8">
            <h3 className="font-medium text-lg mb-4">Changer mon mot de passe</h3>
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                label="Mot de passe actuel"
                id="currentPassword"
                type="password"
                {...registerPassword("currentPassword")}
                error={passwordErrors.currentPassword?.message}
              />
              
              <FormField
                label="Nouveau mot de passe"
                id="newPassword"
                type="password"
                {...registerPassword("newPassword")}
                error={passwordErrors.newPassword?.message}
              />
              
              <FormField
                label="Confirmer le nouveau mot de passe"
                id="confirmPassword"
                type="password"
                {...registerPassword("confirmPassword")}
                error={passwordErrors.confirmPassword?.message}
              />
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setShowPasswordForm(false)}
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
        )}
      </FormContainer>
    </div>
  );
}