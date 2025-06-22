"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/lib/validation/validationZod";
import { useForms } from "@/hooks/useForms";
import Form from "./Form";
import FormContainer from "./FormContainer";
import { showSuccess, handleAuthError } from "@/lib/utils/errorHandling";
import { SUCCESS_MESSAGES } from "@/lib/config/messages";

export default function LoginForm({ onLoginSuccess }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { login } = useAuth();
  const isNewlyRegistered = searchParams.get('registered') === 'true';
  const hasShownRegisteredMessage = useRef(false);

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
    onSuccessCallback: () => {
      // Appeler le callback fourni par la page parent
      if (onLoginSuccess) onLoginSuccess();
    },
    errorHandler: handleAuthError
  });

  useEffect(() => {
    if (isNewlyRegistered) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('registered');
      // Nouvelle URL et rediriger vers celle-ci
      const newUrl = pathname + (newSearchParams.toString() ? `?${newSearchParams.toString()}` : '');
      router.replace(newUrl);
    }
  }, []); // Dépendances vides = s'exécuter uniquement au montage

  useEffect(() => {
    if (isNewlyRegistered && !hasShownRegisteredMessage.current) {
      showSuccess(SUCCESS_MESSAGES.AUTH.REGISTER_COMPLETE);
      hasShownRegisteredMessage.current = true;
    }
  }, [isNewlyRegistered]);

  const handleLogin = submitForm(
    async (data) => {
      await login(data.email, data.password);
    });

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
        : "Accédez à votre profil."
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