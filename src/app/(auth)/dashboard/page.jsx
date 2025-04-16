"use client";

import { useAuth } from "@/hooks/useAuth";
import { ProfileSkeleton } from "@/components/ui/skeleton";
import ProfileForm from "@/components/form/ProfileForm";

export default function ProfilePage() {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return (
      <div className="container py-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Mon profil</h1>
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mon profil</h1>
      <ProfileForm user={user} />
    </div>
  );
}