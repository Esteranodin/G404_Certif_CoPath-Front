/**
 * Schémas de validation Zod
 * @module validationZod
 * @description Définit les schémas de validation pour les formulaires
 * @requires zod
 */

import * as z from "zod";

// Validations communes
export const emailValidation =
  z.string().email("Format d'email invalide");

export const passwordValidation = (fieldName = "password") =>
  z.string().min(8, `Le ${fieldName === "password" ? "mot de passe" : "nouveau mot de passe"} doit contenir au moins 8 caractères`);

export const requiredField = (fieldName) =>
  z.string().min(1, `Le champ ${fieldName} est requis`);

// Schéma pour la connexion
export const loginSchema = z.object({
  email: emailValidation,
  password: requiredField("mot de passe")
});

// Schéma pour l'inscription
export const registerSchema = z.object({
  pseudo: requiredField("pseudo"),
  email: emailValidation,
  plainPassword: passwordValidation("plainPassword"),
  confirmPassword: requiredField("confirmation du mot de passe")
}).refine(data => data.plainPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

// Schéma pour la mise à jour du profil
export const profileSchema = z.object({
  pseudo: requiredField("pseudo"),
  email: emailValidation,
});

// Schéma pour le changement de mot de passe
export const passwordSchema = z.object({
  currentPassword: requiredField("mot de passe actuel"),
  newPassword: passwordValidation("newPassword"),
  confirmPassword: requiredField("confirmation du nouveau mot de passe")
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export const scenarioCreateSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.string().min(1, "La description est requise"),
  campaign: z.string().min(1, "La campagne est requise"),
});