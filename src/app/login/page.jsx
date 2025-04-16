"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/form/LoginForm";

export default function LoginPage() {
  const { isAuthenticated, loading, authChecked } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && isAuthenticated && !loading) {
      const lastPath = localStorage.getItem("lastVisitedPath") || "/login";
      localStorage.removeItem("lastVisitedPath");
      router.replace(lastPath);
    }
  }, [authChecked, isAuthenticated, loading, router]);

  // Afficher un chargement si nécessaire
  if (loading || !authChecked) {
    return (
      <main className="flex items-center justify-center min-h-[80vh] p-6">
        <div className="text-center">
          <p>Chargement...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-[80vh] p-6">
      <LoginForm />
    </main>
  );
}