"use client";

import { useAuth } from "@/hooks/useAuth";
import { AuthSkeleton } from "@/components/ui/skeleton";

export default function GuestLayout({ children }) {
  const { isAuthReady } = useAuth({
    requireGuest: true,
    redirectTo: "/dashboard"
  });

  // Afficher le skeleton pendant le chargement
  if (!isAuthReady) {
    return (
      <main className="flex items-center justify-center min-h-[80vh] p-6">
        <AuthSkeleton />
      </main>
    );
  }

  return children;
}