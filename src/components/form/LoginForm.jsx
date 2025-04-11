"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import * as z from "zod";
import FormContainer from "./FormContainer";
import FormField from "@/components/ui/formField";
import { Button } from "@/components/ui/button";
import { handleApiError, showSuccess } from "@/lib/utils/errorHandling";

const loginSchema = z.object({
  email: z.string().email("Format d'email invalide"),
  password: z.string().min(1, "Le mot de passe est requis")
});

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Vérifier si l'utilisateur vient de s'inscrire
  useEffect(() => {
    const registered = searchParams.get("registered");
    if (registered === "true") {
      showSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    }
  }, [searchParams]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      await login(data.email, data.password);
      showSuccess("Connexion réussie !");
      router.push("/dashboard");
    } catch (err) {
      handleApiError(err, "Échec de la connexion. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const footer = (
    <p className="text-sm">
      Pas encore de compte ?{" "}
      <Link href="/register" className="text-primary-green hover:underline">
        S&apos;inscrire
      </Link>
    </p>
  );

  return (
    <FormContainer title="Connexion" footer={footer}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Email"
          id="email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
        
        <FormField
          label="Mot de passe"
          id="password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="pink"
          className="w-full"
        >
          {isSubmitting ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>
    </FormContainer>
  );
}