"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/utils";
import { useState, useEffect } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Créer un scénario",
      href: "/scenario/create",
    },
    {
      name: "Mes favoris",
      href: "/favorites",
    },
    {
      name: "Campagnes",
      href: "/campaigns",
    }
  ];

  // Version mobile (menu hamburger)
  if (isMobile) {
    return (
      <>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-4 right-4 z-40 bg-[color:var(--green)] rounded-full p-3 shadow-lg text-white"
        >
          {isOpen ? "✕" : "☰"}
        </button>
        
        {isOpen && (
          <div className="fixed inset-0 bg-[color:var(--dark)] z-30 p-6 pt-16">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-white",
                      pathname === item.href 
                        ? "bg-[color:var(--green)] text-[color:var(--dark)] font-semibold" 
                        : "hover:bg-[color:var(--green-dark)]"
                    )}
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }

  // Version desktop (sidebar)
  return (
    <aside className="bg-[color:var(--dark)] text-white w-64 min-h-screen fixed left-0 top-0 pt-36 p-4 hidden md:block z-10">
      <div className="flex flex-col space-y-6">
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    pathname === item.href 
                      ? "bg-[color:var(--green)] text-[color:var(--dark)] font-semibold" 
                      : "hover:bg-[color:var(--green-dark)] hover:text-white"
                  )}
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}