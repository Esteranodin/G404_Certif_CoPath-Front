"use client";

import { useAuth } from "@/hooks/useAuth";
import { ProfileSkeleton } from "@/components/ui/skeleton";
import ProfileForm from "@/components/form/ProfileForm";

export default function ProfilePage() {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return (
      <section className="container py-8 max-w-md mx-auto">
        <ProfileSkeleton />
      </section>
    );
  }

  return (
    <section className="container py-8 max-w-md mx-auto">
      <ProfileForm user={user} />
    </section>
  );
}