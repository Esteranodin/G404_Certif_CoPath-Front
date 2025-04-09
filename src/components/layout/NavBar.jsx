import logo from '@/../public/logo/copath.png';
import logoFull from '@/../public/logo/copath-full.png';
import user from '@/../public/icons/user.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';


export function NavBar() {

    return (
        <nav className='bg-logo flex justify-between p-4 items-start'>
            <Link href="/" className='self-center'>
                <Image src={logo} alt="Logo de Copath" width={150} className='md:hidden'/>
                <Image src={logoFull} alt="Logo de Copath" width={150} className='hidden md:block'/>
            </Link>
            <div className='flex gap-4 items-center self-center'>
                <Button variant={"home"} size={"default"}>
                    <Link href="/register">S'inscrire</Link>
                </Button>

                <Link href="/login">
                    <Image src={user} alt="icone utilisateur" width={30} />
                </Link>
            </div>
        </nav>
    )
}