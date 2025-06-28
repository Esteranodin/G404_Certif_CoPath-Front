"use client";

import { AuthSkeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PublicLayout({ children }) {
  const { user, isAuthReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const publicPaths = ["/", "/campaign", "/scenario"];
    const isPublic = publicPaths.some((path) => pathname.startsWith(path));
    if (isAuthReady && user && !isPublic) {
      router.replace("/dashboard");
    }
  }, [isAuthReady, user, router, pathname]);

  if (!isAuthReady) {
    return (
      <main className="flex items-center justify-center min-h-[80vh] p-6">
        <AuthSkeleton />
      </main>
    );
  }

  return children;
}