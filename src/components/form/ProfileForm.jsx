"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProfileUpdateForm from "./ProfileUpdateForm";
import PasswordUpdateForm from "./PasswordUpdateForm";
import FormContainer from "./FormContainer";
import FormField from "../ui/form/formField";

export default function ProfileForm({ user }) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showProfileUpdateForm, setProfileUpdateForm] = useState(false);

  return (
    <>
      <FormContainer title="Mon profil" subtitle="Vos informations personnelles.">
        <div className="flex flex-col gap-5 mb-4 text-sm font-semibold">
          <p>mettre ici toutes les infos recup en data base</p>
        <FormField
          label="Bio"
          id="bio"
          type="textarea"
          disabled={true}
          defaultValue={user.bio}
        />
        </div>
      </FormContainer>

      <section className="w-full max-w-md space-y-6 flex gap-7">
        {!showProfileUpdateForm ? (
          <Button
            variant="outline"
            onClick={() => setProfileUpdateForm(true)}
            className="mt-4"
          >
            Modifier mon profil
          </Button>
        ) : (
          <ProfileUpdateForm onCancel={() => setProfileUpdateForm(false)} user={user} />
        )}
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
      </section>
    </>
  );
}