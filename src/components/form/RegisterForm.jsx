"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useForms } from "@/hooks/useForms";
import { registerSchema } from "@/lib/utils/validationZod";
import { handleRegisterError } from "@/lib/utils/errorHandling";
import Form from "./Form";
import FormContainer from "./FormContainer";

export default function RegisterForm() {
  const router = useRouter();
  const { register: registerUser } = useAuth();

  const {
    renderField,
    submitForm,
    isSubmitting
  } = useForms({
    schema: registerSchema,
    defaultValues: {
      pseudo: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    onSuccessCallback: () => router.push("/login?registered=true"),
    errorHandler: handleRegisterError
  });

  const handleRegister = submitForm(
    async (data) => {
        const { confirmPassword, ...registrationData } = data;
        await registerUser(registrationData);
    }
  );

  const footer = (
    <p className="text-sm">
      Déjà inscrit ?{" "}
      <Link href="/login" className="text-primary-green hover:underline">
        Se connecter
      </Link>
    </p>
  );

  return (
    <FormContainer title="Créer un compte" footer={footer}>
      <Form
        onSubmit={handleRegister}
        isSubmitting={isSubmitting}
        submitLabel="S'inscrire"
        loadingLabel="Inscription en cours..."
      >
        {renderField("pseudo", "Pseudo")}
        {renderField("email", "Email", "email")}
        {renderField("password", "Mot de passe", "password")}
        {renderField("confirmPassword", "Confirmer le mot de passe", "password")}
      </Form>
    </FormContainer>
  );
}