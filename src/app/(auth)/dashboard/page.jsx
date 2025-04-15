"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileForm from "@/components/form/ProfileForm";

export default function Dashboard() {
    const { user } = useAuth(); 

    if (!user) {
        return (
            <main className="flex items-center justify-center min-h-[80vh] p-6">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-48 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-32"></div>
                </div>
            </main>
        )
    }

    return (
        <main className="max-w-5xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-dark-green p-6 text-white">
                    <h1 className="text-3xl font-bold pb-2">Mon Profil</h1>
                    <p className="opacity-80 text-xl">Gérez vos informations personnelles</p>
                </div>
                
                <div className="p-6">
                    <ProfileForm user={user} />
                </div>
            </div>
        </main>
    );
}