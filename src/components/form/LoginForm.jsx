"use client";

import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/lib/utils/validationZod";
import { useForms } from "@/hooks/useForms";
import Form from "./Form";
import FormContainer from "./FormContainer";
import { useEffect } from "react";
import { showSuccess } from "@/lib/utils/errorHandling";

export default function LoginForm({ onLoginSuccess }) {
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const isNewlyRegistered = searchParams.get('registered') === 'true';
  
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
    onSuccessMessage: "Connexion réussie !",
    onSuccessCallback: (userData) => {
      // Appeler le callback fourni par la page parent
      if (onLoginSuccess) onLoginSuccess(userData);
    }
  });

  // Vérifier si l'utilisateur vient de s'inscrire
  useEffect(() => {
    const registered = searchParams.get("registered");
    if (registered === "true") {
      showSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    }
  }, [searchParams]);

  useEffect(() => {
    // Afficher un message si l'utilisateur vient de s'inscrire
    if (isNewlyRegistered) {
      showSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    }
  }, [isNewlyRegistered]);

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
    <FormContainer
      title="Connexion"
      description={isNewlyRegistered 
        ? "Votre compte a été créé ! Connectez-vous maintenant avec vos identifiants."
        : "Accédez à votre profile."
      }
      footer={footer}
    >
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