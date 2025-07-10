"use client";

import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/layout/Sidebar";

export default function AuthWrapper({ children }) {
  const { user, isAuthReady, isClient } = useAuth();
  const showSidebar = isClient && isAuthReady && user;

  return (
    <div className="flex min-h-screen">
      {showSidebar && <Sidebar />}
      <main className={`flex-1 w-full pt-16 ${showSidebar ? 'md:ml-68' : ''}`}> 
        {children}
      </main>
    </div>
  );
}