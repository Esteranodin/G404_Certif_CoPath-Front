"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfilForm from "@/components/form/ProfilForm";

export default function Dashboard() {

    const { user, isAuthenticated } = useAuth(); 
    const router = useRouter();


    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }
    , [isAuthenticated, router]);

    if (!user) {
        return (
            <main className="flex items-center justify-center min-h-[80vh] p-6">
                <p>Chargement du profil...</p>
            </main>
        )
    }

  return (
    <main className="flex flex-col gap-8 items-center justify-center min-h-[80vh] p-6">
        <h1>Salut rôliste</h1>
        <ProfilForm user={user} />
    </main>
  );
}