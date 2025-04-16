"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useForms } from "@/hooks/useForms";
import { showSuccess } from "@/lib/utils/errorHandling";
import { loginSchema } from "@/lib/utils/validationZod";
import Form from "./Form";
import FormContainer from "./FormContainer";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const { login } = useAuth();
  
  const {
    renderField,
    submitForm,
    isSubmitting
  } = useForms({
    schema: loginSchema,
    defaultValues: {
      email: "",
      password: ""
    },
    onSuccessMessage: "Connexion réussie !"
  });

  // Vérifier si l'utilisateur vient de s'inscrire
  useEffect(() => {
    const registered = searchParams.get("registered");
    if (registered === "true") {
      showSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    }
  }, [searchParams]);

  const handleLogin = submitForm(
    async (data) => {
      await login(data.email, data.password);
    }
  );

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
    <Form 
      onSubmit={handleLogin}
      isSubmitting={isSubmitting}
      submitLabel="Se connecter"
      loadingLabel="Connexion en cours..."
    >
      {renderField("email", "Email", "email")}
      {renderField("password", "Mot de passe", "password")}
    </Form>
    </FormContainer>
  );
}