"use client";

import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "@/components/form/LoginForm";
import { FormSkeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthReady } = useAuth();

  const handleLoginSuccess = () => {
    const returnUrl = searchParams.get('returnUrl');
    
   if (returnUrl && returnUrl !== '/login') {
      router.push(returnUrl);
    } else {
      router.push("/");
    }
  };

  if (!isAuthReady) {
    return (
      <div className="container py-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Connexion</h1>
        <FormSkeleton />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}