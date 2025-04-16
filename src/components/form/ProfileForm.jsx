"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProfileUpdateForm from "./ProfileUpdateForm";
import PasswordUpdateForm from "./PasswordUpdateForm";

export default function ProfileForm({ user }) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  return (
    <div className="w-full max-w-md space-y-6">
      <ProfileUpdateForm user={user} />
      
      {!showPasswordForm ? (
        <Button 
          variant="outline" 
          onClick={() => setShowPasswordForm(true)}
          className="mt-4"
        >
          Changer mon mot de passe
        </Button>
      ) : (
        <PasswordUpdateForm onCancel={() => setShowPasswordForm(false)} />
      )}
    </div>
  );
}