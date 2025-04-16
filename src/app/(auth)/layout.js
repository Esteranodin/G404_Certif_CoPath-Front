"use client";

import { useAuth } from "@/hooks/useAuth";
import { AuthSkeleton } from "@/components/ui/skeleton";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // Seulement si le chargement est terminé et qu'il n'y a pas d'utilisateur
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-[80vh] p-6">
        <AuthSkeleton />
      </main>
    );
  }

  // Si l'utilisateur est authentifié, afficher le contenu
  return user ? children : null;
}