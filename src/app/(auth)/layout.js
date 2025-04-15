"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AuthLayout({ children }) {
  const { isAuthenticated, authChecked, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Rediriger seulement quand authChecked est true et qu'on sait que l'utilisateur n'est pas authentifié
    if (authChecked && !loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authChecked, loading, isAuthenticated, router]);

  // Afficher un état de chargement pendant la vérification
  if (loading || !authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  // Ne pas rendre les enfants si non authentifié (pendant la redirection)
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}