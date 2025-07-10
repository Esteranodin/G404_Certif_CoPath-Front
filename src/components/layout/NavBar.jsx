"use client";

import logo from '@/../public/logo/copath.png';
import logoFull from '@/../public/logo/copath-full.png';
import user from '@/../public/icons/user.svg';
import userCo from '@/../public/icons/userCo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/useAuth';

export function NavBar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className='bg-logo flex justify-between px-4 py-2 items-start fixed top-0 left-0 w-full z-50'>
      <Link href="/" className='self-center'>
        <Image src={logo} alt="Logo de Copath" width={150} className='md:hidden' priority />
        <Image src={logoFull} alt="Logo de Copath" width={180} className='hidden md:block' priority />
      </Link>

      <div className='flex gap-2 items-center self-center md:gap-6 md:mr-6'>       
        {isAuthenticated ? (
          <Button
            variant="navbar"
            onClick={logout}
            className="text-xs px-1 py-1 md:text-sm md:px-4 md:py-2"
          >
            Déconnexion
          </Button>
        ) : (
          <Button
            variant="navbar"
            size="default"
            className="text-xs px-1 py-1 md:text-sm md:px-4 md:py-2"
          >
            <Link href="/register">
              S'inscrire
            </Link>
          </Button>
        )}

        {isAuthenticated ? (
          <Link href="/dashboard">
            <Image
              src={userCo}
              alt="icone utilisateur"
              width={20}
              height={20}
              className="md:w-[30px] md:h-[30px]"
            />
          </Link>
        ) : (
          <Link href="/login">
            <Image
              src={user}
              alt="icone utilisateur"
              width={20}
              height={20}
              className="md:w-[30px] md:h-[30px]"
            />
          </Link>
        )}
      </div>
    </nav>
  )
}