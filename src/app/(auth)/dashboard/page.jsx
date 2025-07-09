"use client";

import { useAuth } from "@/hooks/useAuth";
import { ProfileSkeleton } from "@/components/ui/skeleton";
import ProfileForm from "@/components/form/ProfileForm";

export default function ProfilePage() {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return (
      <main className="container gap-5 py-8 max-w-md mx-auto">
        <ProfileSkeleton />
      </main>
    );
  }

  return (
    <main className="container py-8 max-w-md mx-auto flex flex-col gap-7">
      <ProfileForm user={user} />
    </main>
  );
}