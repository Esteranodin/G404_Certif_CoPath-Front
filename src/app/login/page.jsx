import LoginForm from "@/components/form/LoginForm";

export const metadata = {
  title: "Connexion | CoPath",
  description: "Connectez-vous à votre compte CoPath",
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-[80vh] p-6">
      <LoginForm />
    </main>
  );
}