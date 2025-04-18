"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useForms } from "@/hooks/useForms";
import { registerSchema } from "@/lib/validation/validationZod";
import { handleRegisterError } from "@/lib/utils/errorHandling";
import Form from "./Form";
import FormContainer from "./FormContainer";
import FormField from "../ui/form/formField";

export default function RegisterForm() {
  const router = useRouter();
  const { register: registerUser } = useAuth();

  const {
    register,
    formState: { errors },
    submitForm,
    isSubmitting,
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
  <FormContainer title="Créer un compte" subtitle="Rejoignez-nous !" footer={footer}>
    <Form
      onSubmit={handleRegister}
      isSubmitting={isSubmitting}
      submitLabel="S'inscrire"
      loadingLabel="Inscription en cours..."
    >

      <FormField
        label="Nom complet"
        id="name"
        placeholder="Votre nom et prénom"
        disabled={isSubmitting}
        {...register("name")}
        error={errors.name?.message}
      />

      <FormField
        label="Email"
        id="email"
        type="email"
        placeholder="votre@email.com"
        disabled={isSubmitting}
        {...register("email")}
        error={errors.email?.message}
      />

      <FormField
        label="Mot de passe"
        id="password"
        type="password"

        placeholder="Votre mot de passe"
        disabled={isSubmitting}
        {...register("password")}
        error={errors.password?.message}
      />

      <FormField
        label="Confirmer le mot de passe"
        id="confirmPassword"
        type="password"
        placeholder="Confirmez votre mot de passe"
        disabled={isSubmitting}
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
    </Form>
  </FormContainer>
  );
}