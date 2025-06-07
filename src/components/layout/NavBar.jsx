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
        <nav className='bg-logo flex justify-between p-4 items-start'>
            <Link href="/" className='self-center'>
                <Image src={logo} alt="Logo de Copath" width={150} className='md:hidden' priority />
                <Image src={logoFull} alt="Logo de Copath" width={180} className='hidden md:block' priority />
            </Link>
            <div className='flex gap-4 items-center self-center md:gap-6 md:mr-6'>
                {isAuthenticated ? (
                    <Button
                        variant="home"
                        onClick={logout}
                        className="flex items-center gap-2"
                    >
                        <span>Déconnexion</span>
                    </Button>
                ) : (
                    <Button variant={"home"} size={"default"}>
                        <Link href="/register">S'inscrire</Link>
                    </Button>
                )}

                {isAuthenticated ? (
                    <Link href="/dashboard">
                        <Image src={userCo} alt="icone utilisateur" width={30} href="/dashboard" />
                    </Link>
                ) : (
                    <Link href="/login">
                    <Image src={user} alt="icone utilisateur" width={30} />
                    </Link>
                )}

            </div>
        </nav>
    )
}