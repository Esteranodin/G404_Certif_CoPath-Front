"use client";

import { useAuth } from "@/hooks/useAuth";
import { AuthSkeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }) {
  const { user, isAuthReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Seulement si le chargement est terminé et qu'il n'y a pas d'utilisateur
    if (isAuthReady && !user) {
      router.replace("/login");
    }
  }, [isAuthReady, user, router]);

  if (!isAuthReady) {
    return (
      <main className="flex items-center justify-center min-h-[80vh] p-6">
        <AuthSkeleton />
      </main>
    );
  }

  // Si l'utilisateur est authentifié, afficher le contenu
  return user ? children : null;
}