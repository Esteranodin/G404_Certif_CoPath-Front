"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/form/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = (userData) => {
    // La logique de redirection appartient à la page
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}