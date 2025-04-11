import RegisterForm from "@/components/form/RegisterForm";

export const metadata = {
  title: "Inscription | CoPath",
  description: "Créez un compte sur CoPath",
};

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center min-h-[80vh] p-6">
      <RegisterForm />
    </main>
  );
}