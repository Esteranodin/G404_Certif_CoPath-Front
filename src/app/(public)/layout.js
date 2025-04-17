"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

export default function PublicLayout({ children }) {
  const { user, isAuthReady } = useAuth();
  const router = useRouter();

  useEffect(() => {

    if (isAuthReady && user) {
      router.replace("/dashboard");
    }
  }, [isAuthReady, user, router]);

  if (!isAuthReady) {
    return (
      <main className="flex items-center justify-center min-h-[80vh] p-6">
        <AuthSkeleton />
      </main>
    );
  }

  return children;
}