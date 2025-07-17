"use client";

import { useAuth } from "@/hooks/useAuth";
import { AuthSkeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }) {
  const { user, isAuthReady, isClient } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    // Seulement si le client est monté ET chargement terminé
    if (isClient && isAuthReady && !user) {
      router.replace("/login");
    }
  }, [isClient, isAuthReady, user, router]);

  // Pendant l'hydratation, toujours afficher le skeleton
  if (!isClient || !isAuthReady) {
    return (
      <main className="flex items-center justify-center min-h-[80vh] p-6">
        <AuthSkeleton />
      </main>
    );
  }

  return user ? children : null;
}